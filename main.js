import { registerAgent, lookupAgent } from "./identity.js";
import { submitFeedback } from "./reputation.js";
import { wrapReport } from "./report.js";

async function main() {
  const { hash, uri } = await wrapReport('./dummy-report.json');

  const agentId = await registerAgent(uri);
  console.log("Registered agent:", agentId.toString());
  console.log("Verified:", await lookupAgent(agentId));

  const txHash = await submitFeedback(agentId, 85, uri, hash);
  console.log("Feedback tx:", txHash);
}

main();