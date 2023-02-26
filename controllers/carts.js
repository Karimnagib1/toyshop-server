const sqlQuery = require("../config/db");
const Cart = require('../models/cart');
exports.getCart = (req, res, next) => {
  const userId = req.user.id;
  const sql = `select * from carts
  join products on product_id where carts.product_id = products.id and  carts.user_id = ${userId};`;
  sqlQuery(sql)
    .then((cartItems) => {
      res.status(200).json({
        message: "Cart fetched",
        cart: cartItems,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        message: "Internal server error",
      });
    });
};

exports.postAddToCart = (req, res, next) => {
  const userId = req.user.id;
  const productId = req.body.productId;

  sqlQuery(
    `Select * FROM carts WHERE user_id = ${userId} AND product_id = ${productId}`
  )
    .then((result) => {
      console.log(result.length);
      if (result.length > 0) {
        sqlQuery(
          `UPDATE carts SET quantity = (quantity + 1) WHERE user_id = ${userId} AND product_id = ${productId}`
        )
          .then((result) => {
            sqlQuery(`select * from carts
          join products on product_id where carts.product_id = products.id and  carts.user_id = ${userId};`)
              .then((cartItems) => {
                res.status(200).json({
                  message: "Product added to cart",
                  cart: cartItems,
                });
              })
              .catch((err) => {
                console.log(err);
                return res.status(500).json({
                  message: "Internal server error",
                });
              });
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json({
              message: "Internal server error",
            });
          });
      } else {
        sqlQuery(
          `INSERT INTO carts (user_id, product_id, quantity) VALUES (${userId}, ${productId}, 1)`
        )
          .then((result) => {
            sqlQuery(`select * from carts
          join products on product_id where carts.product_id = products.id and  carts.user_id = ${userId};`)
              .then((cartItems) => {
                res.status(200).json({
                  message: "Product added to cart",
                  cart: cartItems,
                });
              })
              .catch((err) => {
                console.log(err);
                return res.status(500).json({
                  message: "Internal server error",
                });
              });
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json({
              message: "Internal server error",
            });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        message: "Internal server error",
      });
    });
};

exports.postRemoveFromCart = (req, res, next) => {
  const userId = req.user.id;
  const productId = req.body.productId;
  sqlQuery(
    `Select * FROM carts WHERE user_id = ${userId} AND product_id = ${productId}`
  )
    .then((result) => {
      if (result.length > 0 && result[0].quantity > 1) {
        sqlQuery(
          `UPDATE carts SET quantity = (quantity - 1) WHERE user_id = ${userId} AND product_id = ${productId}`
        )
          .then((result) => {
            sqlQuery(`select * from carts
                        join products on product_id where carts.product_id = products.id and  carts.user_id = ${userId};`)
              .then((cartItems) => {
                res.status(200).json({
                  message: "Product added to cart",
                  cart: cartItems,
                });
              })
              .catch((err) => {
                console.log(err);
                return res.status(500).json({
                  message: "Internal server error",
                });
              });
          })

          .catch((err) => {
            console.log(err);
            return res.status(500).json({
              message: "Internal server error",
            });
          });
      } else {
        sqlQuery(
          `DELETE FROM carts WHERE user_id = ${userId} AND product_id = ${productId}`
        ).then((result) => {
          sqlQuery(`select * from carts
              join products on product_id where carts.product_id = products.id and  carts.user_id = ${userId};`)
            .then((cartItems) => {
              res.status(200).json({
                message: "Product added to cart",
                cart: cartItems,
              });
            })
            .catch((err) => {
              console.log(err);
              return res.status(500).json({
                message: "Internal server error",
              });
            });
        });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        message: "Internal server error",
      });
    });
};
