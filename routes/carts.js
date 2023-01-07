const express = require('express');
const {    getCart , postAddToCart, postRemoveFromCart} = require('../controllers/carts');
const router = express.Router();
const passport = require('passport');


router.get('/', passport.authenticate("jwt", { session: false }), getCart);
router.post('/add-to-cart', passport.authenticate("jwt", { session: false }), postAddToCart);
router.post('/remove-from-cart', passport.authenticate("jwt", { session: false }), postRemoveFromCart);


module.exports = router;