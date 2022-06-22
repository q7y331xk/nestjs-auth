export type GenericObject = { [key: string]: any };

export type TokenUser = {
  id: number;
  name: string;
  passwordVersion: number;
  iat: number;
  exp: number;
};
