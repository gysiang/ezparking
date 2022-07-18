const Base = require("./base");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const s3Upload = require("../service/s3Service")

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
        console.log(process.env.PUBLIC_GOOGLE_MAPS_API_KEY);
        res.cookie("plopplop", token, { httpOnly: true });
        res.cookie("userId", user.id, { httpOnly: true });
        res.cookie("APIKEY", process.env.PUBLIC_GOOGLE_MAPS_API_KEY);
        res.json({
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
    console.log("getting current user");
    const token = req.cookies.plopplop;
    const userId = req.cookies.userId;
    if (token) {
      console.log(process.env.PUBLIC_GOOGLE_MAPS_API_KEY);
      res.json({
        isLoggedIn: true,
        userId: userId,
        APIKEY: process.env.PUBLIC_GOOGLE_MAPS_API_KEY,
      });
      console.log("setting user cookies");
    } else {
      res.json({ isLoggedIn: false });
    }
    return;
  }

  async uploadAvatar(req,res,error){
    if (error instanceof multer.MulterError){
      if (error.code === "LIMIT_UNEXPECTED_FILE"){
        return res.json({
          message: "File must be of image type",
        })
      }
    }
    console.log(req.file);
    const file = req.file;
    const result = await s3Upload(file)
    res.json({ status: "success", result });
  } 

   async getCurrentUserProfile(req, res) {
     console.log(req.cookies.userId)
    try {
      const user = await this.model.findOne({
        where: {
          id: Number(req.cookies.userId)
        },
      });

      res.json({
        user: {
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          },
        });
      } catch (error) {
      console.log("Error message: ", error);
      return res.send("Error in retriving user profile");
    }
  }

  // route in progress
  async editCurrentUserProfile(req, res) {
    console.log(request.file);

    const { name, email,password,avatar } = req.body;

    try {
      const user = await this.model.findOne({
        where: {
          userId: Number(req.cookies.userId)
        }, 
      });
      user.name = name;
      user.email = email;
      user.password = password;
      user.avatar = avatar;
      await user.save()
      response.send('success');
      } catch (error) {
      console.log("Error message: ", error);
      return res.send("Failed");
    }
  }


  logoutUser(req, res) {
    res.clearCookie("plopplop", "userId", "APIKEY");
  }
}

module.exports = Users;
