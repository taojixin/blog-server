# API接口文档统一说明

* 接口基准地址：
* * **blog**：http://localhost:8001/blog
  * **admin**：http://localhost:8001/admin
* 服务端已开启CORS跨域请求
* 数据返回格式统一使用JSON：返回格式如下

```json
{
    code: ***,
    message: ***,
    data: {***}
}
```





# 展示端API接口文档

## 一、文章

### 1.获取文章列表

* 请求路径：
* 请求方式：
* 请求参数：

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
|        |          |      |

* 响应：

### 2.获取文章评论

* 请求路径：/article/comments
* 请求方式：post
* 请求参数：

| 参数名    | 参数说明 | 备注 |
| --------- | -------- | ---- |
| articleId |          |      |
| count     |          |      |
| offset    |          |      |

* 响应：

### 3.对文章进行评论

* 请求路径：/article/comment/create
* 请求方式：post
* 请求参数：

| 参数名    | 参数说明 | 备注 |
| --------- | -------- | ---- |
| name      |          |      |
| qq        |          |      |
| content   |          |      |
| articleId |          |      |
| reply     |          |      |
| replyId   |          |      |

* 响应：

### 3.对文章进行评论

* 请求路径：/labels
* 请求方式：get
* 请求参数：

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
|        |          |      |

* 响应：

## 二、留言

### 1.发表留言

* 请求路径：/message/list
* 请求方式：post
* 请求参数：

| 参数名  | 参数说明             | 备注                             |
| ------- | -------------------- | -------------------------------- |
| name    | 昵称                 | not null                         |
| content | 留言内容             | not null                         |
| email   | 邮箱地址             | 可选                             |
| reply   | 是否为回复别人的留言 | Boolean                          |
| replyId | 回复的那个留言的id   | number，reply为true时该值默认为0 |

### 2.进行留言

* 请求路径：/message/create
* 请求方式：post
* 请求参数：

| 参数名  | 参数说明 | 备注 |
| ------- | -------- | ---- |
| name    |          |      |
| content |          |      |
| qq      |          |      |
| reply   |          |      |
| replyId |          |      |

* 响应：

# 后台管理系统接口文档

> 注：除登录接口外，其余接口均需在请求头中携带字段名为**authorization**的身份验证信息**toke**。

## 一、登录

### 1.登录

* 请求路径：/login
* 请求方式：get
* 请求参数：

| 参数名   | 参数说明 | 备注 |
| -------- | -------- | ---- |
| name     | 登录名   |      |
| password | 密码     |      |



## 二、文章相关

### 1.获取文章列表

* 请求路径：/articles?count=20&offset=0
* 请求方式：get
* 请求参数：

| 参数名 | 参数说明             | 备注              |
| ------ | -------------------- | ----------------- |
| count  | 页                   |                   |
| offset | 偏移量（一页多少个） | 默认all，查询全部 |

* 响应：

```json

```

### 2.创建文章

* 请求路径：/article/create
* 请求方式：post
* 请求参数：

| 参数名      | 参数说明 | 备注 |
| ----------- | -------- | ---- |
| title       | 文章名称 |      |
| content     | 文章内容 |      |
| description | 文章描述 |      |
| labelArr    | 文章标签 | 数组 |

* 响应：

### 3.删除文章

* 请求路径：/article/delete
* 请求方式：post
* 请求参数：

| 参数名    | 参数说明 | 备注 |
| --------- | -------- | ---- |
| articleId | 文章id   |      |

* 响应：

### 4.修改文章

* 请求路径：/article/modify
* 请求方式：post
* 请求参数：

| 参数名      | 参数说明 | 备注 |
| ----------- | -------- | ---- |
| articleId   |          |      |
| title       |          |      |
| content     |          |      |
| description |          |      |
| labelArr    |          |      |

* 响应：

### 5.查询文章(根据标签id)

* 请求路径：/article/:labelId
* 请求方式：post
* 请求参数：

| 参数名  | 参数说明 | 备注 |
| ------- | -------- | ---- |
| labelId | 标签id   |      |

* 响应：

### 6.查询文章(根据文章id)

* 请求路径：/article/exist
* 请求方式：post
* 请求参数：

| 参数名    | 参数说明 | 备注 |
| --------- | -------- | ---- |
| articleId | 文章id   |      |

* 响应：

### 7.获取文章信息(未转换为html的)

* 请求路径：/article/origin
* 请求方式：post
* 请求参数：

| 参数名    | 参数说明 | 备注 |
| --------- | -------- | ---- |
| articleId |          |      |

* 响应：

### 8.获取文章评论

* 请求路径：/article/comment
* 请求方式：post
* 请求参数：

| 参数名    | 参数说明 | 备注 |
| --------- | -------- | ---- |
| articleId |          |      |
| count     |          |      |
| offset    |          |      |

* 响应：

### 9.删除文章评论

* 请求路径：/article/comment/delete
* 请求方式：post
* 请求参数：

| 参数名    | 参数说明 | 备注 |
| --------- | -------- | ---- |
| articleId |          |      |

* 响应：

### 10.获取标签列表

* 请求路径：/labels
* 请求方式：get
* 请求参数：

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
|        |          |      |

* 响应：

### 11.创建标签

* 请求路径：/label/create
* 请求方式：post
* 请求参数：

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| label  | 标签名   |      |

* 响应：

### 12.删除标签

* 请求路径：/label/delete
* 请求方式：post
* 请求参数：

| 参数名  | 参数说明 | 备注 |
| ------- | -------- | ---- |
| labelId | 标签id   |      |

* 响应：

### 13.查询标签(根据文章id)

* 请求路径：/label/:articleId
* 请求方式：post
* 请求参数：

| 参数名     | 参数说明 | 备注 |
| ---------- | -------- | ---- |
| article_id | 文章id   |      |

* 响应：



## 三、日常

### 1.分享日常

* 请求路径：/daily/create
* 请求方式：post
* 请求参数：

| 参数名     | 参数说明 | 备注 |
| ---------- | -------- | ---- |
| content    | 内容     |      |
| photoArray | 图片列表 |      |

* 响应：

### 2.获取日常列表

* 请求路径：/dailies
* 请求方式：get
* 请求参数：

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
|        |          |      |

* 响应：

### 3.删除日常

* 请求路径：/daily/delete
* 请求方式：post
* 请求参数：

| 参数名  | 参数说明 | 备注 |
| ------- | -------- | ---- |
| dailyId | 日常id   |      |

* 响应：

### 4.修改日常

* 请求路径：/daily/modify
* 请求方式：post
* 请求参数：

| 参数名  | 参数说明 | 备注 |
| ------- | -------- | ---- |
| id      |          |      |
| content |          |      |

* 响应：

### 5.新增时间轴

* 请求路径：/timeline/create
* 请求方式：post
* 请求参数：

| 参数名  | 参数说明 | 备注 |
| ------- | -------- | ---- |
| content |          |      |

* 响应：

### 6.删除时间轴

* 请求路径：/timeline/delete
* 请求方式：post
* 请求参数：

| 参数名     | 参数说明 | 备注 |
| ---------- | -------- | ---- |
| timelineId |          |      |

* 响应：

### 7.修改时间轴

* 请求路径：/timeline/modify
* 请求方式：post
* 请求参数：

| 参数名  | 参数说明 | 备注 |
| ------- | -------- | ---- |
| id      |          |      |
| content |          |      |

* 响应：

### 8.获取时间轴列表

* 请求路径：/timeline/list
* 请求方式：get
* 请求参数：

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
|        |          |      |

* 响应：



## 四、alioss

### 1.获取所有相册列表

* 请求路径：/photoalbums
* 请求方式：get
* 请求参数：

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
|        |          |      |

* 响应：

### 2.获取所有图片

* 请求路径：/images
* 请求方式：get
* 请求参数：

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
|        |          |      |

* 响应：

### 3.获取某个obj中的图片

* 请求路径：/images/:albumName
* 请求方式：post
* 请求参数：

| 参数名    | 参数说明 | 备注 |
| --------- | -------- | ---- |
| albumName | 相册名称 |      |

* 响应：

### 4.上传单个图片

* 请求路径：/image/upload
* 请求方式：post
* 请求参数：

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
|        |          |      |

* 响应：

### 5.删除某个图片

* 请求路径：/image/delete
* 请求方式：post
* 请求参数：

| 参数名     | 参数说明 | 备注 |
| ---------- | -------- | ---- |
| imgObjName |          |      |

* 响应：



## 五、留言

### 1.获取留言列表

* 请求路径：/message/list
* 请求方式：post
* 请求参数：

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| count  |          |      |
| offset |          |      |

* 响应：

### 2.删除留言

* 请求路径：/message/delete
* 请求方式：post
* 请求参数：

| 参数名    | 参数说明 | 备注 |
| --------- | -------- | ---- |
| messageId |          |      |

* 响应：