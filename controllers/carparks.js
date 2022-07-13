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

      const getCarparksData = await axios.get(
        "https://www.ura.gov.sg/uraDataService/invokeUraDS?service=Car_Park_Availability",
        {
          headers: {
            AccessKey: process.env.URA_ACCESS_KEY,
            Token: URA_TOKEN,
          },
        }
      );
      const data = getCarparksData.data.Result;
      return res.json({
        value: "carpark data received!",
        carparks: data,
      });
    } catch (error) {
      res.status(500).json({ error: error.mesage });
    }
  }

  async addCarpark(req, res) {
    const { userId, carparkId } = req.body;
    try {
      const carpark = await this.model.findByPk(carparkId);
      const user = await db.User.findByPk(userId);
      await carpark.addUser(user);
      res.json("added favoriate carpark");
    } catch (error) {
      res.status(500).json({ error: error.mesage });
    }
  }

  async getFavoriteCarparks(req, res) {
    try {
      const { userId } = req.body;
      console.log(userId);
      const favoriateCarparks = await this.model.getUserCarparks({
        where: {
          userId: userId,
        },
      });
      console.log(favoriateCarparks);
    } catch (error) {
      res.status(500).json({ error: error.mesage });
    }
  }
}

module.exports = Carparks;
