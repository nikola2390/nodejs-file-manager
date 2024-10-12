import { parseArguments } from "./parseArguments.js";
import readline from "readline";
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
  } else if (input === "ls") {
    readdir(__dirname, { withFileTypes: true }).then((data) => {
      const list = [];
      data.forEach((element) => {
        const name = element.name;
        const type = element.isDirectory()
          ? "directory"
          : element.isFile()
          ? "file"
          : element.isSymbolicLink()
          ? "symbolic link"
          : "unknown";
        list.push({ name, type });
      });

      list.sort((a, b) => {
        return a.type.localeCompare(b.type) || a.name.localeCompare(b.name);
      });

      console.table(list);
    });
    console.log(`You are currently in ${__dirname}`);
  } else {
    console.log("Invalid input");
  }
});

rl.on("SIGINT", () => {
  closeFileManager();
});
