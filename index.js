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

function parseOptions(options = {}) {
  const argv = process.argv;
  for (let i = 2; i < argv.length; i++) {
    const cmd = argv[i - 1];
    const value = argv[i];
    if (cmd === "--title") {
      options.title = value;
    } else if (cmd === "--min") {
      options.min = Number(value);
    } else if (cmd === "--max") {
      options.max = Number(value);
    }
  }
  return options;
}

const corpus = loadCorpus("corpus/data.json");
const options = parseOptions();
const title = options.title || createRandomPicker(corpus.title)();

const article = generator(title, {
  corpus,
  ...options,
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

const outputFile = saveCorpus(title, article);

console.log(`生成成功！文章保存于：${outputFile}`);
