const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const profileController = require("../controllers/profile");
const { ensureAuth, ensureGuest } = require("../middleware/auth");



//Post Routes - simplified for now
router.get("/:id", ensureAuth, profileController.getPost);

router.post("/update", upload.single("file"), profileController.updateProfile);

router.put("/likePost/:id", profileController.likePost);

router.delete("/deleteInvitation/:id", profileController.deleteInvitation);

module.exports = router;
