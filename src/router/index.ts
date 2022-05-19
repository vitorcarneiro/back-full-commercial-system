import { Router } from "express";
import userRouter from "./userRouter.js";
// import e2eRouter from "./e2eRouter.js";

const router = Router();
router.use("/users", userRouter);

// if (process.env.NODE_ENV === "test") router.use(e2eRouter);

export default router;
