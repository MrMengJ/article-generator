import { dirname, resolve } from "path";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const loadCorpus = (src) => {
  const path = resolve(__dirname, "..", src);
  console.log("path", path);
  const data = readFileSync(path, { encoding: "utf-8" });
  return JSON.parse(data);
};

export const saveCorpus = (title, article) => {
  const outputDir = resolve(__dirname, "../output");
  const outputFile = resolve(outputDir, `${title}-${new Date().getTime()}.txt`);

  if (!existsSync(outputDir)) {
    mkdirSync(outputDir);
  }

  const text = `${title}\n\n    ${article.join("\n    ")}`;
  writeFileSync(outputFile, text);

  return outputFile;
};
