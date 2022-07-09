const Base = require("./base");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const { async } = require("regenerator-runtime");

class Users extends Base {
  constructor(model) {
    super(model);
  }

  async signupUser(req, res) {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ msg: "Need to fill all field!" });
      }

      const existingUser = await this.model.findOne({
        where: {
          email: email,
        },
      });

      if (existingUser) {
        return res
          .status(400)
          .json({ msg: "User already registered with this email." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("hashedPassword:", hashedPassword);
      const newUser = {
        name: name,
        email: email,
        password: hashedPassword,
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

      if (await bcrypt.compare(req.body.passord, user.password)) {
        const token = jwt.sign({ id: user.id }, process.env.JTW_SECRET);
        res.json({
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        });
      }
    } catch (error) {
      console.log("Error message: ", error);
      return res.send("Unauthoried user");
    }
  }

  async tokenValidation(req, res) {
    try {
      const token = req.header("auth-token");
      if (!token) return res.json(false);

      const verified = jwt.verify(token, process.env.JTW_SECRET);
      if (!verified) return res.json(false);

      const user = await this.model.findById(verified.id);
      if (!user) return res.json(false);

      return res.json(true);
    } catch (error) {
      res.status(500).json({ error: error.mesage });
    }
  }
}
module.exports = Users;
