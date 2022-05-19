import { User } from "@prisma/client";
import { prisma } from "../database.js";

export type CreateUserData = Omit<User, "id" | "created_at">;

export async function insert(createUserData: CreateUserData) {
  await prisma.user.create({
    data: createUserData,
  });
}

export async function findMany() {
  return await prisma.user.findMany({
    orderBy: { created_at: "desc" },
    select: {
      id: true,
      email: true,
      cpf: true,
      full_name: true,
      created_at: true,
    },
  });
}

// export async function findMany() {
//   return await prisma.user.findMany({
//     orderBy: { created_at: "desc" },
//     select: {
//       id: true,
//       email: true,
//       cpf: true,
//       full_name: true,
//       created_at: true,
//     },
//   });
// }
