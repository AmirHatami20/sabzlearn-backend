const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");

module.exports = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({message: "ابتدا وارد شوید."});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await UserModel.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(404).json({message: "کاربر یافت نشد."});
        }

        req.user = user;
        next();

    } catch (err) {
        return res.status(401).json({message: "توکن نامعتبر است."});
    }
};
