import { Router } from "express";
import { handleDeleteFile } from "../controllers/fileController.js";

const fileRouter = Router();

fileRouter.post("/:fileId/delete", handleDeleteFile);

export default fileRouter;
