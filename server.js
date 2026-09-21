require("dotenv").config();
const app = require("./src/app.js");
const connectDB = require("./src/config/database.js");
const dns = require("dns");
port = process.env.PORT;

dns.setServers(["1.1.1.1", "8.8.8.8"]);
connectDB();

app.listen(port, () => {
  console.log("Server is started on PORT: 3000");
});
