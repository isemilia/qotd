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

export const comparePasswords = async (args: {
  password: string;
  salt: string;
  hashedPassword: string;
}) => {
  const hashedUserInput = await hashPassword(args.password, args.salt);

  return crypto.timingSafeEqual(
    Buffer.from(hashedUserInput, 'hex'),
    Buffer.from(args.hashedPassword, 'hex'),
  );
};
