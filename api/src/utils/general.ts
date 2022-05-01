import fs from "fs";
import { v4 as uuidv4 } from "uuid";

/**
 * @description Create file extension for a file
 * @param {string} mimeType mimeType of a file
 * @returns {string | undefined} file extension based on mimeType
 */
const getExtension = (mimeType: string): string | undefined => {
  //@TODO use regex to validate
  const typeArr = mimeType.split("/");
  if (typeArr.length >= 1) {
    return mimeType.split("/")[1];
  }
  return;
};

/**
 * @description Generate a unique id and filename with proper extension for a file based on it's mimeType
 * @param {string} mimeType mimeType of a file
 * @returns { { localFileName: string, id: string} | undefined } unique filename.extension and id or undefined if mimeType is not valid
 */

export const createFileName = (
  mimeType: string
): { localFileName: string; id: string } | undefined => {
  const id = uuidv4();

  const extension = getExtension(mimeType);

  if (!extension) return;

  return { localFileName: `${id}.${extension}`, id };
};

/**
 * @description returns a parsed json of file if file exists
 * @param {string} path mimeType of a file
 */

export function getParsedFiles<T>(path: string): T | undefined {
  if (!fs.existsSync(path)) return;

  const file = fs.readFileSync(path, "utf8");
  const json: T = JSON.parse(file);
  return json;
}

export const removeFile = (path: string) => {
  fs.existsSync(path) && fs.unlinkSync(path);
};
