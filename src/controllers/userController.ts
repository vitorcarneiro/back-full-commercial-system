import { Request, Response } from "express";
import * as userService from "../services/userService.js";
import * as userRepo from "../repositories/userRepo.js";

export async function signUp(req: Request, res: Response) {
  const user: userRepo.CreateUserData = req.body;

  await userService.signUp(user);

  res.send("user created").status(201);
}

export async function signIn(req: Request, res: Response) {
  const user = req.body;

  const token = await userService.signIn(user);

  res.send({ token });
}

export async function show(req: Request, res: Response) {
  let users: userRepo.UserData | userRepo.UserData[];

  if (typeof req.query.cpf === "string")
    users = await userService.findByCpf(req.query.cpf);
  else if (typeof req.query.email === "string")
    users = await userService.findByEmail(req.query.email);
  else users = await userService.readAll();

  res.send(users);
}
