import { createReadStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { EOL } from "node:os";

export const read = async (filePath) => {
  await pipeline(createReadStream(filePath), process.stdout, { end: false });
  console.log(EOL);
};
