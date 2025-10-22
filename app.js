import express from "express";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import passport from "passport";
import session from "express-session";
import "./config/passport.js"; // Important!
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import prisma from "./config/prismaClient.js";
import routes from "./routes/index.js";
import dotenv from "dotenv";

dotenv.config();

// ---------------- General Setup ----------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");

const assetPath = join(__dirname, "public");
app.use(express.static(assetPath));

// ---------------- Session Setup ----------------

app.use(
  session({
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day cookie validity
    },
  })
);

// ---------------- Passport Authentication ----------------

app.use(passport.session());

// debugging errors

app.use((req, res, next) => {
  console.log(req.session);
  console.log(req.user);
  next();
});

// ---------------- Routes ----------------

app.use((req, res, next) => {
  res.locals.isLoggedIn = req.isAuthenticated();
  next();
});

app.use("/", routes);

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).render("error", { message: "Internal Server Error" });
});

// ---------------- Server ----------------

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
    throw error;
  }
  console.log(`Express App started at http://localhost:${PORT}`);
});
