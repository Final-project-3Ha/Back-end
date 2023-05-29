import bcrypt from 'bcryptjs'
import { ObjectId } from "mongodb";


const users = [
  {
    name: "admin",
    lastName: "admin",
    email: "admin@admin.com",
    password: bcrypt.hashSync("admin@admin.com", 10),
    isAdmin: true,
  },
  {
    _id: new ObjectId("6474a5d4200f01e27fbdad59"),
    name: "Hassan",
    lastName: "Hammoud",
    email: "hasan@gmail.com",
    password: bcrypt.hashSync("hasan@doe.com", 10),
  },
];

export default users;
