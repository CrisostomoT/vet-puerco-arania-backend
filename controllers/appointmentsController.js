const AppointmentModel = require("../models/appointment");
const sendMail = require("../controllers/emailController");
const userModel = require("../models/user");




const TurnsController = {
  userAppointments: async (req, res, next) => {
    const userId = req.user.sub;
    const userAppointments = await AppointmentModel.find({
      user: userId,
    });
    res.json(userAppointments);
  },
  appointmentsList: async (req, res, next) => {
    const appointments = await AppointmentModel.find();
    try {
      
      return res.json(appointments);
    } catch (error) {
      res.status(400).send({message: error})
    }
  },
  createAppointments: async (req, res, next) => {
    const { service, pet, date, time, description } = req.body;
    const user = req.user.sub;
    try {
      const appointment = await AppointmentModel.findOne({ date, time });
      if (appointment) {
        res.status(404).send({ error: `El Turno ya esta ocupado` });
        return;
      }
      const newAppointment = new AppointmentModel({
        service,
        user,
        pet,
        date,
        time,
        description,
      });
      const response = await newAppointment.save();
      const userDoc = await userModel.findOne({ _id: user }).populate("_id");
      console.log(userDoc);
      const content = {
        user: userDoc.username,
        service,
        pet,
        date,
        time,
        description,
        email: userDoc.email,
      };
      await sendMail(content);
      res.json(response);
    } catch (error) {
      console.error(error);
      res.status(402).json(error);
    }
  },

  updateAppointments: async (req, res, next) => {
    const { id } = req.params;
    const paramsToUpdate = { ...req.body };
    try {
      const response = await AppointmentModel.findByIdAndUpdate(
        id,
        paramsToUpdate
      );
      res.json({ message: "Turno Modificado" });
    } catch (error) {
      res.json({ message: "el turno no fue encontrado" });
    }
  },
  deleteAppointments: async (req, res, next) => {
    const { id } = req.params;
    const response = await AppointmentModel.findByIdAndDelete(id);
    if (response) {
      res.json({ message: "el turno fue eliminado exitosamente" });
    } else {
      res.json({ message: "el turno no fue encontrado" });
    }
  },
};

module.exports = TurnsController;
