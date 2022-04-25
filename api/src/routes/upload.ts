import { Router, Request, Response } from "express";

const route = Router();

export const uploadRoute = (app: Router): void => {
  app.use("/upload", route);

  //mark one as read
  route.post("/", async (req: Request, res: Response) => {
    res.send("Implement file upload endpoint!");
  });
};
