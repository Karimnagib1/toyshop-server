const sequelize = require("../config/db");
const {DataTypes} = require("sequelize");
const User = require("./User");

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.BIGINT(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    brand: {
        type: DataTypes.INTEGER,
        allowNull: false
    },     
    description: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(8,2),
        allowNull: false
    },
    thumbnail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rating: {
        type: DataTypes.DECIMAL(2,1)
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
     discountPercentage: {
        type: DataTypes.INTEGER,
        allowNull: false
     },
     sellerId: {
        type: DataTypes.BIGINT(11),
        allowNull: false,
        references: {
            model: User,
            key: 'id',

        }
     }
})

module.exports = Product;