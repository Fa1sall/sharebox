import { Router } from "express";
import {
  handleDeleteFile,
  handleGetSignedUrl,
} from "../controllers/fileController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const fileRouter = Router();

fileRouter.post("/:fileId/delete", isAuthenticated, handleDeleteFile);

fileRouter.get("/:fileId/signed-url", isAuthenticated, handleGetSignedUrl);

export default fileRouter;
