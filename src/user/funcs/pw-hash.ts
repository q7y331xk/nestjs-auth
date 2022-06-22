import crypto from 'crypto';

export const getSalt = (): string => {
  return crypto.randomBytes(20).toString('base64');
};

export const passswordEncrypt = (pw: string, salt: string): string => {
  return crypto.pbkdf2Sync(pw, salt, 10000, 64, 'sha512').toString('base64');
};
