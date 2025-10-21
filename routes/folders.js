import { Router } from "express";
import {
  handleCreateFolder,
  renderFolders,
  renderFolder,
  handleUpdateFolder,
  handleDeleteFolder,
} from "../controllers/foldersController.js";
import { handleUploadFile } from "../controllers/fileController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const foldersRouter = Router();

foldersRouter.get("/", isAuthenticated, renderFolders);

foldersRouter.post("/create", isAuthenticated, handleCreateFolder);

foldersRouter.post("/:id/update", isAuthenticated, handleUpdateFolder);

foldersRouter.post("/:id/delete", isAuthenticated, handleDeleteFolder);

foldersRouter.get("/:id", isAuthenticated, renderFolder);

foldersRouter.post("/:id/upload", isAuthenticated, handleUploadFile);

export default foldersRouter;
