# ProofAgent: On-Chain Verification and Reputation Framework for Autonomous Agents

## Abstract
ProofAgent is an implementation framework for anchoring autonomous agent identities and evaluation metrics on-chain, compliant with the ERC-8004 (Trustless Agent Identity and Reputation Registries) standard. The framework decouples agent identity registration from evaluation reporting, utilizing Content-Addressed Decentralized Storage (IPFS) for evaluation artifacts and Ethereum Smart Contracts for cryptographic state commitment.

---

## Protocol Specification

### System Architecture

```
+-------------------------------------------------------------------+
|                        Evaluation Pipeline                        |
+-------------------------------------------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------+
|                   Content-Addressed Storage                       |
|                             (IPFS)                                |
+-------------------------------------------------------------------+
                                  |
                 +----------------+----------------+
                 |                                 |
                 v                                 v
+---------------------------------+ +-------------------------------+
|    ERC-8004 Identity Registry   | | ERC-8004 Reputation Registry  |
| (Agent Non-Fungible Token State)| |   (On-Chain Metric Anchor)    |
+---------------------------------+ +-------------------------------+
```

1. **Identity Registry (`ERC8004Identity`)**: Manages agent registration and assigns unique state identifiers (`agentId`) mapped to agent metadata URIs (`tokenURI`).
2. **Reputation Registry (`ERC8004Reputation`)**: Records quantitative feedback, quality scores, domain tags, and cryptographic hashes (`feedbackHash`) associated with agent evaluations.
3. **Decentralized Storage (`IPFS`)**: Maintains immutable content-addressed storage for execution traces and benchmark artifacts.

---

## Contract Addresses

| Registry | Contract Address | Network |
| :--- | :--- | :--- |
| **ERC-8004 Identity** | `0x8004A818BFB912233c491871b3d84c89A494BD9e` | Ethereum Sepolia / Base Sepolia |
| **ERC-8004 Reputation** | `0x8004B663056A597Dffe9eCcC1965A193B7388713` | Ethereum Sepolia / Base Sepolia |

---

## Repository Layout

```
├── src/
│   ├── config.js       # Network RPC provider, cryptographic wallets, and ABIs
│   ├── identity.js     # ERC-8004 identity registration module
│   ├── reputation.js   # On-chain evaluation feedback anchoring module
│   ├── report.js       # IPFS content-addressing module
│   └── lookup.js       # On-chain identity and reputation query module
├── data/
│   └── dummy-report.json # Sample evaluation artifact payload
├── main.js             # Primary execution script
└── .env.example        # Environment variable specification template
```

---

## Execution Instructions

### 1. Environment Configuration
Create a `.env` configuration file based on `.env.example`:

```bash
cp .env.example .env
```

Define environment parameters:
```ini
PRIVATE_KEY=0x_client_wallet_private_key
PROOFAGENT_PRIVATE_KEY=0x_evaluator_wallet_private_key
PINATA_JWT=your_pinata_jwt_token
RPC_URL=https://ethereum-sepolia-rpc.publicnode.com
```

### 2. Execution
Execute the main pipeline:

```bash
node main.js
```

---

## License
MIT
