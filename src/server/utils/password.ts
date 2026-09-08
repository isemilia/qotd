import crypto from 'node:crypto';

export const hashPassword = async (
  password: string,
  salt: string,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (error, hashed) => {
      if (error) {
        reject();
      }

      resolve(hashed.toString('hex').normalize());
    });
  });
};

export const generateSalt = () => {
  return crypto.randomBytes(16).toString('hex').normalize();
};
