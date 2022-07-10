const express = require("express");
const router = express.Router();
const { resolve } = require("path");
const auth = require("../middleware/auth");

class carparksRouter {
  constructor(controller) {
    this.controller = controller;
  }
  router() {
    router.get(
      "/homepage",
      auth,
      this.controller.showHomepage.bind(this.controller)
    );

    return router;
  }
}
module.exports = carparksRouter;
