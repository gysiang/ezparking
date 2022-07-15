const express = require("express");
const router = express.Router();
const { resolve } = require("path");
const { auth, authSession } = require("../middleware/auth");

class CarparksRouter {
  constructor(controller) {
    this.controller = controller;
  }
  router() {
    router
      .get(
        "/homepage",
        authSession,
        this.controller.showHomepage.bind(this.controller)
      )
      // .get(
      //   "/session/getCarparks",
      //   authSession,
      //   this.controller.getCarparksInfo.bind(this.controller)
      // )
      .get("/apiKey", this.controller.getGoogleApiKey.bind(this.controller))
      .get(
        "/getCarparks",
        authSession,
        this.controller.getCarparksInfo.bind(this.controller)
      )
      .post(
        "/addCarpark",
        authSession,
        this.controller.addCarpark.bind(this.controller)
      )
      .get(
        "/favoriteCarparks",
        authSession,
        this.controller.getFavoriteCarparks.bind(this.controller)
      );

    return router;
  }
}
module.exports = CarparksRouter;
