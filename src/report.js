import { createHash } from 'crypto';
import fs from 'fs';
import path from 'path';
import pinataSDK from '@pinata/sdk';
import 'dotenv/config';

const pinata = new pinataSDK({ pinataJWTKey: process.env.PINATA_JWT });

function hashFile(filePath) {
  return createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

export async function wrapReport(filePath) {
  const hash = hashFile(filePath);                   // fingerprint first
  const stream = fs.createReadStream(filePath);
  const options = {
    pinataMetadata: {
      name: path.basename(filePath)
    }
  };
  const result = await pinata.pinFileToIPFS(stream, options);  // then publish
  return {
    hash: '0x' + hash,               // bytes32-style hex, for the filehash param
    uri: `ipfs://${result.IpfsHash}`
  };
}
