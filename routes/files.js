import { Router } from "express";
import { handleDeleteFile } from "../controllers/fileController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const fileRouter = Router();

fileRouter.post("/:fileId/delete", isAuthenticated, handleDeleteFile);

export default fileRouter;
