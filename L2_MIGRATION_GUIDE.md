# Layer 2 Protocol Execution Specification

## 1. Abstract
This document specifies the deployment and execution parameters for running ProofAgent protocols on Base Sepolia (Layer 2) to optimize transaction costs. Layer 2 execution preserves the semantic validity of ERC-8004 state commitments while reducing execution gas consumption.

## 2. Network Specifications

| Parameter | Ethereum Sepolia (L1) | Base Sepolia (L2) |
| :--- | :--- | :--- |
| **Chain ID** | `11155111` | `84532` |
| **RPC Endpoint** | `https://ethereum-sepolia-rpc.publicnode.com` | `https://sepolia.base.org` |
| **Identity Contract** | `0x8004A818BFB912233c491871b3d84c89A494BD9e` | `0x8004A818BFB912233c491871b3d84c89A494BD9e` |
| **Reputation Contract** | `0x8004B663056A597Dffe9eCcC1965A193B7388713` | `0x8004B663056A597Dffe9eCcC1965A193B7388713` |

## 3. Configuration

To execute state transitions on Base Sepolia, set `RPC_URL` in `.env` or update `config.js`:

```javascript
export const RPC_URL = process.env.RPC_URL || "https://sepolia.base.org";
```

Ensure that both operational keys (`PRIVATE_KEY` and `PROOFAGENT_PRIVATE_KEY`) maintain sufficient Layer 2 testnet ETH balances prior to initiating transactions.
