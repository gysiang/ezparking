const express = require("express");
const router = express.Router();
const { resolve } = require("path");
const { auth, authSession } = require("../middleware/auth");

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
      .post(
        "/logout",
        authSession,
        this.controller.logoutUser.bind(this.controller)
      );
    return router;
  }
}

module.exports = UsersRouter;
