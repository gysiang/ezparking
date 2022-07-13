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
        "/getCarparks",
        auth,
        this.controller.getCarparksInfo.bind(this.controller)
      )
      .post(
        "/addCarpark",
        auth,
        this.controller.addCarpark.bind(this.controller)
      )
      .get(
        "/favoriteCarparks",
        auth,
        this.controller.getFavoriteCarparks.bind(this.controller)
      );

    return router;
  }
}
module.exports = CarparksRouter;
