const path = require("path");
const fs = require("fs");
const {
  saveImgMessage,
  getPhotoAlbums,
  createPhotoAlbumSer,
  queryAlbumName,
  getAllPhoneSer,
} = require("../services/file.service");


class FileController {
  // 保存单张图片信息
  async uploadImgMessage(ctx, next) {
    const { albumId } = ctx.request.body;
    const httpUrl = ctx.uploadMessage.imgUrl;
    const httpsUrl = "https://" + httpUrl.split("://")[1];
    // 保存图片信息
    await saveImgMessage(ctx.uploadMessage.fileName, albumId, httpsUrl);
    ctx.uploadMessage.httpsUrl = httpsUrl;
    ctx.body = {
      code: 0,
      data: ctx.uploadMessage,
    };
  }
  // 保存多张图片信息
  async uploadMoreImgMessage(ctx, next) {
    const { albumId } = ctx.request.body;
    // const {album_name} = await queryAlbumName(albumId) // { id: 1, album_name: '生活' }
    // console.log(album_name);
    const result = await Promise.all(
      ctx.uploadMessage.map(async (item) => {
        const httpUrl = item.imgUrl;
        const httpsUrl = "https://" + httpUrl.split("://")[1];
        // 保存图片信息
        await saveImgMessage(item.fileName, albumId, httpsUrl);
        item.httpsUrl = httpsUrl;
        return item;
      })
    );
    ctx.body = {
      code: 0,
      data: result,
    };
  }
  // 获取相册列表
  async getPhotoAlbum(ctx, next) {
    const result = await getPhotoAlbums();
    ctx.body = {
      code: 0,
      photo_album: result,
    };
  }
  // 新建相册
  async createPhotoAlbum(ctx, next) {
    const { albumName } = ctx.request.body;
    const result = await createPhotoAlbumSer(albumName);
    console.log(result);
    ctx.body = {
      code: 0,
      result,
    };
  }

  // 获取所有图片
  async getAllPhone(ctx, next) {
    const result = await getAllPhoneSer();
    ctx.body = {
      code: 0,
      data: result,
    };
  }
}

module.exports = new FileController();
