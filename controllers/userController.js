const bcrypt = require("bcrypt");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");

const UserController = {
  getUser: async (req, res, next) => {
    const id = req.user.sub;

    const user = await UserModel.findById(id);
    if (user) {
      res.json(user);
    } else {
      res.json({ message: "Usuario no encontrado" });
    }
  },

  UserList: async (req, res, next) => {
    const users = await UserModel.find();
    try {
      return res.json({ users });
    } catch (error) {
      res.status(500).send(error);
    }
  },
  userListById: async (req, res, next) => {
    if (req.user.role !== "admin") {
      return res.json({
        message: "no tienes los permisos para realizar esta accion",
      });
    }
    const { id } = req.params;
    const user = await UserModel.findById(id);
    if (user) {
      res.json(user);
    } else {
      res.json({ message: "Usuario no encontrado" });
    }
  },
  createUser: async (req, res, next) => {
    const { username, email, password } = req.body;
    const user = await UserModel.findOne({ $or: [{ username }, { email }] });
    if (user) {
      res.status(404).send({
        error: `El usuario ${username} o el email ${email} ya se encuentra en uso`,
      });
      return;
    }
    const newUser = new UserModel({
      ...req.body,
      role: "admin",
      password: bcrypt.hashSync(password, parseInt(process.env.BCRYPT_ROUNDS)),
    });
    const response = await newUser.save();
    res.json(response);
  },
  autenticarUsuario: async (req, res, next) => {
    //passport local
    passport.authenticate("local", { sesion: false }, (error, user) => {
      if (error) {
        return res.status(400).json({ error });
      }
      if (!user) {
        return res
          .status(400)
          .json({ message: "user not found or password incorrect" });
      }
      const payload = {
        sub: user._id,
        role: user.role,
        name: user.username,
        exp: Date.now() + parseInt(process.env.JWT_LIFETIME),
      };
      // console.log(payload);
      // crear un token para el usuario [se alamcena en el frontend en localStorage]
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        algorithm: process.env.JWT_ALGORITHM,
      });
      return res.json({ token, role: user.role, id: user._id });
    })(req, res, next);
  },
  updateUser: async (req, res, next) => {
    const { role, _id, ...user } = req.body;
    const paramsToUpdate = {
      ...user,
      password: bcrypt.hashSync(
        req.body.password,
        parseInt(process.env.BCRYPT_ROUNDS)
      ),
    };
    try {
      const response = await UserModel.findByIdAndUpdate(
        req.user.sub,
        paramsToUpdate
      );
      res.json({ message: "Datos Actualizados" });
    } catch (error) {
      res.json({ message: "Usuario no encontrado" });
    }
  },
  updateUserAdmin: async (req, res, next) => {
    if (req.user.role !== "admin") {
      return res.json({
        message: "no tienes los permisos para realizar esta accion",
      });
    }
    const { id } = req.params;
    const { role } = req.body;
    try {
      const response = await UserModel.findByIdAndUpdate(id, { role });
      response.save();
      res.json({ message: "Modificado Existosamente" });
    } catch (error) {
      res.json({ message: "Usuario no encontrado" });
    }
  },
  deleteUser: async (req, res, next) => {
    const { id } = req.params;
    const response = await UserModel.findByIdAndDelete(id);
    if (response) {
      res.json({ message: "usuario eliminado" });
    } else {
      res.json({ message: "user not found" });
    }
  },
};
module.exports = UserController;
