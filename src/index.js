import { homedir } from "node:os";
import path from "node:path";
import readline from "node:readline";

import { parseArguments } from "./parseArguments.js";
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
import { parseInput } from "./parseInput.js";
import { generatePath } from "./generatePath.js";

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
    const [_, command] = parseInput(input);

    try {
      operationSystemInfo(command);
    } catch (error) {
      console.error("Operation failed");
    }
    console.log(`You are currently in ${__dirname}`);
  } else if (input === "up") {
    try {
      process.chdir("..");
    } catch (error) {
      console.error("Operation failed");
    }
    __dirname = process.cwd();
    console.log(`You are currently in ${__dirname}`);
  } else if (input.trim().startsWith("cd ")) {
    const [destinationPath] = generatePath(__dirname, input);

    try {
      process.chdir(destinationPath);
    } catch (error) {
      console.error("Operation failed");
    }
    __dirname = process.cwd();
    console.log(`You are currently in ${__dirname}`);
  } else if (input.trim().startsWith("hash ")) {
    let [filePath] = generatePath(__dirname, input);
    try {
      await calculateHash(filePath);
    } catch (error) {
      console.error("Operation failed");
    }
    console.log(`You are currently in ${__dirname}`);
  } else if (input.trim().startsWith("compress ")) {
    const [filePath, destinationPath] = generatePath(__dirname, input);

    try {
      await compress(filePath, destinationPath);
    } catch (error) {
      console.error("Operation failed");
    }
    console.log(`You are currently in ${__dirname}`);
  } else if (input.trim().startsWith("decompress ")) {
    const [filePath, destinationPath] = generatePath(__dirname, input);

    try {
      await decompress(filePath, destinationPath);
    } catch (error) {
      console.error("Operation failed");
    }
    console.log(`You are currently in ${__dirname}`);
  } else if (input.trim().startsWith("cat ")) {
    const [filePath] = generatePath(__dirname, input);

    try {
      await read(filePath);
    } catch (error) {
      console.error("Operation failed");
    }
    console.log(`You are currently in ${__dirname}`);
  } else if (input.trim().startsWith("add ")) {
    const [filePath] = generatePath(__dirname, input);

    try {
      await addEmptyFile(filePath);
    } catch (error) {
      console.error("Operation failed");
    }
    console.log(`You are currently in ${__dirname}`);
  } else if (input.trim().startsWith("rn ")) {
    const [oldPath] = generatePath(__dirname, input);
    const newFileName = parseInput(input)[2];
    const newPath = path.join(path.parse(oldPath).dir, newFileName);

    try {
      await renameFile(oldPath, newPath);
    } catch (error) {
      console.error("Operation failed");
    }
    console.log(`You are currently in ${__dirname}`);
  } else if (input.trim().startsWith("cp ")) {
    const [filePath, newDirectory] = generatePath(__dirname, input);
    const newPath = path.join(newDirectory, path.parse(filePath).base);

    try {
      await copyFile(filePath, newPath);
    } catch (error) {
      console.error("Operation failed");
    }
    console.log(`You are currently in ${__dirname}`);
  } else if (input.trim().startsWith("rm ")) {
    const [filePath] = generatePath(__dirname, input);

    try {
      await removeFile(filePath);
    } catch (error) {
      console.error("Operation failed");
    }
    console.log(`You are currently in ${__dirname}`);
  } else if (input.trim().startsWith("mv ")) {
    const [filePath, newDirectory] = generatePath(__dirname, input);
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
