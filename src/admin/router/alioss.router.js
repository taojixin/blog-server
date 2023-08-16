const KoaRouter = require("@koa/router");
// 图片处理
const multer = require("@koa/multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

const {
  uploadSingle,
  getAllObje,
  getAllPhoto,
  getOneObj,
  deletePhoto,
} = require("../controller/alioss.controller");

const aliossRouter = new KoaRouter({ prefix: "/admin" });

// 获取所有Object
aliossRouter.get("/photoalbums", getAllObje);
// 获取所有图片
aliossRouter.get("/images", getAllPhoto);
// 获取某个obj中图片
aliossRouter.post("/images/:albumName", getOneObj);
// 上传单个图片
aliossRouter.post("/image/upload", upload.single("image"), uploadSingle);
// 删除某个图片
aliossRouter.post("/image/delete", deletePhoto);

module.exports = aliossRouter;
