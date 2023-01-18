import mongoose from "mongoose";

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    email: String,
    senha: String,
    nome: String,
    admin: Boolean
  })
);


export default User;
