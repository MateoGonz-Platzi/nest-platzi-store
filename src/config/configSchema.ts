import * as Joi from 'joi';

const configSchema = Joi.object({
  PG_DATABASE: Joi.string().required(),
  PG_USER: Joi.string().required(),
  PG_PASSWORD: Joi.string().required(),
  PG_PORT: Joi.number().required(),
  PG_HOST: Joi.string().hostname().required(),

  DATABASE_NAME: Joi.string().required(),
  DATABASE_PORT: Joi.number().required(),
  API_KEY: Joi.string().required(),
  ENVIROMENT: Joi.string().required()
});

export default configSchema;