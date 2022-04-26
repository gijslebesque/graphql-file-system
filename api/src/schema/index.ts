import { gql } from "apollo-server-express";

const typeDefs = gql`
  # The implementation for this scalar is provided by the
  # 'GraphQLUpload' export from the 'graphql-upload' package
  # in the resolver map below.
  scalar Upload

  type File {
    id: String
    filename: String
    orginalFilename: String
    thumbnail: String
    mimetype: String
    encoding: String
  }

  type Query {
    files: [File]
  }

  type Mutation {
    singleUpload(file: Upload!): File!
  }
`;
export default typeDefs;
