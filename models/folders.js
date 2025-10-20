import prisma from "../config/prismaClient.js";

export async function createFolder(userId, name) {
  try {
    const folder = await prisma.folder.create({
      data: {
        name,
        userId,
      },
    });
  } catch (error) {
    throw error;
  }
}

export async function getFolder(id) {
  try {
    const folder = await prisma.folder.findFirst({
      where: {
        id,
      },
      include: {
        files: true,
      },
    });
    return folder;
  } catch (error) {
    throw error;
  }
}

export async function getUserFolders(id) {
  try {
    const { folders } = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        folders: true,
      },
    });
    return folders;
  } catch (error) {
    throw error;
  }
}

export async function updateFolder(id, name) {
  try {
    const updatedFolder = await prisma.folder.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
    return updatedFolder;
  } catch (error) {
    throw error;
  }
}

export async function deleteFolder(id) {
  try {
    const deletedFolder = await prisma.folder.delete({
      where: {
        id,
      },
    });
    return deletedFolder;
  } catch (error) {
    throw error;
  }
}
