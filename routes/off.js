const express = require("express");
const isAdminMiddleware = require("../middlewares/isAdmin");
const authMiddleware = require("../middlewares/auth");
const offController = require("../controllers/off");

const router = express.Router();

// Create off
router.post("/", authMiddleware, isAdminMiddleware, offController.createOff);

// Get all offs
router.get("/", authMiddleware, isAdminMiddleware, offController.getAllOff);

// Get one off
router.get("/:id", authMiddleware, isAdminMiddleware, offController.getOneOff);

// Delete off
router.delete("/:id", authMiddleware, isAdminMiddleware, offController.deleteOff);

// Use off code for a specific course
router.post("/use/:courseId", authMiddleware, offController.useOffCode);

// Set discount on all courses
router.post("/set-on-all", authMiddleware, isAdminMiddleware, offController.setOnAll);

module.exports = router;
