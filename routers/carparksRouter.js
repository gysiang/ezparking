const express = require("express");
const router = express.Router();
const { resolve } = require("path");
const auth = require("../middleware/auth");

class CarparksRouter {
  constructor(controller) {
    this.controller = controller;
  }
  router() {
    router
      .get(
        "/homepage",
        auth,
        this.controller.showHomepage.bind(this.controller)
      )
      .get(
        "/apiKey",
        this.controller.getGoogleApiKey.bind(this.controller)
      )
      .get(
        "/getCarparks",
        auth,
        this.controller.getCarparksInfo.bind(this.controller)
      )
      .post("/addCarpark", this.controller.addCarpark.bind(this.controller));

    return router;
  }
}
module.exports = CarparksRouter;
