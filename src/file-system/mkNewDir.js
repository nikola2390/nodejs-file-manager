import { mkdir } from "node:fs/promises";

export const mkNewDir = async (dirPath) => {
  await mkdir(dirPath);
};
