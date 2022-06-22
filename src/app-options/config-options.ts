import Joi from 'joi';
import envFilePath from './env-file-path';

const JoiObject = Joi.object({
  NODE_ENV: Joi.string().valid('dev', 'prod').required(),
  PORT: Joi.string().min(4).max(4).required(),
});

const configOptions = {
  envFilePath,
  isGlobal: true,
  validationSchema: JoiObject,
};

export default configOptions;