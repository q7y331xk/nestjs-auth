import { ResponseException } from "../types/http-response.type";

export const catchHandler = (err) => {
  const errArray = Array.isArray(err) && err.length <= 3;
  if (errArray) throw new ResponseException(...err);
  else throw new ResponseException(err);
};
