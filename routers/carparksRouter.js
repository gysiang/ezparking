const express = require("express");
const router = express.Router();

class carparksRouter {
  constructor(controller) {
    this.controller = controller;
  }
  router() {
    return router;
  }
}
module.exports = carparksRouter;
