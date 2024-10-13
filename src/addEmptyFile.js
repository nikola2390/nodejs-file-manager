import { open } from "node:fs/promises";

export const addEmptyFile = async (filePath) => {
  const fileHandle = await open(filePath, "wx");
  await fileHandle.close();
};
