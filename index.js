import { parseArguments } from "./parseArguments.js";
import readline from "readline";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { homedir, EOL, userInfo, arch, cpus } from "os";
import { readdir } from "fs/promises";
import path from "path";

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
    let dirnamePath = __dirname;
    let dirnamePathParsed = dirnamePath.split("\\");

    if (dirnamePathParsed.length !== 1) {
      dirnamePathParsed.pop();
      if (dirnamePathParsed.length === 1) {
        dirnamePathParsed[0] = `${dirnamePathParsed[0]}\\`;
      }
      let newPath = path.join(...dirnamePathParsed);
      process.chdir(newPath);
      __dirname = newPath;
    }
    console.log(`You are currently in ${__dirname}`);
  } else {
    console.log("Invalid input");
  }
});

rl.on("SIGINT", () => {
  closeFileManager();
});
