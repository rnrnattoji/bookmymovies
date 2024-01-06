const mysql = require("mysql");
const { databaseConfig } = require("../config/app-config.js");

let mysqlInstance = null;

function createMySQLPool() {
  if (!mysqlInstance) {
    mysqlInstance = mysql.createPool({
      host: databaseConfig.host,
      user: databaseConfig.user,
      password: databaseConfig.password,
      database: databaseConfig.database,
      port: databaseConfig.port
    });
  }

  return mysqlInstance;
}

module.exports = createMySQLPool();
