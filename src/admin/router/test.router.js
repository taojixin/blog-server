const KoaRouter = require("@koa/router");


// 图片处理
const multer = require("@koa/multer");
// 配置 multer 中间件，指定上传文件的保存路径和文件名
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });





const testRouter = new KoaRouter({ prefix: "/test" });

testRouter.post("/loginTest",upload.single("image"), (ctx, next) => {
  console.log(ctx.request.body.name);
  ctx.body = ctx.request.body
});

module.exports = testRouter;