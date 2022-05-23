import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as userService from "../services/userService.js";
import * as error from "../utils/errorUtils.js";
dotenv.config();

export async function ensureAuthenticatedMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers.authorization;
  if (!authorization) throw error.unauthorized("Missing authorization header");

  const token = authorization.replace("Bearer ", "");
  if (!token) throw error.unauthorized("Missing token");

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET) as {
      userId: number;
    };
    const user = await userService.findById(userId);
    res.locals.user = user;

    next();
  } catch {
    throw error.unauthorized("Invalid token");
  }
}
