const Base = require("./base");
const auth = require("../middleware/auth");

class Carparks extends Base {
  constructor(model) {
    super(model);
  }
}

module.exports = Carparks;
