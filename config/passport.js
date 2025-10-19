import passport from "passport";
import passportlocal from "passport-local";
import prisma from "./prismaClient.js";
import { validatePassword } from "../utils/password.js";

//Setup Local Strategy
const LocalStrategy = passportlocal.Strategy;
passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        //Fetch user from the db
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          return done(null, false, { message: "Please enter a valid Email" });
        }

        // Check if password matches
        const match = await validatePassword(password, user.password);
        if (!match) {
          return done(null, false, { message: "Incorrect Password" });
        }

        let safeUser = Object.assign({}, user);
        delete safeUser.password;
        return done(null, safeUser);
      } catch (error) {
        if (error) {
          return done(error);
        }
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error);
  }
});
