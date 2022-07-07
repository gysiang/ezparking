"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const initCarparkModel = require("./carpark");
const initUserModel = require("./user");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Add model definitions to db
db.User = initUserModel(sequelize, Sequelize.DataTypes);
db.Carpark = initCarparkModel(sequelize, Sequelize.DataTypes);

// Define models' assosiation: Many to many
db.User.belongsToMany(db.Carpark, { through: "user_carparks" });
db.Carpark.belongsToMany(db.User, { through: "user_carparks" });

// db.User.hasMany(db.UserCarpark);
// db.UserCarpark.belongsTo(db.User);
// db.Carpark.hasMany(db.UserCarpark);
// db.UserCarpark.belongsTo(db.Carpark);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
