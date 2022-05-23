import joi from "joi";
import { CreateUserData } from "./../repositories/userRepo.js";
import { LoginData } from "../services/userService.js";

export const userSchema = joi.object<CreateUserData>({
  email: joi.string().email({ minDomainSegments: 2 }).required(),
  cpf: joi.string().length(11).required(),
  password: joi.string().min(8).max(16).required(),
  full_name: joi
    .string()
    .required()
    .pattern(/(.+ .*)|(.* .+)/),
});

export const loginSchema = joi.object<LoginData>({
  login: joi.string().required(),
  password: joi.string().required(),
});
