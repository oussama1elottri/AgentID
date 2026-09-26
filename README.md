# AgentID

Portable, independently-verifiable identity and reputation for AI agents, built on [ERC-8004](https://eips.ethereum.org/EIPS/eip-8004).

## What this is

AgentID anchors AI agent identities and evaluation feedback on public, permissionless infrastructure using the **Identity** and **Reputation** registries of ERC-8004. It decouples agent identity registration from evaluation reporting: agent owners register and hold their own on-chain identity, while evaluators publish scoped, authorized feedback referencing a content-addressed IPFS evaluation report.

This project was built with [ProofAgent](https://proofagent.ai) in mind as a motivating example. **It is an independent proof-of-concept — not affiliated with, endorsed by, or reviewed by ProofAgent.**

**Status:** Working prototype tested end-to-end on Ethereum Sepolia testnet. Not production-hardened.

---

## How it works

1. **Identity Registry**: The agent owner registers their agent on-chain, assigning a unique `agentId` mapped to a `tokenURI`. Ownership remains with the agent owner.
2. **Reputation Registry**: Evaluators submit feedback (score, tags, and report hash), gated by owner authorization. Self-review is prevented by contract design.
3. **Decentralized Storage (IPFS)**: Evaluation reports live off-chain on IPFS. Only the report hash and link are committed on-chain.

*Note: This implementation omits the ERC-8004 Validation registry, as it remains under active revision by the standard's authors.*

### Contract Addresses (Ethereum Sepolia)

| Registry | Contract Address | Status |
| :--- | :--- | :--- |
| **ERC-8004 Identity** | `0x8004A818BFB912233c491871b3d84c89A494BD9e` | Tested |
| **ERC-8004 Reputation** | `0x8004B663056A597Dffe9eCcC1965A193B7388713` | Tested |

---

## Project Structure

```
├── src/
│   ├── config.js       # RPC provider, wallets, contract addresses, ABIs
│   ├── identity.js     # Identity registration and lookup
│   ├── reputation.js   # Feedback authorization and submission
│   ├── report.js       # Report hashing and IPFS publishing
│   └── lookup.js       # Standalone, read-only verification tool
├── data/
│   └── dummy-report.json
├── test/
│   └── integration.test.js
├── main.js
└── .env.example
```

---

## Setup & Usage

### 1. Installation & Environment

```bash
npm install
cp .env.example .env
```

Configure `.env`:
```ini
PRIVATE_KEY=              # Agent owner wallet (Sepolia ETH)
PROOFAGENT_PRIVATE_KEY=   # Evaluator wallet (Sepolia ETH)
PINATA_JWT=               # Pinata IPFS API JWT
```

### 2. Execution Commands

```bash
npm test                      # Verify environment, contract bytecode, and IPFS setup
node main.js                  # Run full pipeline: hash -> upload -> register -> feedback
node src/lookup.js <agentId>  # Read-only verification of any agent on-chain
```

---

## Known Limitations

- Tested on Ethereum Sepolia testnet. Base Sepolia contract deployment uses deterministic CREATE2 addresses and is expected to work identically once RPC faucet access is available.
- Gas costs reflect Ethereum Sepolia (L1-equivalent) pricing; production deployment would target an L2 (such as Base) for significantly lower fees.

---

## License

MIT