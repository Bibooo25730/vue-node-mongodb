# vue-node-mongodb
博客从0开发
博客從0開發

使用 vue-cli构建项目， webpack详细配置， 后台使用express的路由二次封装搭建服务端接口，移动端使用rem布局，mongodb作为数据持久存储。
移动端适配我用了个amfe-flexible rem布局 flex布局 利用webpack 加载全局组件

vue mavonEditor  上传图片 转图片格式  利用node.js multer保存图片 配置静态目录 把图片地址保存在数据库里

后端node.js + express crypto密码处理  增删改查文章 评论

登录注册 持久化  "jsonwebtoken": "^8.5.1", token状态化

增删改查文章 

mongodb数据 

页面不是那么好看。打算哪天用个模板
![image-20210908225833577](https://user-images.githubusercontent.com/42339998/132534538-d1009688-d03c-4182-8b22-9ebac8ca2585.png)
![image-20210908225856912](https://user-images.githubusercontent.com/42339998/132534550-c8e468ce-30ed-4122-919b-e12fd6c3e101.png)




登录做了持久化处理如果登录过 页面没有关闭会检测token直接跳到文章管理页面
![image-20210908230007613](https://user-images.githubusercontent.com/42339998/132534576-f37ac6eb-6c76-4f4b-8d6f-d3c9ae9f3461.png)
![image-20210908230023446](https://user-images.githubusercontent.com/42339998/132534584-c6bf9432-9f4d-4946-98b4-606e87e7f2b8.png)

