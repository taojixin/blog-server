# API接口文档统一说明

* 接口基准地址：
* * **blog**：http://localhost:8000/blog/
  * **admin**：http://localhost:8000/admin/
* 服务端已开启CORS跨域请求
* 数据返回格式统一使用JSON



# 展示端API接口文档

## 留言

### 1.发表留言

* 请求路径：/message/makemsg
* 请求方式：post
* 请求参数：

| 参数名  | 参数说明             | 备注                             |
| ------- | -------------------- | -------------------------------- |
| name    | 昵称                 | not null                         |
| content | 留言内容             | not null                         |
| email   | 邮箱地址             | 可选                             |
| reply   | 是否为回复别人的留言 | Boolean                          |
| replyId | 回复的那个留言的id   | number，reply为true时该值默认为0 |

