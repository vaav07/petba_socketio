const mysql = require("mysql");

// Create a MySQL database connection
const db = {
  host: "166.62.28.144",
  user: "petbauser",
  database: "petba",
  password: "petbauser4321",
  port: 3306,
};

let connection;

function handleDisconnect() {
  connection = mysql.createConnection(db);

  connection.connect(function (err) {
    // The server is either down
    if (err) {
      // or restarting (takes a while sometimes).
      console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    } // to avoid a hot loop, and to allow our node script to

    console.log("Connected to database!");
  });

  connection.on("error", function (err) {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      // Connection to the MySQL server is usually
      handleDisconnect(); // lost due to either server restart, or a
    } else {
      // connnection idle timeout (the wait_timeout
      throw err; // server variable configures this)
    }
  });
}

// handleDisconnect();
