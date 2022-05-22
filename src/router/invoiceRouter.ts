import { Router } from "express";
import * as invoiceController from "../controllers/invoiceController.js";

const invoiceRouter = Router();

invoiceRouter.post("/", invoiceController.read);

export default invoiceRouter;
