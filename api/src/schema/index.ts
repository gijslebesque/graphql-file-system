import { gql } from "apollo-server-express";

const typeDefs = gql`
  enum CacheControlScope {
    PUBLIC
    PRIVATE
  }
  directive @cacheControl(
    maxAge: Int
    scope: CacheControlScope
    inheritMaxAge: Boolean
  ) on FIELD_DEFINITION | OBJECT | INTERFACE | UNION

  # The implementation for this scalar is provided by the
  # 'GraphQLUpload' export from the 'graphql-upload' package
  # in the resolver map below.
  scalar Upload

  type File @cacheControl(maxAge: 240) {
    id: String
    filename: String
    orginalFilename: String
    thumbnail: String
    mimetype: String
    encoding: String
  }

  input EditFile {
    id: String
    orginalFilename: String
  }

  type Query {
    files: [File]
  }

  type Mutation {
    singleUpload(file: Upload!): File!
  }

  type Mutation {
    deleteFile(id: String!): File!
  }

  type Mutation {
    editFile(input: EditFile!): File!
  }
`;
export default typeDefs;
