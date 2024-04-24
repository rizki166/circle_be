import Joi from "joi";

export const loginValidation = Joi.object({
  username : Joi.string().required(),
  email    : Joi.string().email(),
  password :Joi.string().required(),
})