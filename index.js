import { parseArguments } from "./parseArguments.js";
import readline from "readline/promises";
import { dirname } from "path";
import { fileURLToPath } from "url";

// npm run start -- --username=ASDFGH

const { username } = parseArguments(process.argv);
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const __dirname = dirname(fileURLToPath(import.meta.url));

const closeFileManager = () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  rl.close();
};

console.log(`Welcome to the File Manager, ${username}!`);
console.log(`You are currently in ${__dirname}`);

rl.on("line", (input) => {
  if (input === ".exit") {
    closeFileManager();
  }
  console.log(`You are currently in ${__dirname}`);
});

rl.on("SIGINT", () => {
  closeFileManager();
});
