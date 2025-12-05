const express = require("express");
const multer = require('multer');
const upload = multer();

const authMiddleware = require("../middlewares/auth");
const isAdminMiddleware = require("../middlewares/isAdmin");
const uploadImage = require("../middlewares/uploadImage");

const courseController = require("../controllers/course");

const router = express.Router();

// Create Course
router.post("/", authMiddleware, isAdminMiddleware, upload.single("image"), uploadImage, courseController.createCourse);

// Get All
router.get("/", courseController.getAllCourse);

// Get Related
router.get("/related/:id", courseController.getRelated);

// Get by shortName
router.get("/:shortName", courseController.getCourseByName);

// Register User
router.patch("/:id/register", authMiddleware, courseController.registerCourse);

// Update Course
router.put("/:id", authMiddleware, isAdminMiddleware, courseController.updateCourse);

// Delete Course
router.delete("/:id", authMiddleware, isAdminMiddleware, courseController.deleteCourse);

module.exports = router;
