import { ethers } from "ethers";
import { provider, proofAgentWallet } from "./config.js";
import { registerAgent, lookupAgent } from "./identity.js";
import { submitFeedback } from "./reputation.js";
import { wrapReport } from "./report.js";

async function main() {
  const { hash, uri } = await wrapReport('./dummy-report.json');

  const before = await provider.getBalance(proofAgentWallet.address);

  const agentId = await registerAgent(uri);
  console.log("Registered agent:", agentId.toString());
  console.log("Verified:", await lookupAgent(agentId));

  const txHash = await submitFeedback(agentId, 85, uri, hash);
  console.log("Feedback tx:", txHash);

  const after = await provider.getBalance(proofAgentWallet.address);
  const cost = before - after;
  console.log(`Cost of this cycle: ${ethers.formatEther(cost)} ETH`);
}

main();
