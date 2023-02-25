const Country = require("../models/Country");
const User = require("../models/User");

const addCountry = async (req, res) => {
  try {
    const { name } = req.body;
    const newCountry = new Country({
      name,
    });
    await newCountry.save();
    res.status(201).json({ message: "Se agregó el nuevo país con éxito" });
  } catch (error) {
    res.status(error.code || 500).json({
      message:
        error.message || "Ups! Hubo un problema, por favor intenta más tarde",
    });
  }
};
const getCountries = async (req, res) => {
  try {
    const countries = await Country.find();
    res.status(201).json({ countries });
  } catch (error) {
    res.status(error.code || 500).json({
      message:
        error.message || "Ups! Hubo un problema, por favor intenta más tarde",
    });
  }
};

const deleteCountry = async (req, res) => {
  try {
    const { id } = req.body;
    const countryRemoved = await Country.findByIdAndDelete(id);
    if (!countryRemoved) throw new CustomError("No existe tal pais", 404);
    const usersWithRemovedCountry = await User.find({ country: id });
    await Promise.all(
      usersWithRemovedCountry.map(async (user) => {
        await User.findByIdAndUpdate(user.id, {
          country: "63f800c2058165426a4b68cf",
        });
      })
    );
    res.status(201).json({ message: "El pais ha sido borrado con éxito" });
  } catch (error) {
    res.status(error.code || 500).json({
      message:
        error.message || "Ups! Hubo un problema, por favor intenta más tarde",
    });
  }
};

module.exports = { addCountry, getCountries, deleteCountry };
