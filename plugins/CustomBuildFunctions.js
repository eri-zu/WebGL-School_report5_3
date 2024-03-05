import { resolve } from "path";
import randomstring from "randomstring";
import { crawlingDirStream } from "directory-crawler";

const pathResolve = resolve;

const findAllFiles = (dirName, ext) => {
  return new Promise(async (resolve) => {
    const extRegex = new RegExp(ext);
    const results = {};
    for await (const d of crawlingDirStream(Infinity, Infinity, dirName)) {
      if (d.isFile() && d.name.match(extRegex)) {
        const keyIndex = randomstring.generate();
        results[keyIndex] = pathResolve(d.path, "");
      }
    }
    resolve(results);
  });
};

export { findAllFiles };
