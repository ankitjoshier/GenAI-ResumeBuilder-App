const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("***********DB CONNECTED***********");
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectDB;
