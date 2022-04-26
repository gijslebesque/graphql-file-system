import fs from "fs";

export function createRecord<Type>(path: string, newEntry: Type): Type {
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
