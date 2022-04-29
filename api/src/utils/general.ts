import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export const getExtension = (mimeType: string) => mimeType.split("/")[1];

export const createFileName = (mimeType: string) => {
  const id = uuidv4();

  const extension = getExtension(mimeType);

  return { localFileName: `${id}.${extension}`, id };
};

export function getParsedFiles<T>(path: string): T {
  const file = fs.readFileSync(path, "utf8");
  const json: T = JSON.parse(file);
  return json;
}

export const removeFile = (path: string) => {
  fs.existsSync(path) && fs.unlinkSync(path);
};
