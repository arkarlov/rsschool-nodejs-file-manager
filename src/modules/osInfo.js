import os from "node:os";
import { OS_CMD_OPTION } from "../config/index.js";

export const osInfo = (option) => {
  if (!option) throw new Error("osInfo: option must be provided");

  switch (option) {
    case OS_CMD_OPTION.eol:
      console.log(JSON.stringify(os.EOL));
      break;
    case OS_CMD_OPTION.cpus:
      const cpus = os.cpus();
      const output = {
        amount: cpus.length,
        cpus: cpus.map((cpu, index) => ({ index, model: cpu.model })),
      };
      console.log(output);
      break;
    case OS_CMD_OPTION.homedir:
      const homedir = os.homedir();
      console.log(homedir);
      break;
    case OS_CMD_OPTION.username:
      const userInfo = os.userInfo();
      console.log(userInfo.username);
      break;
    case OS_CMD_OPTION.architecture:
      const platform = os.platform();
      console.log(platform);
      break;

    default:
      throw new Error("osInfo: unknown option");
  }
};
