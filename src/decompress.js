import { createBrotliDecompress } from "node:zlib";
import { pipeline } from "node:stream/promises";
import { createReadStream, createWriteStream } from "node:fs";

export const decompress = async (filePath, destinationPath) => {
  const brotliCompress = createBrotliDecompress();

  await pipeline(
    createReadStream(filePath),
    brotliCompress,
    createWriteStream(destinationPath)
  );
};
