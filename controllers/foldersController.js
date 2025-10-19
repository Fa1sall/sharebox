import multer from "multer";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

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

export const renderFoldersPage = (req, res) => {
  res.render("folders");
};

export const handleUpload = [
  upload.single("file"),
  (req, res) => {
    res.send("File uploaded successfully!");
  },
];
