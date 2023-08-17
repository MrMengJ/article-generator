import { createRandomPicker } from "./lib/random.js";
import { generator } from "./lib/generator.js";
import { loadCorpus, saveCorpus } from "./lib/corpus.js";
import { options } from "./lib/cmd.js";

const corpus = loadCorpus("corpus/data.json");
const title = options.title || createRandomPicker(corpus.title)();
const article = generator(title, {
  corpus,
  ...options,
});
const outputFile = saveCorpus(title, article);

console.log(`生成成功！文章保存于：${outputFile}`);
