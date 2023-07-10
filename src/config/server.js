const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  SERVER_PORT,
  REGION,
  ACCESSKEYID,
  ACCESSKEYSECRET,
  BUCKET,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
} = process.env;
