const { Schema, model } = require("mongoose");

const CountrySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre es requerido"],
      default: "País desconocido",
      trim: true,
      minLength: [2, "Debe tener al menos dos caracteres"],
      maxLength: [30, "Debe tener como máximo treinta caracteres"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Country", CountrySchema);
