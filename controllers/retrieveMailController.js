const sendMail = require("../controllers/retrieveMail");
const bcrypt = require("bcrypt");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const retrieveController = {
  createUser1: async (req, res, next) => {
    const { email } = req.body;
    const user = await userModel.findOne({email});
    if (user) {
      res.status(404).send({
        error: `El email ${email} ya se encuentra en uso`,
      });
      return;
    }
  },
};

module.exports = retrieveController;
