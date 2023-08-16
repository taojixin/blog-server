const KoaRouter = require("@koa/router");
const {
  createShare,
  getShare,
  getTimeline,
  deleteTimeline,
  addTimeline,
  modifyTimeline,
  deleteDaily,
  modifyDaily,
} = require("../controller/daily.controller");

const dailyRouter = new KoaRouter({ prefix: "/admin" });

// 分享日常
dailyRouter.post("/daily/create", createShare);
// 获取日常
dailyRouter.get("/dailies", getShare);
// 删除日常
dailyRouter.post("/daily/delete", deleteDaily);
// 修改日常
dailyRouter.post("/daily/modify", modifyDaily);

// 获取时间轴
dailyRouter.get("/timeline/list", getTimeline);
// 删除时间轴
dailyRouter.post("/timeline/delete", deleteTimeline);
// 新增时间轴
dailyRouter.post("/timeline/create", addTimeline);
// 修改时间轴
dailyRouter.post("/timeline/modify", modifyTimeline);

module.exports = dailyRouter;
