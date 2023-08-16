import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

import { createRandomPicker } from "./lib/random.js";
import { generator } from "./lib/generator.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const loadCorpus = (src) => {
  const path = resolve(__dirname, src);
  const data = readFileSync(path, { encoding: "utf-8" });
  return JSON.parse(data);
};

const corpus = loadCorpus("corpus/data.json");

const pickTitle = createRandomPicker(corpus.title);
const title = pickTitle();

const article = generator(title, {
  corpus,
});

const saveCorpus = (title, article) => {
  const outputDir = resolve(__dirname, "output");
  const outputFile = resolve(outputDir, `${title}-${new Date().getTime()}.txt`);

  if (!existsSync(outputDir)) {
    mkdirSync(outputDir);
  }

  const text = `${title}\n\n    ${article.join("\n    ")}`;
  writeFileSync(outputFile, text);

  return outputFile;
};

saveCorpus(title, article);
