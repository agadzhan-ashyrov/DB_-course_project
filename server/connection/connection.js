const Sequelize = require("sequelize");

const sequelize= new Sequelize("project_by_db", "root", "", {
  dialect: "mysql",
  host: "localhost",

    
});

const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
db.User = require('../models/user')(sequelize, Sequelize);
db.Token = require('../models/token')(sequelize, Sequelize);
//db.role = require('../models/role')(sequelize, Sequelize);

module.exports = db;