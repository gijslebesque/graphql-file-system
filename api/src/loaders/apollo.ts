import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import typeDefs from "../schema";
import { resolvers } from "../resolvers";
import { Application } from "express";
import { Server } from "http";

export const startApolloServer = async ({
  app,
  httpServer,
}: {
  app: Application;
  httpServer: Server;
}) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  server.applyMiddleware({
    app,
    path: process.env.GRAPHQL_PREFIX,
  });

  return server;
};
