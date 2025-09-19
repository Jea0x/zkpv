import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'ZKPV Backend is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// API Routes
app.get('/api/v1/status', (req, res) => {
  res.json({
    service: 'ZKPV Backend API',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    blockchain: {
      network: process.env.BLOCKCHAIN_NETWORK || 'localhost',
      contract_address: process.env.CONTRACT_ADDRESS || 'Not deployed'
    }
  });
});

// Repository management endpoints
app.get('/api/v1/repositories', (req, res) => {
  // TODO: Implement repository listing from blockchain
  res.json({
    repositories: [],
    total: 0,
    message: 'Repository listing will be implemented with blockchain integration'
  });
});

app.post('/api/v1/repositories', (req, res) => {
  // TODO: Implement repository creation
  const { name, description } = req.body;
  res.status(201).json({
    message: 'Repository creation endpoint - to be implemented',
    data: { name, description }
  });
});

// AI Agent endpoints
app.post('/api/v1/ai/analyze', (req, res) => {
  // TODO: Implement AI analysis
  res.json({
    message: 'AI analysis endpoint - to be implemented',
    data: req.body
  });
});

// Governance endpoints
app.get('/api/v1/governance/proposals', (req, res) => {
  // TODO: Implement governance proposals
  res.json({
    proposals: [],
    message: 'Governance proposals endpoint - to be implemented'
  });
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 ZKPV Backend server is running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔧 API Status: http://localhost:${PORT}/api/v1/status`);
});

export default app;