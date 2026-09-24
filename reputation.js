import { ethers } from "ethers";
import { clientWallet, proofAgentWallet, REPUTATION_ADDRESS, REPUTATION_ABI, provider } from "./config.js";

const reputationContract = new ethers.Contract(REPUTATION_ADDRESS, REPUTATION_ABI, clientWallet);

async function ensureClientHasGas() {
  const balance = await provider.getBalance(clientWallet.address);
  if (balance < ethers.parseEther("0.001")) {
    console.log(`Funding clientWallet (${clientWallet.address}) with 0.005 Sepolia ETH from proofAgentWallet...`);
    const tx = await proofAgentWallet.sendTransaction({
      to: clientWallet.address,
      value: ethers.parseEther("0.005")
    });
    await tx.wait();
    console.log("Funding confirmed!");
  }
}

export async function submitFeedback(agentId, score, fileuri, filehash) {
  await ensureClientHasGas();

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