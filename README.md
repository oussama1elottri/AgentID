# ProofAgent (ERC-8004 On-Chain AI Agent Identity & Evaluation)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![ERC Standard](https://img.shields.io/badge/Standard-ERC--8004-blue)](https://eips.ethereum.org)
[![Network](https://img.shields.io/badge/Network-Ethereum_Sepolia_%7C_Base_Sepolia-green)](https://base.org)

**ProofAgent** is an end-to-end framework for registering AI agent identities and anchoring verified evaluation reports on-chain using the **ERC-8004** standard (Trustless Agent Identity & Reputation Registries).

---

## 🌟 Architecture Overview

```
                      +-----------------------------+
                      |   ProofAgent Evaluation     |
                      |   (Benchmark & Execution)   |
                      +--------------+--------------+
                                     |
                                     v
                      +-----------------------------+
                      |   IPFS Report Pinning       |
                      |   (Pinata Metadata Service) |
                      +--------------+--------------+
                                     |
                                     v
             +-----------------------+-----------------------+
             |                                               |
             v                                               v
+--------------------------+                   +--------------------------+
|  ERC-8004 Identity       |                   |  ERC-8004 Reputation     |
|  Registry (Agent NFT)    |                   |  Registry (Feedback)     |
+--------------------------+                   +--------------------------+
```

1. **Agent Owner (`clientWallet`)**: Registers the AI Agent's identity on-chain via ERC-8004 Identity Registry (`0x8004A818BFB912233c491871b3d84c89A494BD9e`).
2. **Evaluator (`proofAgentWallet`)**: Pins evaluation benchmark traces to IPFS and anchors verified feedback metrics on the ERC-8004 Reputation Registry (`0x8004B663056A597Dffe9eCcC1965A193B7388713`).

---

## 📁 Repository Structure

```
├── config.js              # Provider, wallets, contract addresses & ABIs
├── identity.js            # ERC-8004 Agent Registration module
├── reputation.js          # On-chain evaluation feedback anchoring module
├── report.js              # Pinata IPFS metadata wrapper
├── lookup.js              # Agent identity lookup and query module
├── main.js                # Full lifecycle orchestrator script
├── dummy-report.json      # Sample evaluation report payload
├── schema/
│   └── report-schema.json # JSON Schema for ProofAgent benchmark reports
├── test/
│   └── integration.test.js# Integration test suite
├── .env.example           # Environment template
└── L2_MIGRATION_GUIDE.md  # Migration guide for Base Sepolia L2
```

---

## 🚀 Quick Start

### 1. Prerequisites
- Node.js v18+
- Sepolia or Base Sepolia testnet ETH
- Pinata IPFS API JWT

### 2. Installation
```bash
npm install
```

### 3. Environment Configuration
Copy `.env.example` to `.env` and fill in your keys:
```bash
cp .env.example .env
```

Set your keys inside `.env`:
```env
PRIVATE_KEY=0x_your_client_wallet_private_key
PROOFAGENT_PRIVATE_KEY=0x_your_evaluator_wallet_private_key
PINATA_JWT=your_pinata_jwt_token
RPC_URL=https://ethereum-sepolia-rpc.publicnode.com
```

### 4. Running the Main Demo
Execute the complete workflow:
```bash
node main.js
```

---

## 🧪 Testing

Run the automated integration test suite:
```bash
node --test test/integration.test.js
```

---

## ⛽ Multi-Chain & Layer 2 Support

ProofAgent ERC-8004 contracts are deployed at identical deterministic addresses across both Ethereum Sepolia L1 and Base Sepolia L2:

- **ERC-8004 Identity:** `0x8004A818BFB912233c491871b3d84c89A494BD9e`
- **ERC-8004 Reputation:** `0x8004B663056A597Dffe9eCcC1965A193B7388713`

For instructions on reducing transaction gas costs by >99% using Base Sepolia L2, see [L2_MIGRATION_GUIDE.md](file:///Users/itadmin/Documents/Fi/blockchain/proofAgent/demo/ethers-rpc-demo/L2_MIGRATION_GUIDE.md).

---

## 📄 License
[MIT License](LICENSE)
