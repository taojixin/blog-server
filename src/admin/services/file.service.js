const connection = require("../../app/database")

class FileService {
  async saveImgMessage(imgName, imgLabel, httpsUrl) {
    const statement = "insert into images (title, sort, url) VALUES (?, ?, ?);"
    const result = await connection.execute(statement, [imgName, imgLabel, httpsUrl])
    return result[0]
  }

  async getImageLabels() {
    const statement = "select sort from images;"
    const result = await connection.execute(statement)
    return result[0]
  }
}

module.exports = new FileService()