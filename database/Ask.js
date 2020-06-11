const sequelize = require("sequelize");
const connection = require("./database");

const Ask = connection.define("asks",{
    titulo:{
        type: sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: sequelize.TEXT,
        allowNull: false
    }
});

Ask.sync({force: false}).then(() => {});

module.exports = Ask;