import { Router } from "express";
import {
  handleCreateFolder,
  renderFolders,
  renderFolder,
  handleUpdateFolder,
  handleDeleteFolder,
} from "../controllers/foldersController.js";
import { handleUploadFile } from "../controllers/fileController.js";

const foldersRouter = Router();

foldersRouter.get("/", renderFolders);

foldersRouter.post("/create", handleCreateFolder);

foldersRouter.post("/:id/update", handleUpdateFolder);

foldersRouter.post("/:id/delete", handleDeleteFolder);

foldersRouter.get("/:id", renderFolder);

foldersRouter.post("/:id/upload", handleUploadFile);

export default foldersRouter;
