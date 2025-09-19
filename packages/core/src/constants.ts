// Constants for the ZKPV ecosystem

// Network configurations
export const NETWORKS = {
  LOCALHOST: {
    name: 'localhost',
    chainId: 1337,
    rpcUrl: 'http://127.0.0.1:8545'
  },
  MAINNET: {
    name: 'mainnet',
    chainId: 1,
    rpcUrl: 'https://mainnet.infura.io/v3/'
  },
  SEPOLIA: {
    name: 'sepolia',
    chainId: 11155111,
    rpcUrl: 'https://sepolia.infura.io/v3/'
  }
} as const;

// Contract addresses (to be updated after deployment)
export const CONTRACT_ADDRESSES = {
  CANONICAL_GIT: '0x0000000000000000000000000000000000000000'
} as const;

// API endpoints
export const API_ENDPOINTS = {
  BACKEND: process.env.BACKEND_URL || 'http://localhost:3001',
  IPFS: process.env.IPFS_URL || 'https://ipfs.io'
} as const;

// Error messages
export const ERROR_MESSAGES = {
  WALLET_NOT_CONNECTED: 'Wallet not connected',
  TRANSACTION_FAILED: 'Transaction failed',
  INVALID_REPOSITORY: 'Invalid repository',
  UNAUTHORIZED: 'Unauthorized access'
} as const;