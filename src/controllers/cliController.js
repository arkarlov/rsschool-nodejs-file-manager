import readline from "node:readline";
import { parseInput } from "../utils/index.js";
import { cmdController } from "./cmdController.js";
import { COMMAND } from "../config/index.js";

export function cliController(username) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const exit = () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    rl.close();
  };

  const setPrompt = () =>
    rl.setPrompt(`You are currently in ${process.cwd()}> `);

  setPrompt();

  rl.prompt();
  rl.on("SIGINT", () => {
    process.stdout.write("\n");
    exit();
  });
  rl.on("line", async (line) => {
    const { command, options, args } = parseInput(line);
    if (command === COMMAND.exit) {
      exit();
      return;
    }

    await cmdController({ command, options, args });
    setPrompt();
    rl.prompt();
  });

  return rl;
}
