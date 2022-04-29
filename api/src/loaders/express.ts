import express, { NextFunction, Request, Response, Application } from "express";
import { graphqlUploadExpress } from "graphql-upload";
import "express-async-errors"; // library wraps all routes in try catch and logs it in error handler
import cors from "cors";
import bodyParser from "body-parser";
import routes from "../routes";

export const expressConfig = (app: Application): void => {
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  app.use(graphqlUploadExpress());

  // Middleware that transforms the raw string of req.body into json
  app.use(express.json({ limit: "10mb" }));

  app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

  // Load API routes
  app.use(process.env.API_PREFIX ?? "", routes());

  // catch 404
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.url === process.env.GRAPHQL_PREFIX) {
      return next();
    }
    const err = {
      message: "Route not found",
      status: 404,
    };
    res.status(404).send(err);
  });
};
