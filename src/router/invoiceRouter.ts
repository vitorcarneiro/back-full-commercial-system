import { Router } from "express";
import * as invoiceController from "../controllers/invoiceController.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/ensureAuthenticatedMiddleware.js";

const invoiceRouter = Router();

invoiceRouter.post(
  "/",
  ensureAuthenticatedMiddleware,
  invoiceController.invoiceByXml
);

invoiceRouter.post(
  "/register",
  ensureAuthenticatedMiddleware,
  invoiceController.registerInvoiceByXml
);

export default invoiceRouter;
