const Sequelize = require("sequelize");
const host = process.env.DB_HOST;
const DB = process.env.DATABASE;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

const sequelize= new Sequelize(DB, user, password, {
  dialect: "mysql",
  host: host,

    
});

const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
db.User = require('../models/user')(sequelize, Sequelize);
db.Token = require('../models/token')(sequelize, Sequelize);
//db.role = require('../models/role')(sequelize, Sequelize);

module.exports = db;