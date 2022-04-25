import { Router } from "express";
import "express-async-errors";
import { uploadRoute } from "./upload";

// guaranteed to get dependencies
export default (): Router => {
  const app = Router();
  uploadRoute(app);
  return app;
};
