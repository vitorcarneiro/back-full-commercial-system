import { Request, Response } from "express";
import * as userService from "../services/userServices.js";
import * as userRepo from "../repositories/userRepo.js";

export async function create(req: Request, res: Response) {
  const user: userRepo.CreateUserData = req.body;

  await userService.create(user);

  res.send("user created").status(201);
}

export async function read(req: Request, res: Response) {
  let users: userRepo.UserData | userRepo.UserData[];

  if (typeof req.query.cpf === "string")
    users = await userService.findByCpf(req.query.cpf);
  else if (typeof req.query.email === "string")
    users = await userService.findByEmail(req.query.email);
  else users = await userService.readAll();

  res.send(users);
}
