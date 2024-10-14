import { parseArgs } from "node:util";
import { args } from "../config/index.js";

export const login = () => {
  try {
    const parsedArgs = parseArgs({ options: args });
    return parsedArgs.values.username;
  } catch (error) {
    return null;
  }
};
