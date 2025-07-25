const express = require('express');
const multer = require('multer');
const upload = multer();

const authMiddleware = require("../middlewares/auth");
const isAdminMiddleware = require("../middlewares/isAdmin");

const sessionController = require("../controllers/session");

const uploadImage = require("../middlewares/uploadImage");

const router = express.Router();

// Create Section
router.post("/:id/section", authMiddleware, isAdminMiddleware, sessionController.createSection);

// Create sessions
router.post("/:id/sessions", authMiddleware, isAdminMiddleware, upload.single("video"), uploadImage, sessionController.createSession);

// Get course sessions
router.get("/:id/sessions", sessionController.getSessions);

// Get sessions info
router.get("/:id/:sessionID", authMiddleware, sessionController.getSessionInfo)

// Delete sessions
router.delete("/:sessionID", authMiddleware, isAdminMiddleware, sessionController.deleteSession);

module.exports = router;