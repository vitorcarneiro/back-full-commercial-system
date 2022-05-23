import { Supplier } from "@prisma/client";
import { prisma } from "../database.js";

export type CreateSupplierData = Omit<
  Supplier,
  "id" | "created_at" | "modified_at"
>;
export type SupplierData = Omit<CreateSupplierData, "password">;

export async function insert(createSupplierData: CreateSupplierData) {
  await prisma.supplier.create({
    data: createSupplierData,
  });
}

export async function findMany() {
  return await prisma.supplier.findMany({
    orderBy: { modified_at: "desc" },
  });
}

export async function findByCnpj(cnpj: string) {
  return await prisma.supplier.findUnique({
    where: { cnpj },
  });
}
