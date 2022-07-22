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
      const { name, email, password, avatar } = req.body;
      // if (!name || !email || !password) {
      //   return res.status(400).json({ msg: "Need to fill all field!" });
      // }

      const existingUser = await this.model.findOne({
        where: {
          email: email,
        },
      });

      if (existingUser) {
        return res.json({ msg: "User signup error." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        name: name,
        email: email,
        password: hashedPassword,
        avatar: avatar,
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

      console.log('user email:', user)

      if (!user) {
        return res.json({ msg: "user is not found" });
      } 

      const match = await bcrypt.compare(req.body.password, user.password);
      if (match) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: "24 hours",
        });
        res.cookie("plopplop", token, { httpOnly: true });
        res.cookie("userId", user.id, { httpOnly: true });
        res.cookie("APIKEY", process.env.PUBLIC_GOOGLE_MAPS_API_KEY, { httpOnly: true });
        return res.json({
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
          },
        });
      } else {
        return res.json({ msg: "wrong password" });
      }
        
    } catch (error) {
      console.log("Error message: ", error);
      return res.json({ msg: "unauthorized user" });
    }
  }

  getCurrentUser(req, res) {
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

  async updateUserAvatar(req,res) {
    console.log(req.body)
    const {avatar} = req.body;
    try {
    await this.model.update(
      {avatar:avatar},
      {where: {id: req.cookies.userId}})
    res.json({ status: "success"})
    } catch (error) {
      console.log("Error message: ", error);
    }
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

  async editCurrentUserProfile(req, res) {

    const { name, email,password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
    await this.model.update(
      {
        name,
        email,
        password: hashedPassword
      },
      {where: 
        {id: req.cookies.userId}
      })
      res.send('success');
      } catch (error) {
      console.log("Error message: ", error);
      return res.send("Failed");
    }
  }

  logoutUser(req, res) {
    if(req.userId){
      console.log("userId: ", req.userId)
      res.clearCookie("plopplop").clearCookie("APIKEY").clearCookie("userId");
      return res.json({msg: 'logging you out'})
    } else {
      return res.json({msg: 'no user to log out!'})
    }
  }
}

module.exports = Users;
