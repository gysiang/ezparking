const Base = require("./base");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
        return res.status(400).json({ msg: "User signup error." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
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

      const match = await bcrypt.compare(req.body.password, user.password);
      if (match) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: "24 hours",
        });
        res.cookie("plopplop", token, { httpOnly: true });
        res.json({
          //token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        });
      }
    } catch (error) {
      console.log("Error message: ", error);
      return res.send("Unauthorized user");
    }
  }

  getCurrentUser(req, res) {
    const token = req.cookies.plopplop;
    if (token) {
      res.json({ isLoggedIn: true });
    } else {
      res.json({ isLoggedIn: false });
    }
    return;
  }
}

module.exports = Users;
