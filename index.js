
import { ethers } from "ethers";
import 'dotenv/config';







// const RPC_URL = "https://sepolia.base.org"; 
const RPC_URL = "https://ethereum-sepolia-rpc.publicnode.com"; 
const CONTRACT_ADDRESS = "0x8004A818BFB912233c491871b3d84c89A494BD9e";

// A minimal ERC-8004/ERC-721 ABI snippet to read basic info
const MINIMAL_ABI = [
  "function ownerOf(uint256) view returns (address)",
  "function register(string tokenURI_) returns (uint256)"
];

async function main() {
  const provider = new ethers.JsonRpcProvider(RPC_URL);

  // Initialize the contract instance using provider, address, and ABI
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const identityContract = new ethers.Contract(CONTRACT_ADDRESS, MINIMAL_ABI, wallet);



  
  try {
    // Call read-only functions on the contract
    const owner = await identityContract.ownerOf(6199);
    
    console.log(`Successfully reached the Registry!`);
    console.log(`Token 6199 Owner: ${owner}`);

    // Fetch Ethereum Sepolia balance using Ethereum Sepolia RPC provider
    const sepoliaProvider = new ethers.JsonRpcProvider("https://1rpc.io/sepolia");
    const accountAddress = "0xdaC942908be518F1eeAD0815e8Bc9DDe6395f3Dd";
    const balanceWei = await sepoliaProvider.getBalance(accountAddress);
    const balanceEth = ethers.formatEther(balanceWei);
    console.log(`Sepolia ETH Balance for ${accountAddress}: ${balanceEth} ETH`);

  } catch (error) {
    console.error("Error reading from the contract:", error);
  }


  const tx = await identityContract.register("ipfs://placeholder-test");

  const receipt = await tx.wait();
  console.log("Confirmed! Tx hash:", receipt.hash);

}

main();
