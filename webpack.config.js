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
//		publicPath:'build/'
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

//			{
//				test: /\.(png|jpg)$/,
//				loader: 'url-loader?limit=8192&name=img/icon/[hash:8].[name].[ext]'			
//			},
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
		// 代码压缩
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
			filename: './pages/category.html',
			template: './pages/category.html',
			title:'分类',
			chunks: ['rem','category']
		}),	
		new HtmlWebpackPlugin({
			filename: 'pages/cart.html',
			template: 'pages/cart.html',
			title:'购物车',
			chunks: ['rem','cart']
		}),	
		new HtmlWebpackPlugin({
			filename: 'pages/member.html',
			template: 'pages/member.html',
			title:'个人中心',
			chunks: ['rem','member']
		}),	
		new HtmlWebpackPlugin({
			filename: 'pages/detail.html',
			template: 'pages/detail.html',
			title:'商品详情',
			chunks: ['rem','detail']
		}),	
		new HtmlWebpackPlugin({
			filename: 'pages/address.html',
			template: 'pages/address.html',
			title:'地址列表',
			chunks: ['rem','address']
		}),
		new HtmlWebpackPlugin({
			filename: 'pages/addaddress.html',
			template: 'pages/addaddress.html',
			title:'添加地址',
			chunks: ['rem','addaddress','datacity']
		}),
		new HtmlWebpackPlugin({
			filename: 'pages/order.html',
			template: 'pages/order.html',
			title:'订单详情',
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