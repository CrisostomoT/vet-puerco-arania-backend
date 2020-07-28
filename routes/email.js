const router = require("express").Router();
const sendMail = require("../controllers/retrieveMail");

router.route("/").post(sendMail);

module.exports = router;
