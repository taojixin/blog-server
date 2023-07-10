const path = require("path");
const fs = require("fs");
// picgo
const { PicGo } = require("picgo");
// picgo配置文件路径
const picgo = new PicGo(path.join(__dirname, "../../config/pcigo/index.json"));

// 对图片进行重命名
const renameImage = async (ctx, next) => {
  const { imgName } = ctx.request.body;
  // 如果没有传递该imgName参数，或者该参数为空、空格则不需要重命名
  if (!imgName || imgName.trim().length === 0) {
    ctx.rename = ctx.request.file.originalname
    return next();
  }
  // 获取图片后缀
  const result = ctx.request.file.originalname.split(".");
  const imgExtensiton = "." + result[1];
  const pathImage = path.join(
    __dirname,
    "../../../uploads",
    ctx.request.file.originalname
  );
  const newPathImage = path.join(
    __dirname,
    "../../../uploads",
    imgName + imgExtensiton
  );
  // 将重命名后的图片名称传递给下一个中间件
  ctx.rename = imgName + imgExtensiton;
  // 重命名 ()
  fs.renameSync(pathImage, newPathImage, (err) => {
    if (err) {
      return (ctx.body = {
        code: -1,
        message: "上传失败！",
      });
    }
  });
  await next();
};
// 上传图片到阿里云存储
const saveImage = async (ctx, next) => {
  // 上传的图片保存在本地的路径
  const imgPath = path.join(__dirname, "../../../uploads", ctx.rename);
  const filePath = [imgPath];
  // picgo上传图片 upload需要接受一个数组
  await picgo
    .upload(filePath)
    .then((result) => {
      // 上传完之后再将这个本地图片删除
      fs.unlinkSync(imgPath, (err) => {
        if (err) throw err;
        console.log("文件已成功删除");
      });
      ctx.uploadMessage = result[0];
    })
    .catch((err) => {
      console.log(err);
    });
  await next();
};
// 上传多张图片到阿里云存储
const saveMoreImages = async (ctx, next) => {
  const imgFiles = ctx.request.files;
  // 上传的图片保存在本地的路径
  let filePath = [];
  imgFiles.map((item) => {
    const imgPath = path.join(__dirname, "../../../uploads", item.originalname);
    filePath.push(imgPath);
  });
  // picgo上传图片 upload需要接受一个数组
  await picgo
    .upload(filePath)
    .then((result) => {
      filePath.map((item) => {
        // 上传完之后再将这个本地图片删除
        fs.unlinkSync(item, (err) => {
          if (err) throw err;
          console.log("文件已成功删除");
        });
      });
      ctx.uploadMessage = result;
    })
    .catch((err) => {
      console.log(err);
    });
  await next();
};

module.exports = {
  renameImage,
  saveImage,
  saveMoreImages,
};
