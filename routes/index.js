import { Router } from "express";
import {
  handleLogin,
  handleSignUp,
  renderLoginPage,
  renderSignUpPage,
} from "../controllers/authController.js";
import { validateLogin, validateUser } from "../middlewares/validation.js";
import foldersRouter from "./folders.js";

const router = Router();

router.get("/", async (req, res) => {
  res.render("index");
});

// ---------------- Authentication ----------------

router.get("/signup", renderSignUpPage);

router.post("/signup", validateUser, handleSignUp);

router.get("/login", renderLoginPage);

router.post("/login", validateLogin, handleLogin);

// ---------------- Folders ----------------

router.use("/folders", foldersRouter);

export default router;
