import prisma from "../config/prismaClient.js";

export async function createUser(email, password) {
  const user = await prisma.user.create({
    data: {
      email,
      password,
    },
  });
  console.log(user);
}

export async function getUsers() {
  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
}

export async function deleteUsers() {
  await prisma.user.deleteMany();
}
