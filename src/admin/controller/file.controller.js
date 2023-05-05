const { saveImgMessage, getImageLabels } = require("../services/file.service");

class FileController {
  // 保存图片信息
  async uploadImgMessage(ctx, next) { 
    const { imgLabel } = ctx.request.body;
    const httpUrl = ctx.uploadMessage.imgUrl
    const httpsUrl = "https://" + httpUrl.split("://")[1]
    // 保存图片信息
    await saveImgMessage(ctx.uploadMessage.fileName, imgLabel, httpsUrl)
    ctx.uploadMessage.httpsUrl = httpsUrl
    ctx.body = {
      code: 0,
      data: ctx.uploadMessage
    }
  }

  // 获取图片标签
  async getImgLabels(ctx, next) {
    const result = await getImageLabels()
    ctx.body = {
      code: 0,
      labels: result
    }
  }
}


module.exports = new FileController()