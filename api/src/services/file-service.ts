import fs from "fs";
import { FileUpload } from "graphql-upload";
import sharp, { OutputInfo } from "sharp";
import Fuse from "fuse.js";

import { ApiError, getParsedFiles, removeFile } from "../utils";
import { createFileName } from "../utils/general";

/**
 * @name fileService
 * @description  Service for handling file system.
 */

export const fileService = {
  dataLocation: `${__dirname}/../data.json`,
  imageLocation: `${__dirname}/../public/images`,
  thumbnailsLocation: `${__dirname}/../public/thumbnails`,
  fuseOptions: {
    keys: ["orginalFilename", "mimetype"],
  },

  /**
   * @description  Stores a file
   */

  async storeFile(file: FileUpload): Promise<IDataRecord> {
    const { createReadStream, filename, mimetype, encoding } = await file;

    const fileMeta = createFileName(mimetype);

    if (!fileMeta) {
      throw new ApiError({ message: `Cannot make a file for type ${mimetype}`, status: 400 });
    }
    const { id, localFileName } = fileMeta;

    const path = `${this.imageLocation}/${localFileName}`;

    const data: IDataRecord = {
      id,
      filename: localFileName,
      orginalFilename: filename,
      mimetype,
      encoding,
    };

    const stream = fs.createWriteStream(path);

    return new Promise((resolve, reject) => {
      createReadStream()
        .pipe(stream)
        .on("finish", async () => {
          resolve(data);
        })
        .on("error", (err) => {
          removeFile(path);
          reject(new ApiError({ message: err, status: 500 }));
        });
    });
  },

  /**
   * @name getFiles
   * @description Returns all paginated files includig thumbnails
   */
  getFiles({ limit = 10, offset = 0 }: Pagination): IDataOut[] {
    const json = getParsedFiles<IDataRecord[]>(this.dataLocation);

    if (!json) return [];

    const data = json.slice(offset, offset + limit).map((file) => this.getFile(file));

    return data;
  },

  /**
   * @name search
   * @description  Fuzzy search files on  orginalFilename and mimetype
   * @param {string} query search query
   */

  search(query: string): IDataOut[] | null {
    const json = getParsedFiles<IDataRecord[]>(this.dataLocation);

    if (!json) return null;
    const fuse = new Fuse(json, this.fuseOptions);

    const result = fuse.search(query);

    return result.map(({ item }) => this.getFile(item));
  },

  getFile(file: IDataRecord): IDataOut {
    const thumbnail = this.getThumbnail(file.filename);

    return {
      ...file,
      thumbnail,
    };
  },

  getFileById(id: string): IDataOut | null {
    const json = getParsedFiles<IDataRecord[]>(this.dataLocation);

    if (!json) return null;

    const file = json.find((file) => file.id === id);

    if (!file) return null;

    const thumbnail = this.getThumbnail(file.filename);

    return {
      ...file,
      thumbnail,
    };
  },

  /**
   * @name delete
   * @description  Deletes a file, it's data record and thumbnail
   */

  delete(id: string): IDataRecord | null {
    const json = getParsedFiles<IDataRecord[]>(this.dataLocation);

    if (!json) return null;

    const file = json.find((file) => file.id === id);

    if (!file) return null;

    const newFiles = json.filter((file) => file.id !== id);

    fs.writeFileSync(this.dataLocation, JSON.stringify(newFiles));

    const filePath = `${this.imageLocation}/${file.filename}`;
    const thumbnailPath = `${this.thumbnailsLocation}/${file.filename}`;

    removeFile(filePath);
    removeFile(thumbnailPath);

    return file;
  },

  /**
   * @name edit
   * @description Edits the name of the file as stored in the data record
   */
  edit(input: IDataEdit): IDataRecord | null {
    const { id, orginalFilename } = input;
    const json = getParsedFiles<IDataRecord[]>(this.dataLocation);

    if (!json) return null;

    const index = json.findIndex((file) => file.id === id);

    if (index === -1) return null;

    json[index].orginalFilename = orginalFilename;

    fs.writeFileSync(this.dataLocation, JSON.stringify(json));
    return json[index];
  },

  getThumbnail(filename: string): string {
    const path = `${this.thumbnailsLocation}/${filename}`;
    let thumbnail;
    if (fs.existsSync(path)) {
      thumbnail = fs.readFileSync(`${path}`);
    } else {
      thumbnail = fs.readFileSync(`${__dirname}/../public/placeholder.jpeg`);
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
