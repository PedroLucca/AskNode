const sequelize = require("sequelize");
const connection = require("./database");

const Answer = connection.define("answers",{
    corpo:{
        type: sequelize.TEXT,
        allowNull: false
    },
    askID:{
        type: sequelize.INTEGER,
        allowNull: false
    }
});

Answer.sync({force: false}).then(() => {});

module.exports = Answer;