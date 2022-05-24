import { prisma } from "../database.js";
import { Invoice, Invoice_info as InvoiceInfo } from "@prisma/client";

export type CreateInvoiceData = Omit<Invoice, "id" | "created_at">;
export type CreateInvoiceInfoData = Omit<
  InvoiceInfo,
  "id" | "invoice_id" | "created_at"
>;

export async function insert(
  invoiceData: CreateInvoiceData,
  invoiceInfoData: CreateInvoiceInfoData
) {
  const invoice = await prisma.invoice.create({
    data: invoiceData,
  });

  await prisma.invoice_info.create({
    data: { invoice_id: invoice.id, ...invoiceInfoData },
  });
}

export async function findByAccessKey(accessKey: string) {
  return await prisma.invoice.findUnique({
    where: { access_key: accessKey },
  });
}
