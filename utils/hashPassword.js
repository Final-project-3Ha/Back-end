import bcrypt from "bcryptjs";

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const hashPassword = (password) => {
  return bcrypt.hashSync(password, salt);
};

// Compare password

const comparePasswords = (inputPassword, hashedPassword) => {
  return bcrypt.compareSync(inputPassword, hashedPassword);
};

export  { hashPassword,comparePasswords };
