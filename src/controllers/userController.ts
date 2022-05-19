import { Request, Response } from "express";
import * as userService from "../services/userServices.js";
import * as userRepo from "../repositories/userRepo.js";

export async function create(req: Request, res: Response) {
  const user: userRepo.CreateUserData = req.body;

  await userService.create(user);

  res.send("user created").status(201);
}

export async function readAll(req: Request, res: Response) {
  const users = await userService.readAll();

  res.send(users);
}
