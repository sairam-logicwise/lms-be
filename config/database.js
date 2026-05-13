const mongoose = require("mongoose");
require("dotenv").config();
const runSeeder = require("../helpers/seeder");

mongoose
  .connect(process.env.DATABASE_URL, {})
  .then(async (conn) => {
    console.log("Connected to DB");
    await runSeeder();
  })
  .catch((error) => console.log("error :>> ", error));
