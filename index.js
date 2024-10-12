import { parseArguments } from "./parseArguments.js";
import readline from "readline/promises";

// npm run start -- --username=ASDFGH

const { username } = parseArguments(process.argv);
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const closeFileManager = () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  rl.close();
};

console.log(`Welcome to the File Manager, ${username}!`);

rl.on("line", (input) => {
  if (input === ".exit") {
    closeFileManager();
  }
});

rl.on("SIGINT", () => {
  closeFileManager();
});
