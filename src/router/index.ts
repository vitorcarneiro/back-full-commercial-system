import { Router } from "express";
import userRouter from "./userRouter.js";
import invoiceRouter from "./invoiceRouter.js";
// import e2eRouter from "./e2eRouter.js";

const router = Router();
router.use("/users", userRouter);
router.use("/invoices", invoiceRouter);

// if (process.env.NODE_ENV === "test") router.use(e2eRouter);

export default router;
