import { GraphQLUpload, FileUpload } from "graphql-upload";

import { fileService } from "../services/file-service";

export const uploadResolver = {
  // This maps the `Upload` scalar to the implementation provided
  // by the `graphql-upload` package.
  Upload: GraphQLUpload,

  Mutation: {
    singleUpload: async (_, { file }: { file: FileUpload }) => {
      try {
        const fileData = await fileService.storeFile(file);

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
    files: async () => {
      try {
        return fileService.getFiles();
      } catch (err) {
        throw err;
      }
    },
  },
};
