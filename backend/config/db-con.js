const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const db = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to database");
  } catch (err) {
    console.log("DB error:", err.message);
  }
};

module.exports = db;
