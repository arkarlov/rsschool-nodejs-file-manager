import fs from "node:fs";
import path from "node:path";
import stream from "node:stream";
import zlib from "node:zlib";

export const compress = async (sourcePath, targetPath) => {
  if (!sourcePath || !targetPath)
    throw new Error("compress: sourcePath, targetPath must be provided");

  return new Promise((resolve, reject) => {
    const source = path.resolve(sourcePath);
    const target = path.resolve(targetPath);
    const destination = path.extname(target)
      ? target
      : path.join(target, "archive.gz");

    const readStream = fs.createReadStream(source, {
      encoding: "utf8",
      flags: "r",
    });

    readStream.on("error", (error) => {
      reject(error);
    });

    readStream.on("open", () => {
      const gzip = zlib.createGzip();
      const writeStream = fs.createWriteStream(destination, { flags: "wx" });

      stream.pipeline(readStream, gzip, writeStream, (error) => {
        reject(error);
      });

      writeStream.on("error", (error) => {
        reject(error);
      });

      writeStream.on("finish", () => {
        resolve(true);
      });
    });
  });
};

export const decompress = async (sourcePath, targetPath) => {
  if (!sourcePath || !targetPath)
    throw new Error("compress: sourcePath, targetPath must be provided");

  return new Promise((resolve, reject) => {
    const source = path.resolve(sourcePath);
    const destination = path.resolve(targetPath);

    const readStream = fs.createReadStream(source, {
      flags: "r",
    });

    readStream.on("error", (error) => {
      reject(error);
    });

    readStream.on("open", () => {
      const gunzip = zlib.createGunzip();
      const writeStream = fs.createWriteStream(destination, { flags: "wx" });

      stream.pipeline(readStream, gunzip, writeStream, (error) => {
        reject(error);
      });

      writeStream.on("error", (error) => {
        reject(error);
      });

      writeStream.on("finish", () => {
        resolve(true);
      });
    });
  });
};
