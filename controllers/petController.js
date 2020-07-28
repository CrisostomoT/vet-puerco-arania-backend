const petModel = require("../models/pet");

const mascotaController = {
  listarMascotas: async (req, res, next) => {
    const pets = await petModel.find({owner: req.user.sub});
    return res.json(pets);
  },

  agregarMascota: async (req, res, next) => {
    try {
      const { owner, name, species, race, size, weigth } = req.body;

      const pet = new petModel({
        owner: req.user.sub,
        name,
        species,
        race,
        size,
        weigth,
      });
      const resultado = await pet.save();

      return res.json(resultado);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error 500: Internal server error" });
    }
  },

  actualizarMascota: async (req, res, next) => {
    try {
      const { idPet } = req.body;
      const result = await petModel.findByIdAndUpdate(idPet, { ...req.body });
      return res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error 500: Internal server error" });
    }
  },

  eliminarMascota: async (req, res, next) => {
    const { id } = req.params;
    const resultado = await petModel.findByIdAndDelete( id );
    if (resultado){
      res.json({mensaje: "paso por aqui"})
    }else {
      res.json({mensaje: "no se encontro pet"})
    }
  },
};

module.exports = mascotaController;
