import { hash, compare } from "bcrypt";

export async function genPassword(password) {
  return await hash(password, 10);
}

export async function validatePassword(password, hashedPassword) {
  return await compare(password, hashedPassword);
}
