// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title CanonicalGit
 * @dev Smart contract for managing canonical Git repositories in the Blockchain 5.0 ecosystem
 * @notice This contract provides decentralized version control and repository management
 */
contract CanonicalGit {
    struct Repository {
        string name;
        string description;
        address owner;
        bytes32 latestCommitHash;
        uint256 createdAt;
        uint256 updatedAt;
        bool isActive;
    }

    struct Commit {
        bytes32 hash;
        bytes32 parentHash;
        address author;
        string message;
        uint256 timestamp;
        string ipfsHash; // IPFS hash for commit data
    }

    mapping(bytes32 => Repository) public repositories;
    mapping(bytes32 => Commit) public commits;
    mapping(address => bytes32[]) public userRepositories;
    
    bytes32[] public allRepositories;
    
    event RepositoryCreated(bytes32 indexed repoId, string name, address indexed owner);
    event CommitAdded(bytes32 indexed repoId, bytes32 indexed commitHash, address indexed author);
    event RepositoryUpdated(bytes32 indexed repoId, bytes32 newCommitHash);

    modifier onlyRepoOwner(bytes32 repoId) {
        require(repositories[repoId].owner == msg.sender, "Not repository owner");
        _;
    }

    modifier repoExists(bytes32 repoId) {
        require(repositories[repoId].isActive, "Repository does not exist");
        _;
    }

    /**
     * @dev Create a new repository
     * @param name Repository name
     * @param description Repository description
     * @return repoId The unique identifier for the repository
     */
    function createRepository(
        string memory name,
        string memory description
    ) external returns (bytes32 repoId) {
        repoId = keccak256(abi.encodePacked(name, msg.sender, block.timestamp));
        
        repositories[repoId] = Repository({
            name: name,
            description: description,
            owner: msg.sender,
            latestCommitHash: bytes32(0),
            createdAt: block.timestamp,
            updatedAt: block.timestamp,
            isActive: true
        });

        userRepositories[msg.sender].push(repoId);
        allRepositories.push(repoId);

        emit RepositoryCreated(repoId, name, msg.sender);
        return repoId;
    }

    /**
     * @dev Add a new commit to a repository
     * @param repoId Repository identifier
     * @param commitHash Hash of the commit
     * @param parentHash Hash of the parent commit
     * @param message Commit message
     * @param ipfsHash IPFS hash containing commit data
     */
    function addCommit(
        bytes32 repoId,
        bytes32 commitHash,
        bytes32 parentHash,
        string memory message,
        string memory ipfsHash
    ) external repoExists(repoId) onlyRepoOwner(repoId) {
        commits[commitHash] = Commit({
            hash: commitHash,
            parentHash: parentHash,
            author: msg.sender,
            message: message,
            timestamp: block.timestamp,
            ipfsHash: ipfsHash
        });

        repositories[repoId].latestCommitHash = commitHash;
        repositories[repoId].updatedAt = block.timestamp;

        emit CommitAdded(repoId, commitHash, msg.sender);
        emit RepositoryUpdated(repoId, commitHash);
    }

    /**
     * @dev Get repository information
     * @param repoId Repository identifier
     * @return Repository struct
     */
    function getRepository(bytes32 repoId) external view returns (Repository memory) {
        return repositories[repoId];
    }

    /**
     * @dev Get commit information
     * @param commitHash Commit hash
     * @return Commit struct
     */
    function getCommit(bytes32 commitHash) external view returns (Commit memory) {
        return commits[commitHash];
    }

    /**
     * @dev Get all repositories owned by a user
     * @param user User address
     * @return Array of repository IDs
     */
    function getUserRepositories(address user) external view returns (bytes32[] memory) {
        return userRepositories[user];
    }

    /**
     * @dev Get total number of repositories
     * @return Total count
     */
    function getTotalRepositories() external view returns (uint256) {
        return allRepositories.length;
    }
}