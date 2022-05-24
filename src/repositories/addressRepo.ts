import { Address } from "@prisma/client";
import { prisma } from "../database.js";

export type CreateAddressData = Omit<Address, "id" | "created_at">;
export type AddressData = Omit<Address, "password">;

export async function insert(createAddressData: CreateAddressData) {
  return await prisma.address.create({
    data: createAddressData,
  });
}
