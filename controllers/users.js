const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const CustomError = require("../utils/CustomError");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      throw new CustomError("Usuario y contraseña son requeridas", 400);
    const user = await User.findOne({ email });
    if (!user) throw new CustomError("Usuario no encontrado", 404);
    const passOk = await bcrypt.compare(password, user.password);
    if (!passOk) throw new CustomError("Contraseña incorrecta", 400);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Ingreso correcto", user, token });
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ message: error.message || "algo explotó :|" });
  }
};

const register = async (req, res) => {
  try {
    const { name, lastname, email, age, password, country } = req.body;
    const salt = await bcrypt.genSalt(10);
    const passwordEncrypted = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      lastname,
      email,
      age,
      admin: false,
      password: passwordEncrypted,
      country,
    });

    const userSaved = await newUser.save();
    res.status(200).json({ message: "Registro correcto", user: userSaved });
  } catch (error) {
    res.status(error.code || 500).json({
      message:
        error.message || "Ups! Hubo un problema, por favor intenta más tarde",
    });
  }
};

const getAuthStatus = async (req, res) => {
  try {
    const id = req.id;
    const user = await User.findById(id);
    if (!user) throw new CustomError("Autenticación fallida", 401);
    res.status(200).json({ user });
  } catch (error) {
    res.status(error.code || 500).json({
      message:
        error.message || "Ups! Hubo un problema, por favor intenta más tarde",
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("country");
    res.status(200).json({ users });
  } catch (error) {
    res.status(error.code || 500).json({
      message:
        error.message || "Ups! Hubo un problema, por favor intenta más tarde",
    });
  }
};

const addUser = async (req, res) => {
  try {
    const { name, lastname, age, email, admin, password, country } = req.body;
    const salt = await bcrypt.genSalt(10);
    const passwordEncrypted = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      lastname,
      age,
      email,
      admin,
      password: passwordEncrypted,
      country,
    });
    await newUser.save();
    res.status(201).json({ message: "Se agregó el nuevo usuario con éxito" });
  } catch (error) {
    res.status(error.code || 500).json({
      message:
        error.message || "Ups! Hubo un problema, por favor intenta más tarde",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    const userRemoved = await User.findByIdAndDelete(id);
    if (!userRemoved) throw new CustomError("No existe tal wachin", 404);
    res.status(201).json({ message: "El usuario ha sido borrado con éxito" });
  } catch (error) {
    res.status(error.code || 500).json({
      message:
        error.message || "Ups! Hubo un problema, por favor intenta más tarde",
    });
  }
};

module.exports = {
  login,
  register,
  getAuthStatus,
  getUsers,
  addUser,
  deleteUser,
};
