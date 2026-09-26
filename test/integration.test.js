import test from "node:test";
import assert from "node:assert/strict";
import { ethers } from "ethers";
import { provider, clientWallet, proofAgentWallet, IDENTITY_ADDRESS, REPUTATION_ADDRESS } from "../src/config.js";
import { wrapReport } from "../src/report.js";

test("ProofAgent Protocol Integration Suite", async (t) => {
  await t.test("Network & RPC Connectivity", async () => {
    const network = await provider.getNetwork();
    assert.ok(network.chainId > 0n, "Chain ID must be resolved");
  });

  await t.test("Cryptographic Keypair Configuration", () => {
    assert.ok(ethers.isAddress(clientWallet.address), "Client wallet address must be valid");
    assert.ok(ethers.isAddress(proofAgentWallet.address), "ProofAgent wallet address must be valid");
    assert.notEqual(clientWallet.address, proofAgentWallet.address, "Wallets must have distinct roles");
  });

  await t.test("ERC-8004 Contract Deployment State", async () => {
    const identityCode = await provider.getCode(IDENTITY_ADDRESS);
    const reputationCode = await provider.getCode(REPUTATION_ADDRESS);
    assert.ok(identityCode.length > 2, "Identity contract bytecode must be deployed");
    assert.ok(reputationCode.length > 2, "Reputation contract bytecode must be deployed");
  });

  await t.test("IPFS Content-Addressing Wrapper", async () => {
    const { hash, uri } = await wrapReport("./data/dummy-report.json");
    assert.ok(hash.startsWith("0x"), "Report hash must be a valid hex string");
    assert.ok(uri.startsWith("ipfs://"), "Report URI must follow the IPFS protocol scheme");
  });
});
