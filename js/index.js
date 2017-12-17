
import '../less/index.less';
import '../css/swiper.min.css';
import '../js/swiper.js';
import{axios,Vue} from '../js/base';


	
new Vue({
	el: '#app',
	data: {
		successModel: false,
		bannerList: {},
		productList: {},
		/*轮播列表*/
		goodsName: '',
		/*商品名字*/
	},
	mounted: function() {
		const that = this;
		setTimeout(()=>{
			var swiper = new Swiper('.swiper-container', {
			pagination: '.swiper-pagination',
			paginationClickable: true,
			spaceBetween: 30,
			});
		},500)
		
		that.getGoodsList();
		that.getBannerList();
	},
	methods: {
		/*获取商品列表*/
		getGoodsList() {
			const that = this;
			axios.get('data/homeData.json').then(function(res) {
					that.productList = res.data.Data;
					console.log(that.productList);
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		/*获取轮播列表*/
		getBannerList() {
			const that = this;
			axios.get('data/bannerData.json').then(function(res) {
					that.bannerList = res.data.Data;
					console.log(that.bannerList);
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		/*添加到购物车*/
		onAddCart(name) {
			const that = this;
			that.goodsName = name;
			that.successModel = true;

		},

	}
})