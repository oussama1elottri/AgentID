# ProofAgent L2 Migration Guide (Ethereum Sepolia -> Base Sepolia)

## Overview
ProofAgent utilizes **ERC-8004** contracts deployed on Ethereum Sepolia (L1) and Base Sepolia (L2) to register AI agent identities and anchor immutable reputation evaluations.

Migrating execution from L1 to L2 reduces gas fees by over **99%**, lowering transaction costs from ~`0.0002 ETH` per evaluation on L1 to ~`0.000002 ETH` on Base Sepolia L2.

---

## Contract Addresses

Both L1 and L2 networks use identical ERC-8004 contract addresses:

| Contract | Address |
| :--- | :--- |
| **ERC-8004 Identity Registry** | `0x8004A818BFB912233c491871b3d84c89A494BD9e` |
| **ERC-8004 Reputation Registry** | `0x8004B663056A597Dffe9eCcC1965A193B7388713` |

---

## How to Switch Networks

### Option A: Environment Variable (`.env`)
Update your `.env` file to point to Base Sepolia:
```env
RPC_URL=https://sepolia.base.org
```

### Option B: Code Switching (`config.js`)
Toggle the `RPC_URL` constant in `config.js`:
```javascript
// Base Sepolia L2
export const RPC_URL = process.env.RPC_URL || "https://sepolia.base.org";

// Ethereum Sepolia L1
// export const RPC_URL = "https://ethereum-sepolia-rpc.publicnode.com";
```

---

## Obtaining Base Sepolia Testnet ETH

Before executing transactions on Base Sepolia L2, ensure both your **Client Wallet** (`PRIVATE_KEY`) and **ProofAgent Evaluator Wallet** (`PROOFAGENT_PRIVATE_KEY`) have L2 ETH:

1. **Alchemy Base Sepolia Faucet:** [alchemy.com/faucets/base-sepolia](https://www.alchemy.com/faucets/base-sepolia)
2. **QuickNode Base Sepolia Faucet:** [faucet.quicknode.com/base/sepolia](https://faucet.quicknode.com/base/sepolia)
3. **Official Base Bridge:** [bridge.base.org/deposit](https://bridge.base.org/deposit) (Bridge ETH from Ethereum Sepolia L1 to Base Sepolia L2)

---

## Verification

Run the main execution script after configuring Base Sepolia RPC:
```bash
node main.js
```
