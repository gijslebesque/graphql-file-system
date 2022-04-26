import { GraphQLUpload, FileUpload } from "graphql-upload";

import { fileHandler } from "../services/file-handler";

export const uploadResolver = {
  // This maps the `Upload` scalar to the implementation provided
  // by the `graphql-upload` package.
  Upload: GraphQLUpload,

  Mutation: {
    singleUpload: async (_, { file }: { file: FileUpload }) => {
      try {
        return fileHandler.storeFile(file);
      } catch (err) {
        throw err;
      }
    },
  },

  Query: {
    files: async () => {
      try {
        return fileHandler.getFiles();
      } catch (err) {
        throw err;
      }
    },
  },
};
