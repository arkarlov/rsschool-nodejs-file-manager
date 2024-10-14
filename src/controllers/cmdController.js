import { COMMAND } from "../config/index.js";
import { changeDir, help, listDir, osInfo, upDir } from "../modules/index.js";

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

      default:
        console.log("Invalid input");
        break;
    }
  } catch (error) {
    console.error(error); // TODO: remove
    console.log("Operation failed");
  }
}
