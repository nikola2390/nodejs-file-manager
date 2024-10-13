import { parseArguments } from "./parseArguments.js";
import readline from "readline";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { homedir, EOL, userInfo, arch, cpus } from "os";
import { readdir } from "fs/promises";
import path from "path";
import { calculateHash } from "./calcHash.js";

// npm run start -- --username=ASDFGH

const { username } = parseArguments(process.argv);
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const home = homedir();
// const __dirname = dirname(fileURLToPath(import.meta.url));
let __dirname = home;

process.chdir(home);

const closeFileManager = () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  rl.close();
};

console.log(`Welcome to the File Manager, ${username}!`);
console.log(`You are currently in ${__dirname}`);

rl.on("line", async (input) => {
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
      console.log(`You are currently in ${__dirname}`);
    });
    console.log(`You are currently in ${__dirname}`);
  } else if (input.startsWith("os ")) {
    const command = input.split(" ")[1].slice(2);

    switch (command) {
      case "EOL":
        console.log(EOL);
        break;
      case "cpus":
        const processors = [];
        cpus().forEach((cpu) => {
          const model = cpu.model;
          const clockrate = `${cpu.speed / 1000}GHz`;
          processors.push({ model, clockrate });
        });

        console.table(processors);
        break;
      case "homedir":
        console.log(homedir());
        break;
      case "username":
        console.log(userInfo().username);
        break;
      case "architecture":
        console.log(arch());
        break;
      default:
        console.log("Invalid input");
        break;
    }
  } else if (input === "up") {
    try {
      process.chdir("..");
    } catch (error) {
      console.error("Operation failed");
    }
    __dirname = process.cwd();
    console.log(`You are currently in ${__dirname}`);
  } else if (input.startsWith("cd ")) {
    let destinationPath = input.split(" ")[1];

    try {
      process.chdir(destinationPath);
    } catch (error) {
      console.error("Operation failed");
    }
    __dirname = process.cwd();
    console.log(`You are currently in ${__dirname}`);
  } else if (input.startsWith("hash ")) {
    let filePath = input.split(" ")[1];
    try {
      if (path.isAbsolute(filePath)) {
        await calculateHash(filePath);
      } else {
        await calculateHash(path.join(__dirname, filePath));
      }
    } catch (error) {
      console.error("Operation failed");
    }
    console.log(`You are currently in ${__dirname}`);
  } else {
    console.log("Invalid input");
  }
});

rl.on("SIGINT", () => {
  closeFileManager();
});
