import { COMMAND } from "../config/index.js";
import {
  calculateHash,
  changeDir,
  compress,
  copyFile,
  createFile,
  decompress,
  help,
  listDir,
  moveFile,
  osInfo,
  readFile,
  removeFile,
  renameFile,
  upDir,
} from "../modules/index.js";

export async function cmdController({ command, options, args }) {
  try {
    switch (command) {
      case COMMAND.help:
        help();
        break;

      case COMMAND.upDir:
        upDir();
        break;
      case COMMAND.changeDir:
        changeDir(...args);
        break;
      case COMMAND.listDir:
        await listDir();
        break;

      case COMMAND.osInfo:
        osInfo(options?.[0]);
        break;

      case COMMAND.hashFile:
        await calculateHash(args?.[0]);
        break;

      case COMMAND.cat:
        await readFile(args?.[0]);
        break;
      case COMMAND.createFile:
        await createFile(args?.[0]);
        break;
      case COMMAND.renameFile:
        await renameFile(...args);
        break;
      case COMMAND.copyFile:
        await copyFile(...args);
        break;
      case COMMAND.moveFile:
        await moveFile(...args);
        break;
      case COMMAND.removeFile:
        await removeFile(args?.[0]);
        break;

      case COMMAND.zip:
        await compress(...args);
        break;
      case COMMAND.unzip:
        await decompress(...args);
        break;

      default:
        console.log("Invalid input");
        break;
    }
  } catch (error) {
    // console.error(error); // TODO: remove
    console.log("Operation failed");
  }
}
