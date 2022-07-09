const Base = require("./base");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const dotenv = require("dotenv");
dotenv.config();

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

      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("hashedPassword:", hashedPassword);
      const newUser = {
        name: name,
        email: email,
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
}
module.exports = Users;
