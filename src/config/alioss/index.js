const {
  REGION,
  ACCESSKEYID,
  ACCESSKEYSECRET,
  BUCKET,
} = require("../server");
const OSS = require("ali-oss");

const store = new OSS({
  region: REGION,
  accessKeyId: ACCESSKEYID,
  accessKeySecret: ACCESSKEYSECRET,
  bucket: BUCKET,
});

module.exports =  store