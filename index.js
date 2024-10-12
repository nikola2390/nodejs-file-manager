import { parseArguments } from "./parseArguments.js";
import readline from "readline/promises";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { homedir } from "os";
import { readdir } from "fs/promises";

// npm run start -- --username=ASDFGH

const { username } = parseArguments(process.argv);
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const home = homedir();
// const __dirname = dirname(fileURLToPath(import.meta.url));
const __dirname = home;

process.chdir(home);
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
  if (input === "ls") {
    console.log("list");
    readdir(__dirname).then((data) => {
      console.log(data);
    });
    console.log(`You are currently in ${__dirname}`);
  }
});

rl.on("SIGINT", () => {
  closeFileManager();
});
