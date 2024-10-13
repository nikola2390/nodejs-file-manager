import { open } from "node:fs/promises";

export const addEmptyFile = async (filePath) => {
  await open(filePath, "wx");
};
