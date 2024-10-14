import { getSha256 } from "../utils/index.js";

export const calculateHash = async (filePath) => {
  if (!filePath) throw new Error("calculateHash: filePath must be provided");

  const sha256 = await getSha256(filePath);
  console.log(sha256);
};
