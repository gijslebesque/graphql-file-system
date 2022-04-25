import { GraphQLUpload } from "graphql-upload";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

const path = __dirname + "/../data.json";

const uploadResolver = {
  // This maps the `Upload` scalar to the implementation provided
  // by the `graphql-upload` package.
  Upload: GraphQLUpload,

  Mutation: {
    singleUpload: async (parent: any, { file }: { file: any }) => {
      const { createReadStream, filename, mimetype, encoding } = await file;

      const id = uuidv4();

      // Invoking the `createReadStream` will return a Readable Stream.
      // See https://nodejs.org/api/stream.html#stream_readable_streams
      const stream =
        // This is purely for demonstration purposes and will overwrite the
        // local-file-output.txt in the current working directory on EACH upload.
        createReadStream()
          .pipe(fs.createWriteStream(`${__dirname}/../images/${id}`))
          .on("finish", () => {
            const newEntry = {
              filename,
              id,
            };

            if (fs.existsSync(path)) {
              const readFile = fs.readFileSync(path, "utf8");

              const json = JSON.parse(readFile);
              json.push(newEntry);

              const data = JSON.stringify(json);

              fs.writeFileSync(path, data);
            } else {
              fs.writeFileSync(path, JSON.stringify([newEntry]));
            }
          });

      return { filename, mimetype, encoding };
    },
  },

  Query: {
    files: async (obj) => {
      if (fs.existsSync(path)) {
        const file = fs.readFileSync(path, "utf8");
        const json = JSON.parse(file);

        return json;
      }

      return [];
    },
  },
};

export const resolvers = {
  ...uploadResolver,
};
