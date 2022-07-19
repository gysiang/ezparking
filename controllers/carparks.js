const Base = require("./base");
const auth = require("../middleware/auth");
const axios = require("axios");
const db = require("../models");

class Carparks extends Base {
  constructor(model) {
    super(model);
  }
  async showHomepage(req, res) {
    try {
      return res.json({
        value: "This is homepage. Carpark map as below: ",
        ura_accessKey: process.env.URA_ACCESS_KEY,
        ura_token: process.env.URA_TOKEN,
      });
    } catch (error) {
      res.status(500).json({ error: error.mesage });
    }
  }

  async getCarparksInfo(req, res) {
    try {
      const getToken = await axios.get(
        `https://www.ura.gov.sg/uraDataService/getTokenForm?txtAcessKey=${process.env.URA_ACCESS_KEY}`
      );
      let result = getToken.data.trim().split(/\s+/);
      let tokenStr = result.filter((el) => el.includes("value"));
      let idxArr = [];
      for (let i = 0; i < tokenStr[0].length; i += 1) {
        if (tokenStr[0][i] === '"') {
          idxArr.push(i);
        }
      }
      let URA_TOKEN = tokenStr[0].slice(idxArr[0] + 1, idxArr[1]);
      const Headers = {
        headers: {
          AccessKey: process.env.URA_ACCESS_KEY,
          Token: URA_TOKEN,
        },
      };

      // Fetch available carpark info:
      const getCarparksData = await axios.get(
        "https://www.ura.gov.sg/uraDataService/invokeUraDS?service=Car_Park_Availability",
        Headers
      );
      const availableCarparksdata = getCarparksData.data.Result;

      // Fetch carpark details:
      const getCarparksDetails = await axios.get(
        "https://www.ura.gov.sg/uraDataService/invokeUraDS?service=Car_Park_Details",
        Headers
      );
      const carparkDetails = getCarparksDetails.data.Result;

      availableCarparksdata.map(async (carpark) => {
        const carparkInfo = {};
        carparkDetails.filter((c) => {
          if (c.ppCode === carpark.carparkNo) {
            carparkInfo.carparkNo = carpark.carparkNo;
            carparkInfo.carparkName = c.ppName;
            carparkInfo.lotType = carpark.lotType;
          }
        });
        const existingC = await this.model.findAll({
          where: {
            carparkNo: carpark.carparkNo,
            lotType: carpark.lotType,
          },
        });
        if (!existingC.length) {
          await this.model.create(carparkInfo);
        }
      });

      return res.json({
        value: "carpark data received!",
        carparks: availableCarparksdata,
      });
    } catch (error) {
      res.status(500).json({ error: error.mesage });
    }
  }

  async addCarpark(req, res) {
    const { userId, carparkNo, lotType, carparkName } = req.body;
    // console.log("carpark name: ", carparkName);
    try {
      // Find carpark from DB
      const carpark = await this.model.findOne({
        where: {
          carparkNo: carparkNo,
          lotType: lotType,
        },
      });
      const user = await db.User.findByPk(userId);

      console.log("carpark found: ", carpark);
      // If carpark is not in DB
      if (!carpark) {
        let newCarpark = {
          carparkNo: carparkNo,
          lotType: lotType,
          carparkName: carparkName,
        };

        let newCP = await this.model.create(newCarpark);
        await newCP.addUser(user);
        console.log("new carpark:", newCP.dataValues);
        let newFavoriteCarpark = newCP.dataValues;
        res.json({ newFavoriteCarpark });
        return;
      } else {
        // Check if user already added this carpark as favorite carpark
        let existingUserCarpark = await carpark.getUsers({
          through: "user_carparks",
        });
        console.log("existing carpark?: ", existingUserCarpark);
        if (existingUserCarpark.length === 0) {
          await carpark.addUser(user);
          console.log("new fav cp: ", carpark);
          let newFavoriteCarpark = carpark.dataValues;
          res.json({ newFavoriteCarpark });
          return;
        } else {
          res.send("Already added.");
          return;
        }
      }
    } catch (error) {
      res.status(500).json({ error: error.mesage });
    }
  }

  async getFavoriteCarparks(req, res) {
    const userId = req.cookies.userId;
    try {
      const user = await db.User.findByPk(userId);
      const favoriteCarparks = await user.getCarparks({
        through: "user_carparks",
      });
      res.json({ favoriteCarparks });
    } catch (error) {
      res.status(500).json({ error: error.mesage });
    }
  }
}

module.exports = Carparks;
