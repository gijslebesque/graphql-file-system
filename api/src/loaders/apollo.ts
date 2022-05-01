import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { typeDefs } from "../schema";
import { resolvers } from "../resolvers";
import { Application } from "express";
import { Server } from "http";
import { makeExecutableSchema } from "@graphql-tools/schema";

const schema = makeExecutableSchema({ typeDefs, resolvers });

export const startApolloServer = async ({
  app,
  httpServer,
}: {
  app: Application;
  httpServer: Server;
}) => {
  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  server.applyMiddleware({
    app,
    path: process.env.GRAPHQL_PREFIX,
  });

  return server;
};
