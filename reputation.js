import { ethers } from "ethers";
import { proofAgentWallet, REPUTATION_ADDRESS, REPUTATION_ABI } from "./config.js";

const reputationContract = new ethers.Contract(REPUTATION_ADDRESS, REPUTATION_ABI, proofAgentWallet);

export async function submitFeedback(agentId, score, fileuri, filehash) {
  const tx = await reputationContract.giveFeedback(
    BigInt(agentId),
    BigInt(score), // int128 value
    0,             // uint8 valueDecimals
    "audit",       // tag1
    "",            // tag2
    "",            // endpoint
    fileuri,       // feedbackURI
    filehash       // feedbackHash
  );

  const receipt = await tx.wait();
  return receipt.hash;
}