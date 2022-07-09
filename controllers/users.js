const Base = require("./base");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class Users extends Base {
  constructor(model) {
    super(model);
  }

  async signupUser(req, res) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.passord, 10);
      console.log("hashedPassword:", hashedPassword);
      const newUser = {
        name: req.body.name,
        email: req.body.email,
        passord: hashedPassword,
      };

      await this.model.create(newUser);
      res.send("User account created!");
    } catch (error) {
      console.log("Signup error: ", error);
      res.status(500).send();
    }
  }

  async loginUser(req, res) {
    try {
      const user = await this.model.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (!user) {
        alert("User is not found, please sign up first!");
        return res.status(400).send("User is not found!");
      }

      if (await bcrypt.compare(req.body.passord, user.passord)) {
        res.send("Login success");
      }
    } catch (error) {
      console.log("Error message: ", error);
      res.send("Unauthoried user");
    }
  }
}

module.exports = Users;
