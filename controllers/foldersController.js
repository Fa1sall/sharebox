import multer from "multer";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  createFolder,
  updateFolder,
  deleteFolder,
  getFolder,
  getUserFolders,
} from "../models/folders.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

export const renderFolders = async (req, res) => {
  const folders = await getUserFolders(req.user.id);
  res.render("folders", { folders });
};

export const renderFolder = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const folder = await getFolder(id);
  res.render("folder", { folder });
};

export const handleCreateFolder = async (req, res) => {
  const { name } = req.body;
  const userId = req.user.id;
  const createdFolder = await createFolder(userId, name);
  res.redirect("/folders");
};

export const handleUpdateFolder = async (req, res) => {
  const { name } = req.body;
  const id = parseInt(req.params.id, 10);
  await updateFolder(id, name);
  res.redirect("/folders");
};

export const handleDeleteFolder = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  await deleteFolder(id);
  res.redirect("/folders");
};

export const handleUploadFile = [
  upload.single("file"),
  (req, res) => {
    res.send("File uploaded successfully!");
  },
];
