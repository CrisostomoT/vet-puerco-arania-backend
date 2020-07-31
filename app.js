require("dotenv").config();

//imports de librerias

const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mercadopago = require("mercadopago");
const cors = require("cors");

//imports de archivos propios

const conectarDB = require("./db/index");
const routes = require("./routes");
const localStrategy = require("./passport/local");
const jwtStrategy = require("./passport/jwt");

//connect to DB
conectarDB();

//setup de passport
passport.use("local", localStrategy);
passport.use("jwt", jwtStrategy);

//setup MercadoPago
mercadopago.configure({
  access_token: process.env.MP_TOKEN,
});

//setup Express Application
const app = express();
app.use(morgan("short"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use("/api", routes);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

//inicializando aplicacion
const port = process.env.PORT || 8080;

app.listen(port, () => console.log("App Started on Port " + port));
