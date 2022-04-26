import fs from "fs";
import { FileUpload } from "graphql-upload";
import { v4 as uuidv4 } from "uuid";

import { createRecord, generateThumb } from "../utils";
const path = __dirname + "/../data.json";

const getExtension = (mimeType: string) => mimeType.split("/")[1];

const createFileName = (mimeType: string) => {
  const id = uuidv4();

  const extension = getExtension(mimeType);

  return `${id}.${extension}`;
};

export const fileHandler = {
  async storeFile(file: FileUpload) {
    const { createReadStream, filename, mimetype, encoding } = await file;

    const localFileName = createFileName(mimetype);

    const stream = await fs.createWriteStream(`${__dirname}/../public/images/${localFileName}`);

    const data = {
      id: uuidv4(),
      filename: localFileName,
      orginalFilename: filename,
      mimetype,
      encoding,
    };

    await createReadStream()
      .pipe(stream)
      .on("finish", async () => {
        if (mimetype.includes("image")) {
          await generateThumb(localFileName);
        }
        await createRecord<DataRecord>(path, data);
      });

    return getFile(data);
  },

  async getFiles() {
    if (fs.existsSync(path)) {
      const file = fs.readFileSync(path, "utf8");
      const json: DataRecord[] = JSON.parse(file);

      const data = json.map((file) => getFile(file));

      return data;
    }

    return [];
  },
};

const base = `${__dirname}/../public`;
const getFile = (file: DataRecord) => {
  const fileLoc = `${base}/thumbnails/${file.filename}`;
  let thumbnail = null;
  if (fs.existsSync(fileLoc)) {
    thumbnail = fs.readFileSync(`${fileLoc}`);
  } else {
    thumbnail = fs.readFileSync(`${base}/placeholder.jpeg`);
  }
  return {
    ...file,
    thumbnail: JSON.stringify(thumbnail),
  };
};
