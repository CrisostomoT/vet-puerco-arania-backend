const passport = require("passport");

const authenticateUser = (req, res, next) => {
  //verficiar que el usuario este autenticado
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) next(err);
    if (info) next(res.status(400).json({ error: info.message }));
    if (!user) next(res.status(400).json({ error: "Prohibido: usuario no encontrado" }));
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = authenticateUser;
