import express, { NextFunction, Request } from "express";
import http from "http";
import "dotenv/config";

import { expressConfig } from "./loaders/express";
import { startApolloServer } from "./loaders/apollo";

async function main() {
  try {
    //setup express
    const app = express();
    await expressConfig(app);
    const httpServer = http.createServer(app);

    //start apollo server
    const apolloServer = await startApolloServer({ app, httpServer });

    await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));

    console.log(`🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`);
  } catch (err) {
    console.error("💀 Error starting the node server", err);
  }
}

void main();
