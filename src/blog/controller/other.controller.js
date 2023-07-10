const axios = require("axios");

class OtherController {
  async getClientIp(ctx, next) {
    // console.log(ctx.request.ip);
    const result = await axios.post(
      "https://apis.map.qq.com/ws/location/v1/ip",
      {
        key: process.env.IP_POSITIONING_KEY,
        ip: "::ffff:36.98.229.235",
      }
    );
    // console.log(result.data);
    ctx.body = {
      result: result.data,
    };
  }
}

module.exports = new OtherController();
