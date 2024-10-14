import crypto from "node:crypto";
import fs from "node:fs";

export const getSha256 = (filePath) => {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash("sha256");
    const readStream = fs.createReadStream(filePath);

    readStream.on("data", (data) => {
      hash.update(data);
    });

    readStream.on("end", () => {
      const fileHash = hash.digest("hex");
      resolve(fileHash);
    });

    readStream.on("error", (err) => {
      reject(err);
    });
  });
};
