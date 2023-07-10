const KoaRouter = require("@koa/router");
const {
  createShare,
  getShare,
  getTimeline,
  deleteTimeline,
  addTimeline,
  modifyTimeline,
  deleteDaily,
  modifyDaily
} = require("../controller/daily.controller");

const dailyRouter = new KoaRouter({ prefix: "/admin/daily" });

// 分享日常
dailyRouter.post("/createshare", createShare);
// 获取日常
dailyRouter.get("/getshare", getShare);
// 删除日常
dailyRouter.post("/deleteDaily", deleteDaily)
// 修改日常
dailyRouter.post("/modifydaily", modifyDaily)

// 获取时间轴
dailyRouter.get("/gettimeline", getTimeline);
// 删除时间轴
dailyRouter.post("/deltimeline", deleteTimeline);
// 新增时间轴
dailyRouter.post("/addtimeline", addTimeline);
// 修改时间轴
dailyRouter.post("/modifytimeline", modifyTimeline);

module.exports = dailyRouter;
