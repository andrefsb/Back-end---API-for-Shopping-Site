import bcrypt from "bcryptjs";
import User from "../model/user.js";
import jwt from "jsonwebtoken";
import config from "../config/index.js";
import Token from "../model/token.js";
import {
  ObjectId
} from "bson";



export const signup = (req, res) => {

  User.findOne({
    email: req.body.email,
  }).exec((err, user) => {

    if (user) {
      res.status(401).send({
        message: "E-mail já cadastrado!"
      });
      return;
    }

    const userAdd = new User({
      email: req.body.email,
      nome: req.body.nome,
      senha: bcrypt.hashSync(req.body.senha),
      admin: req.body.admin
    });

    userAdd.save((err, user) => {
      if (err) {
        res.status(500).send({
          message: err
        });
        return;
      }
      console.log(user);
      res.status(201).send({
        message: "Criado com sucesso!"
      });
      return;
    });
  });
};

export const login = (req, res) => {
  User.findOne({
    email: req.body.email,
  }).exec((err, user) => {

    if (!user) {
      res.status(401).send({
        message: "Conta não cadastrada com esse email!"
      });
      return;
    }

    let passwordIsValid = bcrypt.compareSync(req.body.senha, user.senha);

    if (!passwordIsValid) {
      res.status(401).send({
        message: "Senha incorreta!",
      });
      return;
    }

    let token = jwt.sign({
      id: user.id
    }, config.SECRET, {
      expiresIn: 86400,
    });

    res.status(200).send({
      email: user.email,
      accessToken: token,
    });
  });
};


export const validaHeader = (req, res, next) => {
  let token = req.get('X-token');

  if (!token) {
    return res.status(403).send({
      message: "Acesso Negado."
    });
  }

  jwt.verify(token, config.SECRET, (err, decoded) => {
    console.log(decoded);

    if (err) {
      console.log("Erro ao validar token!!", err);
      return res.status(401).send({
        message: "Acesso negado!"
      });
    }

    User.findById({
      _id: ObjectId(decoded.id)
    }).exec((err, user) => {
      console.log(req.url);

      res.header("x-roles", user.admin);
      next();
    });
  });

};

export const valida = (req, res) => {
  let token = req.body.token;

  if (!token) {
    return res.status(403).send({
      message: "Token inválido!"
    });
  }

  jwt.verify(token, config.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Token inválido!"
      });
    }

    User.findOne({
      _id: ObjectId(decoded.id)
    }).exec((err, user) => {
      // console.log(user);
      res.status(200).send(user);
    });

  });
};

export const logout = (req, res) => {
  let token = req.body.token;

  const tokenDb = new Token({
    access_token: token
  });

  tokenDb.save((err, token) => {
    if (err) {
      res.status(500).send({
        message: err
      });
      return;
    }
    res.status(200).send({
      message: "Logout realizado com sucesso!"
    });
    return;
  });
}
