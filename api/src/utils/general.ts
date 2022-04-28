import { v4 as uuidv4 } from "uuid";

export const getExtension = (mimeType: string) => mimeType.split("/")[1];

export const createFileName = (mimeType: string) => {
  const id = uuidv4();

  const extension = getExtension(mimeType);

  return { localFileName: `${id}.${extension}`, id };
};
