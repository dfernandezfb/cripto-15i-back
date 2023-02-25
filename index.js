const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");
const users = require("./routes/users");
const countries = require("./routes/countries");

const app = express();
dotenv.config();
connectDB();

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/users", users);
app.use("/countries", countries);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
