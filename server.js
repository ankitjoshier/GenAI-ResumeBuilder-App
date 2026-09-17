require("dotenv").config();
const app = require("./src/app.js");
const connectDB = require("./src/config/database.js");
port = process.env.PORT;

connectDB();

app.listen(port, () => {
  console.log("Server is started on PORT: 3000");
});
