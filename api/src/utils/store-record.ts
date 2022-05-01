import fs from "fs";

/**
 * @name createRecord
 * @description Creates and/or inserts a data object to a file
 * @param {string} path of file to store data
 * @param {T} newEntry generic object that'll be stored
 */

export function createRecord<Type extends object>(path: string, newEntry: Type): Type {
  if (fs.existsSync(path)) {
    const readFile = fs.readFileSync(path, "utf8");
    const json = JSON.parse(readFile);
    json.push(newEntry);

    const data = JSON.stringify(json);

    fs.writeFileSync(path, data);
  } else {
    fs.writeFileSync(path, JSON.stringify([newEntry]));
  }

  return newEntry;
}
