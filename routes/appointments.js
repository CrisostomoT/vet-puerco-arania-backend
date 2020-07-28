const router = require("express").Router();
const appointmentsController = require("../controllers/appointmentsController");

const {
  userAppointments,
  appointmentsList,
  createAppointments,
  updateAppointments,
  deleteAppointments,
} = appointmentsController;

router.route("/").get(appointmentsList).post(createAppointments);

router.route("/user").get(userAppointments);


router.route("/:id").put(updateAppointments).delete(deleteAppointments);


module.exports = router;
