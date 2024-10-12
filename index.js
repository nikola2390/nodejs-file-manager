import { parseArguments } from "./parseArguments.js";
import readline from "readline/promises";

// npm run start -- --username=ASDFGH

const { username } = parseArguments(process.argv);
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(`Welcome to the File Manager, ${username}!`);
