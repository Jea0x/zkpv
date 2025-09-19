// Core types for the ZKPV ecosystem

export interface Repository {
  id: string;
  name: string;
  description: string;
  owner: string;
  latestCommitHash: string;
  createdAt: number;
  updatedAt: number;
  isActive: boolean;
}

export interface Commit {
  hash: string;
  parentHash: string;
  author: string;
  message: string;
  timestamp: number;
  ipfsHash: string;
}

export interface User {
  address: string;
  username?: string;
  email?: string;
  repositories: string[];
}

export interface AIAnalysisResult {
  score: number;
  suggestions: string[];
  vulnerabilities: string[];
  optimizations: string[];
}

export interface GovernanceProposal {
  id: string;
  title: string;
  description: string;
  proposer: string;
  votesFor: number;
  votesAgainst: number;
  status: 'active' | 'passed' | 'rejected' | 'expired';
  createdAt: number;
  expiresAt: number;
}