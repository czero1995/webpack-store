const path = require("path");
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin"); /*提取css到为单独文件*/
const HtmlWebpackPlugin = require('html-webpack-plugin'); /*生成html*/
const CopyWebpackPlugin = require('copy-webpack-plugin'); /*复制文件*/
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
	devtool: 'cheap-source-map',   //开启调试模式，cheap-source-mao提升打包速度和编译速度。
	output: {
		path: path.resolve(__dirname, "./build"),
		filename: "./js/[name].[chunkhash:8].js",    //输出的文件加入hash值
	},
	module: {
		loaders: [{
		        test: /\.(less|css)$/,
		        use:[ 'style-loader','css-loader','less-loader'],
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
		// html文件输出
		new HtmlWebpackPlugin({
			title: '首页',
			filename: 'index.html',
			template: './index.html',			
			chunks: ['rem','index','swiper'],			
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