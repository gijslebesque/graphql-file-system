import fs from "fs";
import { FileUpload } from "graphql-upload";
import { v4 as uuidv4 } from "uuid";

import { createRecord, generateThumb } from "../utils";
const path = __dirname + "/../data.json";

export const fileHandler = {
  async storeFile(file: FileUpload) {
    const { createReadStream, filename, mimetype, encoding } = await file;

    const id = uuidv4();

    const localFileName = `${id}.jpg`;

    const stream = await fs.createWriteStream(`${__dirname}/../images/${id}.jpg`);

    createReadStream()
      .pipe(stream)
      .on("finish", async () => {
        generateThumb(localFileName);
        await createRecord<DataRecord>(path, {
          filename: localFileName,
          orginalFilename: filename,
          mimetype,
          encoding,
        });
      });

    return localFileName;
  },

  async getFiles() {
    if (fs.existsSync(path)) {
      const file = fs.readFileSync(path, "utf8");
      const json = JSON.parse(file);

      const data = json.map((file: File) => {
        const realFile = fs.readFileSync(`${__dirname}/../public/thumbnails/${file.filename}`);
        return {
          ...file,
          file: JSON.stringify(realFile),
        };
      });

      return data;
    }

    return [];
  },
};
