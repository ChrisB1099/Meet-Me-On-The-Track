const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const profileController = require("../controllers/profile");
const upload = require("../middleware/multer");
const tracklocationsController = require("../controllers/tracklocations");
// const resourcesController = require("../controllers/resources");
const invitationController = require("../controllers/invitation");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/profile", ensureAuth, profileController.getProfile);
router.get("/runners", ensureAuth, profileController.getRunners);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup",  authController.getSignup );
router.post("/signup", upload.single("file"), authController.postSignup);
router.get("/homepage", homeController.getIndex);
router.get("/tracklocations",tracklocationsController.getIndex);
// router.get("/resources", resourcesController.getIndex);
router.get("/invite/:userId", ensureAuth, invitationController.getInvite);



module.exports = router;
