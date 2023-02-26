const sequelize = require("../config/db");
const {Sequelize, DataTypes} = require("sequelize");

const User = sequelize.define('user',{
    id: {
        type: DataTypes.BIGINT(11),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true

    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "user"
    }
})

module.exports = User;