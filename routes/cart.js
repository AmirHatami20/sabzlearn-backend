const express = require('express');
const authMiddleware = require("../middlewares/auth");
const cartController = require('../controllers/cart');

const router = express.Router();

// Get User Basket
router.get('/', authMiddleware, cartController.getUserCart);

// Add Course to Basket
router.post('/add', authMiddleware, cartController.addCourseToCart);

// Remove Course from Basket
router.delete('/remove/:courseId', authMiddleware, cartController.removeCourseFromCart);

module.exports = router;
