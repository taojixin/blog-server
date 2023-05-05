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

const saveImage = async (ctx, next) => {
  console.log("fds");
  // 上传的图片保存到本地的路径
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
      ctx.uploadMessage = result[0]
    })
    .catch((err) => {
      console.log(err);
    });
  await next();
};

module.exports = {
  renameImage,
  saveImage,
};
