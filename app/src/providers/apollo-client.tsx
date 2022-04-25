import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import React from "react";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: createUploadLink({
    uri: "http://localhost:4000/graphql",
  }),
});

export const Apollo: React.FC = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
