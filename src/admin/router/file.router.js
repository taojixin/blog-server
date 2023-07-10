const KoaRouter = require("@koa/router");
const {
  saveImage,
  renameImage,
  saveMoreImages,
} = require("../middleware/file.middleware");
const {
  uploadImgMessage,
  getPhotoAlbum,
  uploadMoreImgMessage,
  createPhotoAlbum,
  getAllPhone,
} = require("../controller/file.controller");

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

const fileRouter = new KoaRouter({ prefix: "/admin/file" });

// 上传单张图片
fileRouter.post(
  "/uploadimg",
  upload.single("image"),
  renameImage,
  saveImage,
  uploadImgMessage
);
// 上传多张图片
fileRouter.post(
  "/uploadmore",
  upload.array("images", 10),
  saveMoreImages,
  uploadMoreImgMessage
);
// 查询相册列表
fileRouter.get("/phonealbum", getPhotoAlbum);
// 创建相册
fileRouter.post("/createphonealbum", createPhotoAlbum);
// 获取图片列表
fileRouter.get("/getallphone", getAllPhone);

// 文件上传test
fileRouter.post('/project', upload.single("image"), (ctx, next) => {
  const imgFiles = ctx.request.file
  console.log(imgFiles);
  console.log(ctx.request.body);
  const { imageName } = ctx.request.body;
  console.log(imageName);
  ctx.body = {
    code: 0,
    data: {

    },
    mesage: "上传成功"
  }
})

module.exports = fileRouter;
