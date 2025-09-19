import React, { useState, useEffect } from 'react';
import './App.css';

interface BackendStatus {
  service: string;
  version: string;
  environment: string;
  blockchain: {
    network: string;
    contract_address: string;
  };
}

function App() {
  const [backendStatus, setBackendStatus] = useState<BackendStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBackendStatus();
  }, []);

  const fetchBackendStatus = async () => {
    try {
      const response = await fetch('/api/v1/status');
      if (!response.ok) {
        throw new Error('Failed to fetch backend status');
      }
      const data = await response.json();
      setBackendStatus(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="logo">
          <h1>🔐 ZKPV</h1>
          <p>Blockchain 5.0 Collaborative Development Platform</p>
        </div>
      </header>

      <main className="App-main">
        <section className="status-section">
          <h2>System Status</h2>
          {loading && <div className="loading">Loading backend status...</div>}
          {error && <div className="error">Error: {error}</div>}
          {backendStatus && (
            <div className="status-grid">
              <div className="status-card">
                <h3>Backend Service</h3>
                <p><strong>Service:</strong> {backendStatus.service}</p>
                <p><strong>Version:</strong> {backendStatus.version}</p>
                <p><strong>Environment:</strong> {backendStatus.environment}</p>
              </div>
              <div className="status-card">
                <h3>Blockchain</h3>
                <p><strong>Network:</strong> {backendStatus.blockchain.network}</p>
                <p><strong>Contract:</strong> {backendStatus.blockchain.contract_address}</p>
              </div>
            </div>
          )}
        </section>

        <section className="features-section">
          <h2>Platform Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>🏗️ Smart Contracts</h3>
              <p>Decentralized repository management with CanonicalGit contract</p>
              <div className="feature-status">Coming Soon</div>
            </div>
            <div className="feature-card">
              <h3>🤖 AI Agent</h3>
              <p>Intelligent code analysis and development assistance</p>
              <div className="feature-status">In Development</div>
            </div>
            <div className="feature-card">
              <h3>🏛️ Governance</h3>
              <p>Decentralized decision making and proposal management</p>
              <div className="feature-status">Planned</div>
            </div>
            <div className="feature-card">
              <h3>🔒 Privacy Shield</h3>
              <p>Zero-knowledge proofs for data privacy and verification</p>
              <div className="feature-status">Research Phase</div>
            </div>
          </div>
        </section>

        <section className="actions-section">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <button className="action-btn primary" onClick={() => alert('Repository creation coming soon!')}>
              Create Repository
            </button>
            <button className="action-btn secondary" onClick={() => alert('Governance features coming soon!')}>
              View Proposals
            </button>
            <button className="action-btn secondary" onClick={() => alert('AI analysis coming soon!')}>
              AI Analysis
            </button>
          </div>
        </section>
      </main>

      <footer className="App-footer">
        <p>&copy; 2025 ZKPV - Blockchain 5.0 Collaborative Development Platform</p>
        <p>Building the future of decentralized development</p>
      </footer>
    </div>
  );
}

export default App;