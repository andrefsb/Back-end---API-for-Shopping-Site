import User from "../model/user.js";
import { ObjectId } from "bson";

export const listUsuarios = (req, res) => {
  User.find({}, "_id nome email admin").exec((err, users) => {
    res.status(200).send(users);
  });
  console.log('Enviados usuarios');
};

export const retornaUser = (req, res) => {
  User.findOne({ _id: ObjectId(req.params.id) }, "_id nome email admin").exec(
    (err, user) => {
      console.log(user);
      res.status(200).send(user);
    }
  );
};

export const atualizaUser = (req, res) => {
  User.findByIdAndUpdate({ _id: ObjectId(req.params.id) }, req.body).exec(
    (err, user) => {
      console.log(user);
      res.status(200).send(user);
    }
  );
};

export const removeUser = (req, res) => {
  User.remove({ _id: ObjectId(req.params.id) }).exec((err, user) => {
    res.status(200).send(user);
  });
};

export const buscaUserPorNome = (req, res) => {
  User.find({ nome: { $regex: req.query.nome } }, "_id nome email admin").exec(
    (err, users) => {
      res.status(200).send(users);
    }
  );
};

export const atualizaPermissao = (req, res) => {
  User.findByIdAndUpdate(
    { _id: ObjectId(req.params.id) },
    { admin: req.body }
  ).exec((err, user) => {
    res.status(200).send(user);
  });
};
