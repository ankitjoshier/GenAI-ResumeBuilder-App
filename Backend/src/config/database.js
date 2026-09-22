require("dotenv").config();
const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://ankitjoshier_db_user:3WjB3AEYKWYC5geE@cluster0.o3oobgk.mongodb.net/resumeBuilderAI",
    );
    console.log("***********DB CONNECTED***********");
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectDB;
