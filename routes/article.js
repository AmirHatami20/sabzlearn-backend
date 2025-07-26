const express = require("express");
const multer = require('multer');
const upload = multer();

const authMiddleWare = require("../middlewares/auth");
const isAdminMiddleware = require("../middlewares/isAdmin");
const uploadImage = require("../middlewares/uploadImage");

const articleController = require("../controllers/article");

const router = express.Router();

// Create article
router.post("/", authMiddleWare, isAdminMiddleware, upload.single('image'), uploadImage, articleController.createArticle)

// Get all article
router.get("/", articleController.getAllArticle);

// Get one article by id
router.get("/:id", articleController.getArticleById);

// Remove article
router.delete("/:id", authMiddleWare, isAdminMiddleware, articleController.remove);

module.exports = router;