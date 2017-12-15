# Webpack+Vue多页面购物商城模板

预览地址 ：[http://corange.czero.cn/store/index.html]()

	npm install
	npm run server
	webpack
	
Vue官方提供了Vue-Cli脚手架，集成了Webpack的环境，上手开发和构建非常方便。但Vue-cli适用于单页应用，而平常做的项目中往往都是多页的，网上看了很多Webpack多页面的配置，中间遇到很多坑，自己看文档，对着做出了这个多页面的商城模板。
 
### 项目模板效果:
![](https://user-gold-cdn.xitu.io/2017/12/2/1601626448873052?w=500&h=884&f=gif&s=116721)

在线预览:[http://corange.czero.cn/store/index.html](http://github.czero.cn/store/index.html)

# 项目描述
静态页面是用的阿里团队的rem和flex弹性布局。

商城的数据是用axios请求本地的JSON文件，再用Vue进行渲染。

项目放在github,乐于交流，欢迎star

## webpack文档
https://doc.webpack-china.org/guides/
# webpack.config.js
	const path = require("path");
	const webpack = require('webpack');
	const CleanWebpackPlugin = require('clean-webpack-plugin'); /*每次编译之前，先删除之编译好的文件夹*/
	const ExtractTextPlugin = require("extract-text-webpack-plugin"); /*提取css到为单独文件*/
	const HtmlWebpackPlugin = require('html-webpack-plugin'); /*生成html*/
	const CopyWebpackPlugin = require('copy-webpack-plugin'); /*复制文件*/
	const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
	const UglifyJSPlugin = require('uglifyjs-webpack-plugin'); /*精简输出*/
	module.exports = {
		entry: {
			rem: './js/rem.js',		/*动态计算rem*/
			swiper: './js/swiper.js', /*轮播插件*/
			index: './js/index.js', /*首页*/
			detail: './js/detail.js', /*详情页*/
			category: './js/category.js', /*分类*/
			cart: './js/cart.js', /*购物车*/
			member: './js/member.js', /*会员页面*/
			address: './js/address.js', /*地址列表页面*/
			addaddress: './js/addaddress.js', /*添加地址*/
			datacity :'./js/datacity.js', /*三级联动地址数据*/
			order: './js/order.js' /*订单*/
		},
		devtool: 'inline-source-map',   //开启调试模式
		output: {
			path: path.resolve(__dirname, "./build"),
			filename: "./js/[name].[chunkhash:8].js",    //输出的文件加入hash值
		},
		module: {
			loaders: [{
					test: /(\.jsx|\.js)$/,
					use: {
						loader: "babel-loader",
						options: {
							presets: [
								"es2015"
							]
						}
					},
					exclude: /node_modules/
				},
				
				{
					test: /(\.less|\.css)$/,
					use: ExtractTextPlugin.extract({
						fallback: "style-loader",
						use: "css-loader!less-loader!postcss-loader",
					})
	
				},
				 {
				 	//提取html里面的img文件
			        test: /\.(htm|html)$/i,
			        loader: 'html-withimg-loader',
			   },
				   {
				   	//图片打包
				   	test:/(\.jpg|\.png|\.gif|\.jpeg)$/, 
				   	use:{
				   		loader:'file-loader',
				   		 options: {
				   		 	outputPath: 'icon',
				   		 	name:'[name].[ext]',		   		 	
					      	useRelativePath:true
					    }
				   	}
				   },			 
			]
		},
		plugins: [
			new webpack.BannerPlugin('凡几所有，翻版必究'),
			new ExtractTextPlugin('./css/[name].[chunkhash:8].css'),
	//		new UglifyJSPlugin(),
			 代码压缩
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false
				}
			}),
			// html文件输出
			new HtmlWebpackPlugin({
				title: '首页',
				filename: 'index.html',
				template: './index.html',			
				chunks: ['rem','index','swiper'],
				hash:true,
				cach:true,
				minify:{
					caseSensitive:false, //是否大小写敏感
					removeComments:true, //去除注释
					removeEmptyAttributes:true,//去除空属性
					collapseWhitespace:true //是否去除空格
				},
				inject:'body'
			}),	
			new HtmlWebpackPlugin({
				title:'分类',
				filename: './pages/category.html',
				template: './pages/category.html',			
				chunks: ['rem','category']
			}),	
			new HtmlWebpackPlugin({
				title:'购物车',
				filename: 'pages/cart.html',
				template: 'pages/cart.html',			
				chunks: ['rem','cart']
			}),	
			new HtmlWebpackPlugin({
				title:'个人中心',
				filename: 'pages/member.html',
				template: 'pages/member.html',			
				chunks: ['rem','member']
			}),	
			new HtmlWebpackPlugin({
				title:'商品详情',
				filename: 'pages/detail.html',
				template: 'pages/detail.html',			
				chunks: ['rem','detail']
			}),	
			new HtmlWebpackPlugin({
				title:'地址列表',
				filename: 'pages/address.html',
				template: 'pages/address.html',
				chunks: ['rem','address']
			}),
			new HtmlWebpackPlugin({
				title:'添加地址',
				filename: 'pages/addaddress.html',
				template: 'pages/addaddress.html',			
				chunks: ['rem','addaddress','datacity']
			}),
			new HtmlWebpackPlugin({
				title:'订单详情',
				filename: 'pages/order.html',
				template: 'pages/order.html',			
				chunks: ['rem','order']
			}),
			new CopyWebpackPlugin([{
			    from: __dirname + '/data',
			    to:'data/'
			}]),
			
			 new CommonsChunkPlugin({
			       name:"rem",
			  }),
			new CleanWebpackPlugin(['build']) //编译前先清除文件夹
		],
	
		// 全局引用jquery
		externals: {
			jquery: 'window.$',
		},
		//构建本地服务器的相关配置 需要在`package.json`里面激活
		devServer: {
			contentBase:'./build',
			historyApiFallback: true, //不跳转
			inline: true,//实时刷新,
		},
	
	}
### 配置loader：

	babel-loader:将es6输出转化为es5
	less-loader:将less转化为css
	html-withimg-loader:提取html里面的img文件到编译完成后的文件夹当中
	file-loader:将图片进行转化成base64
### 配置插件plugin:

	webpack.BannerPlugin:会在你编译生成后的js添加注释
	ExtractTextPlugin:将css文件提取出来，单独引用到html文件中
	UglifyJSPlugin:每次编译都压缩一下代码，减少生成的文件体积
	HtmlWebpackPlugin:指定模板，打包后会自动将入口的js引用到页面
	CommonsChunkPlugin:将公用的js文件提取出来
 	CleanWebpackPlugin:每次编译之前都会先清除掉之前的打包文件
### externals
 	配置全局jquery
### devServer:
	安装devserver可以构建本地服务器，每次修改和保存都会自动的刷新页面
### postcss.config.js
	配置postcss主要是为了解决css样式在有些浏览器兼容的原因，会自动给你添加后缀
