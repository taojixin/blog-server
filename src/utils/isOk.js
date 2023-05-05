
// 该函数用于判断数据是否满足 不为空 且 小于最大允许长度
// 该函数传入一个对象，对象的key为需要判断的属性，对象的value为运行的最大长度
function isOk(strObj) {
  let result = []
  for (let key in strObj) {
    let strValue = key.trim()
    if (strValue.length === 0 || strValue.length > strObj[key]) {
      result.push(false)
    } else {
      result.push(true)
    }
  }
  if (result.indexOf(false) === -1) {
    return true
  }
  return false
}

module.exports = {
  isOk
}