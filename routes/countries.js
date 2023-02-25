const { Router } = require("express");

const {
  addCountry,
  getCountries,
  deleteCountry,
} = require("./../controllers/countries");

const router = Router();

router.post("/", addCountry);
router.get("/", getCountries);
router.delete("/", deleteCountry);

module.exports = router;
