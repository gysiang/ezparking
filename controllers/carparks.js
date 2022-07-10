const Base = require("./base");
const auth = require("../middleware/auth");
const axios = require("axios");

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
      const getCarparksData = await axios.get(
        "https://www.ura.gov.sg/uraDataService/invokeUraDS?service=Car_Park_Availability",
        {
          headers: {
            AccessKey: process.env.URA_ACCESS_KEY,
            Token: process.env.URA_TOKEN,
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
}

module.exports = Carparks;
