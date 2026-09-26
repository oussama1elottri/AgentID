import test from "node:test";
import assert from "node:assert/strict";
import { ethers } from "ethers";
import { provider, clientWallet, proofAgentWallet, IDENTITY_ADDRESS, REPUTATION_ADDRESS } from "../config.js";
import { wrapReport } from "../report.js";

test("ProofAgent Integration Suite", async (t) => {
  await t.test("RPC Provider Connectivity", async () => {
    const network = await provider.getNetwork();
    assert.ok(network.chainId > 0n, "Should resolve valid chain ID");
  });

  await t.test("Wallet Configuration", () => {
    assert.ok(ethers.isAddress(clientWallet.address), "Client wallet address should be valid");
    assert.ok(ethers.isAddress(proofAgentWallet.address), "ProofAgent wallet address should be valid");
    assert.notEqual(clientWallet.address, proofAgentWallet.address, "Client and ProofAgent wallets must be separate");
  });

  await t.test("Contract Deployment Bytecode Check", async () => {
    const identityCode = await provider.getCode(IDENTITY_ADDRESS);
    const reputationCode = await provider.getCode(REPUTATION_ADDRESS);
    assert.ok(identityCode.length > 2, "Identity contract must be deployed on selected RPC");
    assert.ok(reputationCode.length > 2, "Reputation contract must be deployed on selected RPC");
  });

  await t.test("IPFS Report Pinning Wrapper", async () => {
    const { hash, uri } = await wrapReport("./dummy-report.json");
    assert.ok(hash.startsWith("0x"), "Report hash should be bytes32 hex string");
    assert.ok(uri.startsWith("ipfs://"), "URI should start with ipfs://");
  });
});
