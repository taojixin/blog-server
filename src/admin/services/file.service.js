const connection = require("../../app/database")

class FileService {
  // 保存图片信息
  async saveImgMessage(imgName, albumId, httpsUrl) {
    const statement = "insert into images (title, album_id, url) VALUES (?, ?, ?);"
    const result = await connection.execute(statement, [imgName, albumId, httpsUrl])
    return result[0]
  }

  // 获取相册列表
  async getPhotoAlbums() {
    const statement = "select * from photo_album;"
    const result = await connection.execute(statement)
    return result[0]
  }

  // 新建相册
  async createPhotoAlbumSer(albumName) {
    const statement = "insert into photo_album (album_name) values (?) ;"
    const result = await connection.execute(statement, [albumName])
    return result[0]
  }

  // 查询相册信息
  async queryAlbumName(albumId) {
    const statement = "select * from photo_album where id = ?;"
    const result = await connection.execute(statement, [albumId])
    return result[0][0]
  }

  // 获取所有照片
  async getAllPhoneSer() {
    const statement1 = "select * from photo_album;"
    const [result1] = await connection.execute(statement1)
    const statement2 = "select * from images where album_id = ?;"
    let result2 = []
    await Promise.all(
      result1.map(async item => {
        let itemObj = {}
        const [res] = await connection.execute(statement2, [item.id])
        itemObj.albumName = item.album_name
        itemObj.imgArr = res
        result2.push(itemObj)
      })
    )
    return result2
  }
}

module.exports = new FileService()