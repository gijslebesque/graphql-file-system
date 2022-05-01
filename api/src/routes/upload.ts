import { Router, Request, Response } from "express";

const route = Router();

export const uploadRoute = (app: Router): void => {
  app.use("/upload", route);

  route.post("/", async (req: Request, res: Response) => {
    // @TBD this can go since we use apollo to upload image
    res.send("Implement file upload endpoint!");
  });
};
