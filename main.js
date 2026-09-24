import { registerAgent, lookupAgent } from "./identity.js";
import { submitFeedback } from "./reputation.js";

const ZERO_HASH = "0x" + "00".repeat(32);

async function main() {
//   const agentId = await registerAgent("Free Plestine");
//   console.log("Registered agent:", agentId.toString());

//   const info = await lookupAgent(agentId);
//   console.log("Verified:", info);

  const txHash = await submitFeedback(10509, 100, "Free Plestine", ZERO_HASH);
  console.log("Feedback tx:", txHash);
}

main();