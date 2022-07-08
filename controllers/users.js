const Base = require("./base");

class Users extends Base {
  constructor(model) {
    super(model);
  }

  showHome(req, res) {
    if (req.isUserLoggedIn) {
      res.redirect("/dashboard");
    }
    res.render("home");
  }
}

module.exports = Users;
