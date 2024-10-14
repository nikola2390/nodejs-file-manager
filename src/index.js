import { parseArguments } from "./parseArguments.js";
import readline from "node:readline";
import { homedir } from "node:os";
import path from "node:path";
import { calculateHash } from "./calcHash.js";
import { compress } from "./compress.js";
import { decompress } from "./decompress.js";
import { read } from "./read.js";
import { addEmptyFile } from "./addEmptyFile.js";
import { renameFile } from "./renameFile.js";
import { copyFile } from "./copyFile.js";
import { removeFile } from "./removeFile.js";
import { moveFile } from "./moveFile.js";
import { operationSystemInfo } from "./operationSystemInfo.js";
import { list } from "./list.js";

const { username } = parseArguments(process.argv);
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let __dirname = homedir();

process.chdir(__dirname);

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
    try {
      await list(__dirname);
    } catch (error) {
      console.error("Operation failed");
    }

    console.log(`You are currently in ${__dirname}`);
  } else if (input.trim().startsWith("os ")) {
    const command = input.split(" ")[1].slice(2);

    try {
      operationSystemInfo(command);
    } catch (error) {
      console.error("Operation failed");
    }
  } else if (input === "up") {
    try {
      process.chdir("..");
    } catch (error) {
      console.error("Operation failed");
    }
    __dirname = process.cwd();
    console.log(`You are currently in ${__dirname}`);
  } else if (input.trim().startsWith("cd ")) {
    let destinationPath = input.split(" ")[1];

    try {
      process.chdir(destinationPath);
    } catch (error) {
      console.error("Operation failed");
    }
    __dirname = process.cwd();
    console.log(`You are currently in ${__dirname}`);
  } else if (input.trim().startsWith("hash ")) {
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
  } else if (input.trim().startsWith("compress ")) {
    const filePath = path.isAbsolute(input.split(" ")[1])
      ? input.split(" ")[1]
      : path.join(__dirname, input.split(" ")[1]);
    const destinationPath = path.isAbsolute(input.split(" ")[2])
      ? input.split(" ")[2]
      : path.join(__dirname, input.split(" ")[2]);

    try {
      await compress(filePath, destinationPath);
    } catch (error) {
      console.error("Operation failed");
    }
    console.log(`You are currently in ${__dirname}`);
  } else if (input.trim().startsWith("decompress ")) {
    const filePath = path.isAbsolute(input.split(" ")[1])
      ? input.split(" ")[1]
      : path.join(__dirname, input.split(" ")[1]);
    const destinationPath = path.isAbsolute(input.split(" ")[2])
      ? input.split(" ")[2]
      : path.join(__dirname, input.split(" ")[2]);

    try {
      await decompress(filePath, destinationPath);
    } catch (error) {
      console.error("Operation failed");
    }
    console.log(`You are currently in ${__dirname}`);
  } else if (input.trim().startsWith("cat ")) {
    const filePath = path.isAbsolute(input.split(" ")[1])
      ? input.split(" ")[1]
      : path.join(__dirname, input.split(" ")[1]);

    try {
      await read(filePath);
    } catch (error) {
      console.error("Operation failed");
    }
    console.log(`You are currently in ${__dirname}`);
  } else if (input.trim().startsWith("add ")) {
    const fileName = input.split(" ")[1];
    const filePath = path.join(__dirname, fileName);

    try {
      await addEmptyFile(filePath);
    } catch (error) {
      console.error("Operation failed");
    }
    console.log(`You are currently in ${__dirname}`);
  } else if (input.trim().startsWith("rn ")) {
    const oldPath = path.isAbsolute(input.split(" ")[1])
      ? input.split(" ")[1]
      : path.join(__dirname, input.split(" ")[1]);
    const newFileName = input.split(" ")[2];
    const newPath = path.join(path.parse(oldPath).dir, newFileName);

    try {
      await renameFile(oldPath, newPath);
    } catch (error) {
      console.error("Operation failed");
    }
    console.log(`You are currently in ${__dirname}`);
  } else if (input.trim().startsWith("cp ")) {
    const filePath = path.isAbsolute(input.split(" ")[1])
      ? input.split(" ")[1]
      : path.join(__dirname, input.split(" ")[1]);
    const newDirectory = path.isAbsolute(input.split(" ")[2])
      ? input.split(" ")[2]
      : path.join(__dirname, input.split(" ")[2]);
    const newPath = path.join(newDirectory, path.parse(filePath).base);

    try {
      await copyFile(filePath, newPath);
    } catch (error) {
      console.error("Operation failed");
    }
    console.log(`You are currently in ${__dirname}`);
  } else if (input.trim().startsWith("rm ")) {
    const filePath = path.isAbsolute(input.split(" ")[1])
      ? input.split(" ")[1]
      : path.join(__dirname, input.split(" ")[1]);

    try {
      await removeFile(filePath);
    } catch (error) {
      console.error("Operation failed");
    }
    console.log(`You are currently in ${__dirname}`);
  } else if (input.trim().startsWith("mv ")) {
    const filePath = path.isAbsolute(input.split(" ")[1])
      ? input.split(" ")[1]
      : path.join(__dirname, input.split(" ")[1]);
    const newDirectory = path.isAbsolute(input.split(" ")[2])
      ? input.split(" ")[2]
      : path.join(__dirname, input.split(" ")[2]);
    const newPath = path.join(newDirectory, path.parse(filePath).base);

    try {
      await moveFile(filePath, newPath);
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
