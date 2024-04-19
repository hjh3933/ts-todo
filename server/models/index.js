const Sequelize = require("sequelize");

let config;
if (process.env.NODE_ENV) {
  config = require(__dirname + "/../config/config.js")[process.env.NODE_ENV];
} else {
  config = require(__dirname + "/../config/config.js")["developmetn"];
}
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const TodoModel = require("../models/Todo")(sequelize, Sequelize);
db.Todo = TodoModel;

module.exports = db;
