import { createBrotliCompress } from "node:zlib";
import { pipeline } from "node:stream/promises";
import { createReadStream, createWriteStream } from "node:fs";

export const compress = async (filePath, destinationPath) => {
  const brotliCompress = createBrotliCompress();

  await pipeline(
    createReadStream(filePath),
    brotliCompress,
    createWriteStream(destinationPath)
  );
};
