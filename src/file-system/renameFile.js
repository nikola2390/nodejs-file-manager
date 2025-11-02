import { rename } from "node:fs/promises";
import { existsSync } from "node:fs";

export const renameFile = async (oldPath, newPath) => {
  if (existsSync(newPath)) {
    throw Error("FS operation failed");
  }

  await rename(oldPath, newPath).catch(() => {
    throw Error("FS operation failed");
  });
};
