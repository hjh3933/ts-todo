const dotenv = require("dotenv");
dotenv.config();

const development = {
  username: "sesac",
  password: "1234",
  database: "sesac",
  host: "127.0.0.1",
  dialect: "mysql",
};
const production = {
  username: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: "sesac",
  host: process.env.RDS_HOST,
  dialect: "mysql",
};

module.exports = { development, production };
