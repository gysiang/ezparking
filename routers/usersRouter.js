const express = require("express");
const router = express.Router();
const { resolve } = require("path");

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
      .post(
        "/tokenValidation",
        this.controller.tokenValidation.bind(this.controller)
      );
    // router.get("/logout", this.controller.logoutUser.bind(this.controller));
    return router;
  }
}

module.exports = UsersRouter;
