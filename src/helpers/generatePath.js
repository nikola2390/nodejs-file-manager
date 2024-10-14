import path from "node:path";

import { parseInput } from "./parseInput.js";

export const generatePath = (dirname, input) => {
  return parseInput(input)
    .slice(1)
    .map((filePath) => {
      if (!path.isAbsolute(filePath)) {
        return path.join(dirname, filePath);
      }
      return filePath;
    });
};
