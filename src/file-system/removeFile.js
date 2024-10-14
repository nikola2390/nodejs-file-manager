import { unlink } from "node:fs/promises";

export const removeFile = async (filePath) => {
  await unlink(filePath).catch(() => {
    throw Error("FS operation failed");
  });
};
