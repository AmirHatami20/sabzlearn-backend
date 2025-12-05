const ArticleModel = require("../models/article");

module.exports = {
    createArticle: async (req, res) => {
        const {title, description, body, shortName, category} = req.body;

        try {
            const imageUrl = req.imageUrl; // get from middleware

            const article = await ArticleModel.create({
                title,
                description,
                shortName,
                body,
                creator: req.user._id, // come from middleware
                category,
                imageUrl,
                isPublished: true,
            })

            return res.status(201).json(article);

        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            })
        }
    },
    getAllArticle: async (req, res) => {
        try {
            const articles = await ArticleModel.find().populate("creator", "name").lean()
            return res.json(articles);
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            })
        }
    },
    getArticleById: async (req, res) => {
        try {
            const article = await ArticleModel.findById(req.params.id)
                .populate("category")
                .populate("creator", "-password")
                .lean();

            if (!article) {
                return res.status(404).json({
                    success: false,
                    message: "No article with this id"
                })
            }

            res.json(article);
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            })
        }
    },
    remove: async (req, res) => {
        const deletedArticle = await ArticleModel.findByIdAndDelete(req.params.id);

        if (!deletedArticle) {
            return res.status(404).json({
                success: false,
                message: "Article Not Found!"
            });
        }

        return res.json(deletedArticle);
    },
}

