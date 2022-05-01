import { GraphQLUpload, FileUpload } from "graphql-upload";

import { fileService } from "../services/file-service";
import { createRecord } from "../utils";

export const uploadResolver = {
  // This maps the `Upload` scalar to the implementation provided
  // by the `graphql-upload` package.
  Upload: GraphQLUpload,

  Mutation: {
    // On upload we store a file, store a reference to it in a json
    // and if it's an image we create a thumbnail for it

    singleUpload: async (_, { file }: { file: FileUpload }) => {
      try {
        const fileData = await fileService.storeFile(file);

        await createRecord<IDataRecord>(fileService.dataLocation, fileData);

        if (fileData.mimetype.includes("image")) {
          await fileService.generateThumbnail(fileData.filename);
        }

        return fileService.getFile(fileData);
      } catch (err) {
        throw err;
      }
    },
    deleteFile: async (_, { id }: { id: string }) => {
      try {
        return fileService.delete(id);
      } catch (err) {
        throw err;
      }
    },

    editFile: async (_, { input }: { input: IDataEdit }) => {
      try {
        return fileService.edit(input);
      } catch (err) {
        throw err;
      }
    },
  },

  Query: {
    files: async (_, input: Pagination) => {
      try {
        return fileService.getFiles(input);
      } catch (err) {
        throw err;
      }
    },

    search: async (_, { input }: { input: string }) => {
      try {
        return fileService.search(input);
      } catch (err) {
        throw err;
      }
    },
  },
};
