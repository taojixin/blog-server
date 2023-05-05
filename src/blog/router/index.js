const fs = require("fs");

function registerRouters(app) {
  const filesBlog = fs.readdirSync(__dirname);
  for (const file of filesBlog) {
    if (!file.endsWith(".router.js")) continue;
    const router = require(`./${file}`);
    app.use(router.routes());
    app.use(router.allowedMethods());
  }
}

module.exports = registerRouters