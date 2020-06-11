const sequelize = require("sequelize");
const connection = new sequelize("asknode","root","suasenha",{
    host: "localhost",
    dialect: "mysql"
});

module.exports = connection;
