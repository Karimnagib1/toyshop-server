const express = require('express');
const { getProductsByCategory, getProducts, getSearchProducts, getProductById, postAddProduct} = require('../controllers/products');
const router = express.Router();
const passport = require('passport');



router.get('/', getProducts);
router.get('/search', getSearchProducts);

router.get('/product/:id', getProductById);
router.get('/category/:category', getProductsByCategory);
router.post( '/add-product', passport.authenticate("jwt", { session: false }), postAddProduct);

module.exports = router;