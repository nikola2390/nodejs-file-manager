import { createReadStream } from "fs";
import { createHash } from "crypto";
import { stdout } from "process";
import { EOL } from "os";
import { pipeline } from "stream/promises";

export const calculateHash = async (filePath) => {
  const hash = createHash("sha256");
  const input = createReadStream(filePath);

  await pipeline(input, hash.setEncoding("hex"), stdout, {
    end: false,
  });
  console.log(EOL);
};
