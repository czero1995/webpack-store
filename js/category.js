var $ = require('jquery');
var axios = require('axios');
import Vue from 'vue/dist/vue.common.js';
import '../less/category.less';
new Vue({
	el: '#app',
	data() {
		return {
			successModel: false,
			categoryList: {},
			oneList: {},
			twoList: {},
			threeList: {},
			fourList: {},
			fiveList: {},
			sixList: {},
			cartNum: '0',
			itemCoach: '40.00',
			bar: 'one',
			shopAddCart: false,
		}
	},
	mounted: function() {
		this.getUrlParam('catItem');
		this.getCategory();
	},
	methods: {
		/*获取商品列表*/
		getCategory() {
			const that = this;
			axios.get('../data/categoryData.json').then(function(response) {
					that.categoryList = response.data.Data;
					that.categoryList.forEach(function(item, index) {
						if(index == 0) {
							that.oneList = item;
						}
						if(index == 1) {
							that.twoList = item;
						}
						if(index == 2) {
							that.threeList = item;
						}
						if(index == 3) {
							that.fourList = item;
						}
						if(index == 4) {
							that.fiveList = item;
						}
						if(index == 5) {
							that.sixList = item;
						}

					})
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		/*左侧导航栏*/
		onBar(item) {
			const that = this;
			this.bar = item;
		},
		/*添加购物车*/
		onAddCart(good) {
			const that = this;
			if(typeof good.shopAddCart == 'undefined') {
				that.$set(good, "shopAddCart", true);
			} else {
				good.shopAddCart = !good.shopAddCart;
			}
			that.cartNum++;
			var time = setTimeout(function() {
				good.shopAddCart = !good.shopAddCart;
			}, 600);
		},
		/*获取首页传值*/
		getUrlParam(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			if(r != null) {
				this.bar = r[2];
				return(r[2]);
			}
		}
	}
})