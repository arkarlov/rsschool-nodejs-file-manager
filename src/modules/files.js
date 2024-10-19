import fs from "node:fs/promises";
import { createReadStream, createWriteStream } from "node:fs";
import path from "node:path";
import stream from "node:stream";

export const readFile = async (filePath) => {
  if (!filePath) throw new Error("readFile: filePath must be provided");

  const targetPath = path.resolve(filePath);
  const content = await fs.readFile(targetPath, { encoding: "utf8" });

  console.log(content);
};

export const createFile = async (fileName) => {
  if (!fileName) throw new Error("createFile: fileName must be provided");

  const cwd = process.cwd();
  const filePath = path.resolve(cwd, fileName);

  await fs.writeFile(filePath, "", { flag: "wx" });
};

export const renameFile = async (filePath, newName) => {
  if (!filePath || !newName)
    throw new Error("renameFile: filePath, newName must be provided");

  const oldPath = path.resolve(filePath);
  const dirname = path.dirname(oldPath);
  const newPath = path.join(dirname, newName);

  await fs.rename(oldPath, newPath);
};

export const copyFile = async (filePath, targetDir) => {
  if (!filePath || !targetDir)
    throw new Error("copyFile: filePath, targetDir must be provided");

  return new Promise((resolve, reject) => {
    const source = path.resolve(filePath);
    const filename = path.basename(source);
    const destination = path.resolve(targetDir, filename);

    const readStream = createReadStream(source, {
      flags: "r",
      emitClose: false,
    });

    readStream.on("error", (error) => {
      reject(error);
    });

    readStream.on("open", () => {
      const writeStream = createWriteStream(destination, { flags: "wx" });
      readStream.pipe(writeStream);

      writeStream.on("error", (error) => {
        reject(error);
      });

      writeStream.on("finish", () => {
        resolve(true);
      });
    });
  });
};

export const moveFile = async (filePath, targetDir) => {
  if (!filePath || !targetDir)
    throw new Error("copyFile: filePath, targetDir must be provided");

  await copyFile(filePath, targetDir);
  await fs.rm(path.resolve(filePath));
};

export const removeFile = async (filePath) => {
  if (!filePath) throw new Error("removeFile: filePath must be provided");

  const targetPath = path.resolve(filePath);

  await fs.rm(targetPath);
};
