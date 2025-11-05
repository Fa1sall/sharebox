import { Router } from "express";
import {
  handleDeleteFile,
  handleGetSignedUrl,
  handleGetFileInfo,
} from "../controllers/fileController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const fileRouter = Router();

fileRouter.post("/:fileId/delete", isAuthenticated, handleDeleteFile);

fileRouter.get("/:fileId/signed-url", isAuthenticated, handleGetSignedUrl);

fileRouter.get("/:fileId/info", isAuthenticated, handleGetFileInfo);

export default fileRouter;
