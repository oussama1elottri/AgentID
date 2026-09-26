import { ethers } from "ethers";
import { clientWallet, IDENTITY_ADDRESS, IDENTITY_ABI } from "./config.js";

const identityContract = new ethers.Contract(IDENTITY_ADDRESS, IDENTITY_ABI, clientWallet);

export async function lookupAgent(agentId) {
  const owner = await identityContract.ownerOf(agentId);
  const uri = await identityContract.tokenURI(agentId);
  return { owner, uri };
}

export async function registerAgent(tokenURI) {
  const tx = await identityContract.register(tokenURI);
  const receipt = await tx.wait();
  const parsed = receipt.logs
    .map(log => { try { return identityContract.interface.parseLog(log); } catch { return null; } })
    .find(e => e?.name === "Registered");
  return parsed.args.agentId;
}


