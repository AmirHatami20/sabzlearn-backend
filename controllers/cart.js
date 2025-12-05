const CartModel = require("../models/cart");

module.exports = {
    // Get User Cart
    getUserCart: async (req, res) => {
        try {
            const userCart = await CartModel.findOne({user: req.user._id});
            return res.json(userCart || {user: req.user._id, courses: []});
        } catch (error) {
            return res.status(400).send({
                success: false,
                message: error.message,
            });
        }
    },

    // Add Course to Cart
    addCourseToCart: async (req, res) => {
        try {
            const {courseId} = req.body;

            let cart = await CartModel.findOne({user: req.user._id});

            if (!cart) {
                cart = new CartModel({user: req.user._id, courses: [courseId]});
            } else {
                if (!cart.courses.includes(courseId)) {
                    cart.courses.push(courseId);
                }
            }

            await cart.save();
            return res.json(cart);
        } catch (error) {
            return res.status(400).send({
                success: false,
                message: error.message,
            });
        }
    },

    // Remove Course from Cart
    removeCourseFromCart: async (req, res) => {
        try {
            const {courseId} = req.params;

            let cart = await CartModel.findOne({user: req.user._id});

            if (!cart) return res.status(404).send({success: false, message: "Cart not found"});

            cart.courses = cart.courses.filter(id => id.toString() !== courseId);
            await cart.save();

            return res.json(cart);
        } catch (error) {
            return res.status(400).send({
                success: false,
                message: error.message,
            });
        }
    },
};
