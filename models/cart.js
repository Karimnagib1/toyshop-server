
const sequelize = require("../config/db");
const {DataTypes} = require("sequelize");
const User = require("./User");
const Product = require("./product");

const Cart = sequelize.define('cart', {
    userId: {
        type: DataTypes.BIGINT(11),
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        },
        primaryKey: true
    },
    productId: {
        type: DataTypes.BIGINT(11),
        allowNull: false,
        references: {
            model: Product,
            key: 'id'
        },
        primaryKey: true
    },
    quantity: {
        type: DataTypes.INTEGER,

    }

//     PRIMARY KEY (`user_id`, `product_id`),

})

module.exports = Cart;