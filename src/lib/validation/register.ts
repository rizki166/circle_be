import Joi from "joi";

export const registerValidation = Joi.object({
  username : Joi.string().required(),
  email    : Joi.string().required().email(),
  fullname :Joi.string().required(),
  password :Joi.string().required(),
})