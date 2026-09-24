require("dotenv").config();

const app = require("./src/app.js");
const connectDB = require("./src/config/database.js");
const dns = require("dns");

const port = process.env.PORT || 3000;

dns.setServers(["1.1.1.1", "8.8.8.8"]);

connectDB();

app.listen(port, () => {
  console.log(`Server is started on PORT: ${port}`);
});
