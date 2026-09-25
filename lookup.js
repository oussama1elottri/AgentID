import { ethers } from "ethers";
import { provider, IDENTITY_ADDRESS, IDENTITY_ABI, REPUTATION_ADDRESS, proofAgentWallet } from "./config.js";

const identityContract = new ethers.Contract(IDENTITY_ADDRESS, IDENTITY_ABI, provider);

const REPUTATION_READ_ABI = [
  "function getSummary(uint256 agentId, address[] clientAddresses, string tag1, string tag2) view returns (uint64 count, int128 averageValue, uint8 valueDecimals)"
];
const reputationContract = new ethers.Contract(REPUTATION_ADDRESS, REPUTATION_READ_ABI, provider);

export async function lookupAgent(agentId, trustedReviewers = [proofAgentWallet.address]) {
  const owner = await identityContract.ownerOf(agentId);
  const uri = await identityContract.tokenURI(agentId);
  const [count, averageValue, decimals] = await reputationContract.getSummary(agentId, trustedReviewers, "", "");

  console.log(`Agent ${agentId}`);
  console.log(`Owner: ${owner}`);
  console.log(`Metadata: ${uri}`);
  console.log(`Reputation: ${count} review(s) from trusted set, avg ${averageValue} (decimals: ${decimals})`);
}

lookupAgent(process.argv[2]);