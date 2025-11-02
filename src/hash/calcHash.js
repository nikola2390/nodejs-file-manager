import { createReadStream } from "node:fs";
import { createHash } from "node:crypto";
import { stdout } from "node:process";
import { EOL } from "node:os";
import { pipeline } from "node:stream/promises";

export const calculateHash = async (filePath) => {
  const hash = createHash("sha256");
  const input = createReadStream(filePath);

  await pipeline(input, hash.setEncoding("hex"), stdout, {
    end: false,
  });
  console.log(EOL);
};
