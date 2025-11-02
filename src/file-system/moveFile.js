import { copyFile } from "./copyFile.js";
import { removeFile } from "./removeFile.js";

export const moveFile = async (filePath, newPath) => {
  await copyFile(filePath, newPath);
  await removeFile(filePath);
};
