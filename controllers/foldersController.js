import { getFolderFiles } from "../models/files.js";
import {
  createFolder,
  updateFolder,
  deleteFolder,
  getFolder,
  getUserFolders,
} from "../models/folders.js";

export const renderFolders = async (req, res) => {
  const folders = await getUserFolders(req.user.id);
  res.render("folders", { folders });
};

export const renderFolder = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const folder = await getFolder(id);
  const files = await getFolderFiles(id);
  res.render("folder", { folder, files, successful: [], failed: [] });
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
