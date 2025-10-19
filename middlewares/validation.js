import { body } from "express-validator";
import prisma from "../config/prismaClient.js";

export const validateUser = [
  body("email")
    .trim()
    .notEmpty()
    .isEmail()
    .withMessage("Enter a valid email")
    .custom(async (email) => {
      const user = await prisma.user.findUnique({ where: { email } });
      if (user) {
        throw new Error("Email already in use");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be between 8 - 20 characters"),
  body("confirm_password")
    .notEmpty()
    .withMessage("Please re-enter your password")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Please enter the same password"),
];

export const validateLogin = [
  body("email").trim().notEmpty().isEmail().withMessage("Email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];
