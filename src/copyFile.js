import { pipeline } from "stream/promises";
import { createReadStream, createWriteStream, existsSync } from "node:fs";

export const copyFile = async (filePath, newPath) => {
  if (!existsSync(filePath) || existsSync(newPath)) {
    throw Error("FS operation failed");
  }

  await pipeline(createReadStream(filePath), createWriteStream(newPath));
};
