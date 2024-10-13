import { login } from "./modules/login.js";

export const app = () => {
  const username = login();

  if (!username) {
    console.log(
      'Use command: "npm run start -- --username=your_username" to ran the app.'
    );
    return;
  }

  console.log(`Welcome to the File Manager, ${username}!`);
};
