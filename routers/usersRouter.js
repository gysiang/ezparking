const express = require("express");
const router = express.Router();

class UsersRouter {
  constructor(controller) {
    this.controller = controller;
  }

  router() {
    router.get("/", this.controller.showHome.bind(this.controller));
    // .post("/signup", this.controller.addUser.bind(this.controller))
    // .post("/login", this.controller.loginUser.bind(this.controller))
    // router.get("/logout", this.controller.logoutUser.bind(this.controller));
    return router;
  }
}

module.exports = UsersRouter;
