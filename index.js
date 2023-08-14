import { readFile } from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const url = import.meta.url;
const filePath = fileURLToPath(url);
const theDirname = dirname(filePath);
const path = resolve(theDirname, "corpus/data.json");

readFile(path, { encoding: "utf-8" }, (err, data) => {
  console.log("data", JSON.parse(data));
});
