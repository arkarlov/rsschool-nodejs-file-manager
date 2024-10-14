import { login } from "./modules/index.js";
import { cliController } from "./controllers/index.js";

export function app() {
  const username = login();

  if (!username) {
    console.log(
      'Use command: "npm run start -- --username=your_username" to ran the app.'
    );
    return;
  }

  console.log(`Welcome to the File Manager, ${username}!`);
  console.log(`\nTo display information, use the "help" command.`);

  cliController(username);
}
