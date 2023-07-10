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

const aliossRouter = new KoaRouter({ prefix: "/admin/alioss" });

// 获取所有Object
aliossRouter.get("/getallobj", getAllObje);
// 获取所有图片
aliossRouter.get("/getallphoto", getAllPhoto);
// 获取某个obj中图片
aliossRouter.post("/getOneObj", getOneObj);
// 上传单个图片
aliossRouter.post("/uploadsingle", upload.single("image"), uploadSingle);
// 删除某个图片
aliossRouter.post("/deletePhoto", deletePhoto);

module.exports = aliossRouter;
