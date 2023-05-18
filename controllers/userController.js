import User from "../models/UserModel.js";
import hashPassword from "../utils/hashPassword.js";

// get all users

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select("-password").orFail();
    return res.json(users);
  } catch (err) {
    next(err);
  }
};

// Register a user

const registerUser = async (req, res, next) => {
  try {
    const { name, lastName, email, password } = req.body;
    if (!(name && lastName && email && password)) {
      return res.status(400).send("All inputs are required");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    } else {
      const hashedPassword = hashPassword(password);
      const user = await User.create({
        name,
        lastName,
        email: email.toLowerCase(),
        password: hashedPassword
      })
      return res.status(200).send(user)
    }
  } catch (err) {
    next(err);
  }
};

export default { getUsers, registerUser };
