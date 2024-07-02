const path = require("path");
const fs = require("fs");

const store = require("../../config/alioss/index");

class aliossController {
  // 获取所有Obj
  async getAllObje(ctx, next) {
    // const result = await store.listV2({prefix: 'test/', delimiter: '/'})
    // const result = await store.delete("test/是.jpg")
    // const result = await store.getObjectUrl("test/123.jpg");
    // const result = await store.listBuckets()
    // const result = await store.delete("asdd/")
    // const result = await store.list({prefix: 'test/',delimiter: "/"})
    const result = await store.list({ delimiter: "/" });
    ctx.body = {
      code: 0,
      data: {
        objDirectory: result.prefixes,
      },
    };
  }
  // 获取所有图片
  async getAllPhoto(ctx, next) {
    const result = await store.list();
    console.log(result);
    const { prefixes } = await store.list({ delimiter: "/" });
    let allPhotos = [];
    await Promise.all(
      prefixes.map(async (item, index) => {
        const result = await store.list({ prefix: item });
        const photoList = result.objects.map((item) => {
          return {
            name: item.name,
            httpsUrl: "https://libertys.oss-cn-chengdu.aliyuncs.com/" + item.name,
            url: item.url,
          };
        });
        allPhotos.push({
          id: index,
          objName: item,
          photoList,
        });
      })
    );
    ctx.body = {
      code: 0,
      data: {
        allPhotos,
      },
    };
  }
  // 获取某个obj中图片
  async getOneObj(ctx, next) {
    const { albumName } = ctx.params;
    const result = await store.list({ prefix: albumName });
    const res = result.objects.map((item) => {
      return {
        name: item.name,
        httpsUrl: "https://libertys.oss-cn-chengdu.aliyuncs.com" + item.name,
        url: item.url,
      };
    });
    ctx.body = {
      code: 0,
      data: {
        albumName,
        photoList: res,
      },
    };
  }
  // 上传单个图片
  async uploadSingle(ctx, next) {
    // console.log(ctx.request.file);
    const pathImage = path.join(
      __dirname,
      "../../../uploads",
      ctx.request.file.originalname
    );
    let result;
    await store
      .put(`test/${ctx.request.file.originalname}`, pathImage)
      .then((res) => {
        fs.unlinkSync(pathImage, (err) => {
          if (err) throw err;
        });
        result = res;
      });
    ctx.body = {
      code: 0,
      data: { result },
    };
  }
  // 删除某个图片
  async deletePhoto(ctx, next) {
    const { imgObjName } = ctx.request.body;
    console.log(imgObjName);
    const result = await store.delete(imgObjName);
    ctx.body = {
      code: 0,
      data: result,
    };
  }
}

module.exports = new aliossController();
