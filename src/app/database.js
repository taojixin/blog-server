const mysql = require("mysql2");
const {
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
} = require("../config/server");

const connection = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  connectionLimit: 5,
});

connection.getConnection((err, connection) => {
  if (err) {
    console.log("数据库连接失败：", err);
    return;
  }
  connection.connect((err) => {
    if (err) {
      console.log("数据库连接失败:", err);
    } else {
      console.log("数据库连接成功!");
    }
  });
});

module.exports = connection.promise();
