const { Router } = require("express");
const { check } = require("express-validator");
const auth = require("../middlewares/auth");

// const auth = require("../middlewares/auth");
const validateFields = require("../middlewares/validateFields");
const verifyRole = require("../middlewares/verifyRole");
const {
  login,
  register,
  getAuthStatus,
  getUsers,
  addUser,
} = require("./../controllers/users");

const router = Router();

router.post(
  "/login",
  [
    check("email").isEmail().isLength({ min: 5, max: 50 }),
    check("password").not().isEmpty(),
    validateFields,
  ],
  login
);

router.post(
  "/register",
  [
    check(
      "name",
      "El formato del nombre debe ser un string de entre 2 y 30 caracteres"
    )
      .isString()
      .isLength({ min: 2, max: 30 }),
    check("lastname").not().isEmpty().isString().isLength({ min: 2, max: 30 }),
    check("email").isEmail(),
    check("age").isFloat({ min: 0, max: 150 }),
    check("password")
      .not()
      .isEmpty()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
    validateFields,
  ],
  register
);

router.get("/authStatus", auth, getAuthStatus);

router.get("/", auth, getUsers);

router.post("/", auth, verifyRole, addUser);

module.exports = router;
