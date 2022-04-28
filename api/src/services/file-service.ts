import fs from "fs";
import { FileUpload } from "graphql-upload";
import sharp, { OutputInfo } from "sharp";

import { createRecord } from "../utils";
import { createFileName } from "../utils/general";

export const fileService = {
  dataLocation: `${__dirname}/../data.json`,
  imageLocation: `${__dirname}/../public/images`,
  thumbnailsLocation: `${__dirname}/../public/thumbnails`,

  async storeFile(file: FileUpload): Promise<IDataRecord> {
    const { createReadStream, filename, mimetype, encoding } = await file;

    const { id, localFileName } = createFileName(mimetype);

    const path = `${this.imageLocation}/${localFileName}`;

    const stream = await fs.createWriteStream(path);

    const data: IDataRecord = {
      id,
      filename: localFileName,
      orginalFilename: filename,
      mimetype,
      encoding,
    };

    return new Promise((resolve, reject) => {
      createReadStream()
        .pipe(stream)
        .on("finish", async () => {
          await createRecord<IDataRecord>(this.dataLocation, data);
          if (mimetype.includes("image")) {
            await this.generateThumbnail(localFileName);
          }
          resolve(data);
        })
        .on("error", (err) => {
          //@TODO create custom error class
          fs.unlinkSync(path);
          reject(new Error(err));
        });
    });
  },

  getFiles(): IDataOut[] {
    if (fs.existsSync(this.dataLocation)) {
      const file = fs.readFileSync(this.dataLocation, "utf8");
      const json: IDataRecord[] = JSON.parse(file);

      const data = json.map((file) => this.getFile(file));

      return data;
    }

    return [];
  },

  getFile(file: IDataRecord): IDataOut {
    const thumbnail = this.getThumbnail(file.filename);

    return {
      ...file,
      thumbnail,
    };
  },

  getFileById(id: string): IDataOut | null {
    const files = fs.readFileSync(this.dataLocation, "utf8");

    const json: IDataRecord[] = JSON.parse(files);

    const file = json.find((file) => file.id === id);

    if (!file) return null;

    const thumbnail = this.getThumbnail(file.filename);

    return {
      ...file,
      thumbnail,
    };
  },

  delete(id: string): IDataRecord | null {
    const files = fs.readFileSync(this.dataLocation, "utf8");

    const json: IDataRecord[] = JSON.parse(files);

    const file = json.find((file) => file.id === id);

    if (!file) return null;

    const newFiles = json.filter((file) => file.id !== id);

    fs.writeFileSync(this.dataLocation, JSON.stringify(newFiles));

    fs.unlinkSync(`${this.imageLocation}/${file.filename}`);

    fs.unlinkSync(`${this.thumbnailsLocation}/${file.filename}`);

    return file;
  },

  getThumbnail(filename: string): string {
    const fileLoc = `${this.thumbnailsLocation}/${filename}`;
    let thumbnail = null;
    if (fs.existsSync(fileLoc)) {
      thumbnail = fs.readFileSync(`${fileLoc}`);
    } else {
      thumbnail = fs.readFileSync(`${this.thumbnailsLocation}/placeholder.jpeg`);
    }

    return JSON.stringify(thumbnail);
  },

  generateThumbnail(filename: string): Promise<OutputInfo> {
    return sharp(`${this.imageLocation}/${filename}`)
      .resize({
        width: 200,
        height: 200,
        fit: sharp.fit.cover,
        position: sharp.strategy.entropy,
      })
      .sharpen()
      .toFile(`${this.thumbnailsLocation}/${filename}`);
  },
};
