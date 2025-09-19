// Utility functions for the ZKPV ecosystem

import { ethers } from 'ethers';

/**
 * Generate a unique repository ID
 */
export function generateRepositoryId(name: string, owner: string): string {
  const timestamp = Date.now();
  const data = ethers.solidityPacked(['string', 'string', 'uint256'], [name, owner, timestamp]);
  return ethers.keccak256(data);
}

/**
 * Validate Ethereum address
 */
export function isValidEthereumAddress(address: string): boolean {
  return ethers.isAddress(address);
}

/**
 * Format timestamp to readable date
 */
export function formatTimestamp(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleString();
}

/**
 * Truncate address for display
 */
export function truncateAddress(address: string, chars = 4): string {
  if (!isValidEthereumAddress(address)) return address;
  return `${address.slice(0, 2 + chars)}...${address.slice(-chars)}`;
}

/**
 * Calculate commit hash (simplified version)
 */
export function calculateCommitHash(content: string, parentHash: string, author: string): string {
  const data = ethers.solidityPacked(
    ['string', 'string', 'string', 'uint256'],
    [content, parentHash, author, Date.now()]
  );
  return ethers.keccak256(data);
}

/**
 * Validate commit hash format
 */
export function isValidCommitHash(hash: string): boolean {
  return /^0x[a-fA-F0-9]{64}$/.test(hash);
}