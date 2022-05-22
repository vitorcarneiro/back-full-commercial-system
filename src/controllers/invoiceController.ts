import { Request, Response } from "express";
import * as invoiceService from "../services/invoiceService.js";

export async function read(req: Request, res: Response) {
  const { xml } = req.body;

  const invoice = invoiceService.registerInvoiceByXml(xml);
  res.send({ invoice });
}
