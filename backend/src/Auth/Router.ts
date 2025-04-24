import routerLogin from "./Login";
import routerRegistration from "./Registration";
import routerAuthentication from "./Authentication";
import routerGoogleAuth from "./GoogleSignIn";
import { Router } from "express";
const router = Router();

export default router.use(
  "/auth",
  routerLogin,
  routerGoogleAuth,
  routerRegistration,
  routerAuthentication
);
