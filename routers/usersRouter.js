const express = require("express");
const router = express.Router();
const { resolve } = require("path");
const { auth, authSession } = require("../middleware/auth");
const multer = require("multer");
const { fileFilter } = require("../middleware/multer")
const storage = multer.memoryStorage()
const multerUpload = multer({ storage ,fileFilter });
// const multerUpload = multer({ dest: 'uploads/' });


class UsersRouter {
  constructor(controller) {
    this.controller = controller;
  }

  router() {
    router
      .get("/", (req, res) => {
        res.sendFile(resolve("dist", "main.html"));
      })
      .post("/signup", this.controller.signupUser.bind(this.controller))
      .post("/login", this.controller.loginUser.bind(this.controller))
      .get("/currentUser", this.controller.getCurrentUser.bind(this.controller))
      .get("/currentUserProfile", this.controller.getCurrentUserProfile.bind(this.controller))
      .post("/uploadAvatar",multerUpload.single("avatar"), this.controller.uploadAvatar.bind(this.controller))
      .post("/currentUserProfile", this.controller.editCurrentUserProfile.bind(this.controller))
      .post(
        "/logout",
        authSession,
        this.controller.logoutUser.bind(this.controller)
      );
    return router;
  }
}

module.exports = UsersRouter;
