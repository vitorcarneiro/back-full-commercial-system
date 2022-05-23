import { User as UserPrisma } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import * as userRepo from "../repositories/userRepo.js";
import * as error from "../utils/errorUtils.js";

export async function create(createUserData: userRepo.CreateUserData) {
  const user = new User(createUserData);

  await userRepo.insert(user);
}

function User(createUserData: userRepo.CreateUserData) {
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

export async function findByCpf(cpf: string) {
  return await userRepo.findByCpf(cpf);
}

export async function findByEmail(email: string) {
  return await userRepo.findByEmail(email);
}

export async function signUp(createUserData: userRepo.CreateUserData) {
  const existingEmail = await userRepo.findByEmail(createUserData.email);
  const existingCpf = await userRepo.findByCpf(createUserData.cpf);

  if (existingEmail || existingCpf)
    throw error.conflict("Email and CPF must be unique");

  const hashedPassword = bcrypt.hashSync(createUserData.password, 12);

  await userRepo.insert({ ...createUserData, password: hashedPassword });
}

export async function findById(id: number) {
  const user = await userRepo.findById(id);
  if (!user) throw error.notFound("User not found");

  return user;
}

export type LoginData = {
  login: string;
  password: string;
};

export async function signIn(loginData: LoginData) {
  const user = await getUserOrFail(loginData);

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

  return token;
}

async function getUserOrFail(loginData: LoginData) {
  let user: UserPrisma;

  if (isNaN(Number(loginData.login)))
    user = await userRepo.findByEmail(loginData.login);
  else user = await userRepo.findByCpf(loginData.login);

  if (user === null) throw error.unauthorized("Invalid credentials");

  const isPasswordValid = bcrypt.compareSync(loginData.password, user.password);
  if (!isPasswordValid) throw error.unauthorized("Invalid credentials");

  return user;
}
