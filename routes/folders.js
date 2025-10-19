import { Router } from "express";
import {
  handleUpload,
  renderFoldersPage,
} from "../controllers/foldersController.js";

const foldersRouter = Router();

foldersRouter.get("/", renderFoldersPage);

foldersRouter.post("/upload", handleUpload);

export default foldersRouter;
