# React Demo 实现search页面
> 基于React的SPA

###目录
    │  css              		 # 编译后的样式文件夹
    │  js                        # 编译后的js文件夹(业务模块)
    │  index.html         		 # 编译后的入口HTML
    │  vendor.v20160520.js       # 编译后的js文件（公共部分）
    └─res                        # 源码目录
       ├─.babelrc                # ES6编译设置
       ├─package.json            # 依赖说明，以及script编译命令设置
       ├─webpack.config.js       # webpack配置文件
       ├─src       				 # 开发源码
       │  ├─components			 # 复用组件
       │  ├─constant			 # 常量设置
       │  ├─containers			 # 主模块
       │  ├─layouts  			 # 公共样式，图片
       │  ├─utils				 # 公共方法
       │  ├─index.html 			 # 入口html
       │  ├─index.js 			 # 入口js


###如何开始？

1.  进入res目录，命令行执行：`npm install` 安装依赖包；
2.  然后执行：`npm run build` 打包编译；
3.  再在项目根目开启一个http server;
4.  打开浏览器，输入地址 `http://127.0.0.1:[port]`查看效果。
