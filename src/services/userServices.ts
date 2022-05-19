import bcrypt from "bcrypt";
import * as userRepo from "../repositories/userRepo.js";

export async function create(createUserData: userRepo.CreateUserData) {
  const user = new User(createUserData);

  await userRepo.insert(user);
}

export function User(createUserData: userRepo.CreateUserData) {
  const { email, cpf, password, full_name: fullName } = createUserData;

  this.email = email;
  this.cpf = cpf;
  this.password = hashPassword(password);
  this.full_name = fullName;
}

function hashPassword(password: string) {
  return bcrypt.hashSync(password, 10);
}

export async function readAll() {
  return await userRepo.findMany();
}
