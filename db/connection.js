var mysql = require("mysql");
const util = require("util");
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Jake2019",
  database: "employeetracker_DB",
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
});
connection.query = util.promisify(connection.query);

module.exports = connection;
