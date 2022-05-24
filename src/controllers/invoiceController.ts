import { Request, Response } from "express";
import * as invoiceService from "../services/invoiceService.js";

export async function invoiceByXml(req: Request, res: Response) {
  const { xml } = req.body;

  const invoice = await invoiceService.invoiceByXml(xml);
  res.send({ invoice });
}

export async function registerInvoiceByXml(req: Request, res: Response) {
  const { xml } = req.body;

  const invoice = await invoiceService.registerInvoiceByXml(xml);
  res.send({ invoice });
}
