import fs from "node:fs/promises";
import path from "node:path";

export const upDir = () => {
  const upDirPath = path.resolve("..");
  process.chdir(upDirPath);

  return upDirPath;
};

export const changeDir = (targetPath) => {
  process.chdir(targetPath);

  return targetPath;
};

export const listDir = async () => {
  const cwd = process.cwd();

  const list = await fs.readdir(cwd, { withFileTypes: true });

  const sortedList = list
    .sort(
      (a, b) =>
        Number(a.isFile()) - Number(b.isFile()) || a.name.localeCompare(b.name)
    )
    .map((el, index) => ({
      index,
      name: el.name,
      type: el.isFile() ? "file" : "directory",
    }));

  console.log(sortedList);

  return sortedList;
};
