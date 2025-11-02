import { readdir } from "node:fs/promises";

export const list = async (dirname) => {
  await readdir(dirname, { withFileTypes: true }).then((data) => {
    const list = [];

    data.forEach((element) => {
      const name = element.name;
      const type = element.isDirectory()
        ? "directory"
        : element.isFile()
        ? "file"
        : element.isSymbolicLink()
        ? "symbolic link"
        : "unknown";
      list.push({ name, type });
    });

    list.sort((a, b) => {
      return a.type.localeCompare(b.type) || a.name.localeCompare(b.name);
    });

    console.table(list);
  });
};
