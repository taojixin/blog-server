const KoaRouter = require("@koa/router");
const { saveImage, renameImage } = require("../middleware/file.middleware");
const { uploadImgMessage,getImgLabels } = require("../controller/file.controller");

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

// 上传图片
fileRouter.post("/uploadimg", upload.single("image"), renameImage, saveImage, uploadImgMessage);
// 查询图片标签
fileRouter.get("/imglabels", getImgLabels)



module.exports = fileRouter;
