import express from "express";
import init from "./database/init.js";
import cors from "cors";
import { signup, login, valida, validaHeader, logout } from "./middleware/auth.js";
import {
  listUsuarios,
  retornaUser,
  atualizaUser,
  removeUser,
  buscaUserPorNome,
  buscaUserPorEmail
} from "./middleware/users.js";
import mongoose from "mongoose";

mongoose.Promise = global.Promise;


const app = express();

const PORT = 5000;

init();

const corsOptions = {
  origin: "http://localhost:4200",
};

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

app.use(cors(corsOptions));

app.use(express.json());


app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => console.log("Banco subiu!"));

app.post("/signup", signup);
app.get("/usuarios/:id", validaHeader, retornaUser);
app.get("/usuarios", validaHeader, listUsuarios);

app.put("/usuarios/:id", validaHeader, atualizaUser);
app.delete("/usuarios/:id", validaHeader, removeUser);

app.get("/busca", validaHeader, buscaUserPorNome);

app.get("/buscaemail", validaHeader, buscaUserPorEmail);

app.post("/login", login);

app.post("/valida", valida);

app.post("/logout", logout);