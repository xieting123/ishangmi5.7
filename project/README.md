# projectSM
#### 项目介绍
商蜜PC端项目

#### 软件架构
项目采用前后端分离，使用VUE做前端渲染，全接口交互

#### 目录结构
1. build/config未项目配置文件（不做修改）
2. dist为项目打包，用于生产环境
3. node_modules nodeJS包文件（执行安装依赖后出现）
4. src 源码文件，所有的前端页面都在这里
5. src/api 所有接口文件
6. src/assets 所有图片文件
7. src/router 所有前端路由
8. src/assets 所有图片文件
9. src/main 主入口文件
5. static 静态文件目录，目前只存放网站图标
6. test 单元测试目录（不做修改）

#### 使用说明
1. 执行 npm install 安装依赖
2. 执行 npm run dev 启动项目开发环境
3. 执行 npm run build 执行项目打包（也就是dist目录）
