import prisma from "../config/prismaClient.js";

export async function createFile(folderId, name, size, type, link, path) {
  try {
    const file = await prisma.file.create({
      data: {
        folderId,
        name,
        size,
        type,
        link,
        path,
      },
    });
    return file;
  } catch (error) {
    throw error;
  }
}

export async function getFile(id) {
  try {
    const file = await prisma.file.findUnique({
      where: {
        id,
      },
    });
    return file;
  } catch (error) {
    throw error;
  }
}

export async function getFolderFiles(folderId) {
  try {
    const files = await prisma.file.findMany({
      where: {
        folderId,
      },
    });
    return files;
  } catch (error) {
    throw error;
  }
}

export async function deleteFile(id) {
  try {
    const deletedFile = await prisma.file.delete({
      where: {
        id,
      },
    });
    return deletedFile;
  } catch (error) {
    throw error;
  }
}
