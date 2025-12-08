var mysql = require("mysql");
const app = require("./app");
const db = require("./models");

process.on("uncaughtException", (err) => {
  console.log("UNHANDLED EXCEPTION! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

var connection = mysql.createConnection({
  host: "languagedb-languagedb.c.aivencloud.com",
  user: "avnadmin",
  password: "AVNS_B0C1YGD-EqY7fE5CqVl",
  database: "language",
  port: "25812",
});
connection.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("DB connected successfull!");
});

const port = 8080;
let server;
db.sequelize.sync().then(() => {
  server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
  });
});
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

module.exports = connection;
