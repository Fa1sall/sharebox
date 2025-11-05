import multer from "multer";
import supabase from "../config/supabaseClient.js";
import {
  createFile,
  deleteFile,
  getFolderFiles,
  getFile,
} from "../models/files.js";
import { getFolder } from "../models/folders.js";
import { bytesToMB } from "../utils/bytesConverter.js";

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { files: 5, fileSize: 1024 * 1024 * 20 }, // max 5 files / 20mb each
}).array("files");

export const handleUploadFile = async (req, res) => {
  const successful = [];
  const failed = [];
  const folderId = parseInt(req.params.id, 10);
  const folder = await getFolder(folderId);
  const filesInFolder = await getFolderFiles(folderId);

  upload(req, res, async (err) => {
    if (err) {
      // Handle multer upload errors
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_COUNT") {
          failed.push("Cannot upload more than 5 files at once.");
        } else if (err.code === "LIMIT_FILE_SIZE") {
          failed.push("One or more files exceed the 20MB limit.");
        } else {
          failed.push("Multer error: " + err.message);
        }
      } else {
        failed.push("Unexpected error occurred!");
      }

      return res.render("folder", {
        folder,
        files: filesInFolder,
        successful,
        failed,
      });
    }

    if (!req.files || req.files.length === 0) {
      failed.push("No files uploaded.");
      return res.render("folder", {
        folder,
        files: filesInFolder,
        successful,
        failed,
      });
    }

    // If no errors, then upload to supabase
    for (const file of req.files) {
      const filePath = `user_${req.user.id}/folder_${folderId}/${file.originalname}`;

      // Store in Supabase buckets
      const { data, error } = await supabase.storage
        .from(process.env.BUCKET_NAME)
        .upload(filePath, file.buffer, { contentType: file.mimetype });

      if (error) {
        console.log("Supabase uploading error: ", error);
        failed.push(file.originalname);
        continue;
      }

      // Get file URL from Supabase
      const { data: publicUrlData } = supabase.storage
        .from(process.env.BUCKET_NAME)
        .getPublicUrl(filePath);

      // Record file info in the db
      await createFile(
        folderId,
        file.originalname,
        file.size,
        file.mimetype,
        publicUrlData.publicUrl,
        filePath
      );

      successful.push(file.originalname);
    }

    const updatedFiles = await getFolderFiles(folderId);

    const processedFiles = updatedFiles.map((file) => ({
      ...file,
      displaySize: bytesToMB(parseInt(file.size, 10)),
      displayType: file.name?.split(".")[1].toUpperCase() || "File",
    }));

    res.render("folder", {
      folder,
      files: processedFiles,
      successful,
      failed,
    });
  });
};

export const handleGetFileInfo = async (req, res) => {
  const id = parseInt(req.params.fileId, 10);

  const fileInfo = await getFile(id);

  res.json(fileInfo);
};

export const handleGetSignedUrl = async (req, res) => {
  const id = parseInt(req.params.fileId, 10);
  const { path } = await getFile(id);

  const { time } = req.query;
  const expiresIn = parseInt(time, 10) || 300;

  const { data, error } = await supabase.storage
    .from(process.env.BUCKET_NAME)
    .createSignedUrl(path, expiresIn);

  if (error) {
    console.log("Supabase error: ", error);
    return res.render("error");
  }

  res.json({ signedUrl: data.signedUrl });
};

export const handleDeleteFile = async (req, res) => {
  const id = parseInt(req.params.fileId, 10);
  const { path } = await getFile(id);

  // Delete file from supabase bucket
  const { data, error } = await supabase.storage
    .from(process.env.BUCKET_NAME)
    .remove([path]);

  // Delete file records from the db
  const deletedFile = await deleteFile(id);
  res.redirect(`/folders/${deletedFile.folderId}`);
};
