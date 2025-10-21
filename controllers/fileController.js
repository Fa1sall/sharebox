import multer from "multer";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createFile, deleteFile, getFile } from "../models/files.js";

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

const upload = multer({
  storage,
  limits: { files: 5, fileSize: 1024 * 1024 * 20 },
});

export const handleUploadFile = [
  upload.array("files"),
  async (req, res) => {
    for (const file of req.files) {
      const folderId = parseInt(req.params.id, 10);
      const name = file.originalname;
      const type = file.mimetype;
      const size = file.size;
      const link = "https://supabase.com";

      await createFile(folderId, name, size, type, link);
    }
    res.send("Files uploaded successfully!");
  },
];

export const handleDeleteFile = async (req, res) => {
  const id = parseInt(req.params.fileId, 10);
  const deletedFile = await deleteFile(id);
  res.redirect(`/folders/${deletedFile.folderId}`);
};
