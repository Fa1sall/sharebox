import { validationResult } from "express-validator";
import { genPassword } from "../utils/password.js";
import { createUser } from "../models/users.js";
import passport from "passport";

export const renderSignUpPage = (req, res) => {
  res.render("auth/signup", { errors: {}, formData: {} });
};

export const handleSignUp = async (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;
  if (!errors.isEmpty()) {
    return res.render("auth/signup", {
      errors: errors.mapped(),
      formData: { email },
    });
  }
  const hashedPassword = await genPassword(password);
  await createUser(email, hashedPassword);
  res.redirect("/login");
};

export const renderLoginPage = (req, res) => {
  res.render("auth/login", { errors: {}, formData: {} });
};

export const handleLogin = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("auth/login", {
      errors: errors.mapped(),
      formData: { username: req.body.username },
    });
  }

  passport.authenticate("local", (error, user, info) => {
    if (error) {
      next(error);
    }

    if (!user) {
      return res.render("auth/login", {
        errors: { login_error: info.message },
        formData: { email: req.body.email },
      });
    }

    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/folders");
    });
  })(req, res, next);
};

export const handleLogout = async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
};
