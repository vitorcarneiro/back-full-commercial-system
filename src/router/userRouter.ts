import { Router } from "express";
import * as userController from "../controllers/userController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { userSchema } from "../schemas/userSchemas.js";

const userRouter = Router();

userRouter.post(
  "/",
  validateSchemaMiddleware(userSchema),
  userController.create
);

userRouter.get("/", userController.read);

export default userRouter;
