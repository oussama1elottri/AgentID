import { ethers } from "ethers";
import 'dotenv/config';

export const RPC_URL = "https://ethereum-sepolia-rpc.publicnode.com";
export const IDENTITY_ADDRESS = "0x8004A818BFB912233c491871b3d84c89A494BD9e";
export const REPUTATION_ADDRESS = "0x8004B663056A597Dffe9eCcC1965A193B7388713";

export const provider = new ethers.JsonRpcProvider(RPC_URL);
export const clientWallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
export const proofAgentWallet = new ethers.Wallet(process.env.PROOFAGENT_PRIVATE_KEY, provider);

export const IDENTITY_ABI = [
  "function ownerOf(uint256) view returns (address)",
  "function tokenURI(uint256) view returns (string)",
  "function register(string tokenURI_) returns (uint256)",
  "event Registered(uint256 indexed agentId, string tokenURI, address indexed owner)"
];

export const REPUTATION_ABI = [
  "function giveFeedback(uint256 agentId, int128 value, uint8 valueDecimals, string tag1, string tag2, string endpoint, string feedbackURI, bytes32 feedbackHash) external"
];