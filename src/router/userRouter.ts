import { Router } from "express";
import * as userController from "../controllers/userController.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/ensureAuthenticatedMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { userSchema, loginSchema } from "../schemas/userSchemas.js";

const userRouter = Router();

userRouter.post(
  "/sign-up",
  validateSchemaMiddleware(userSchema),
  userController.signUp
);

userRouter.post(
  "/sign-in",
  validateSchemaMiddleware(loginSchema),
  userController.signIn
);

userRouter.get("/", ensureAuthenticatedMiddleware, userController.show);

export default userRouter;
