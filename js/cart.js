import{axios,Vue} from '../js/base';
import '../less/cart.less';
new Vue({
	el: '#app',
	data() {
		return {
			goodsRadio: false,
			goodsRadioAll: false,
			cartList: [], //购物车列表
			allCoach: '0',
			/*所有商品价格*/
			tipModel: false,
			tipText: '',
			/*弹窗提示文字*/
			radioArr: []
		}
	},
	mounted: function() {
		this.getCart()
	},
	methods: {
		getCart() {
			const that = this;
			axios.get('../data/cartData.json').then(function(response) {
					that.cartList = response.data.list;
					console.log(that.cartList);
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		onShopRadio(gooditem) {
			const that = this;
			if(typeof gooditem.goodsRadio == 'undefined') {
				that.$set(gooditem, "goodsRadio", true);
			} else {
				gooditem.goodsRadio = !gooditem.goodsRadio;
			}
			if(gooditem.goodsRadio == false) {
				that.goodsRadioAll = false;
			} else {
				that.cartList.forEach(function(item) {
					that.radioArr = [];
					if(typeof item.goodsRadio == 'undefined') {
						that.$set(item, "goodsRadio", false);
					}
					that.radioArr.push(item.goodsRadio);
					console.log(item)
				});
				if(that.radioArr.indexOf(false) == -1) {
					that.goodsRadioAll = true;
				}

			}

			console.log(that.radioArr);
			that.onCalAllCoach();
		},
		onAddCart(gooditem) {
			const that = this;
			gooditem.count++;
			that.onCalAllCoach();

		},
		onCutCart(gooditem) {
			const that = this;
			if(gooditem.count > 1) {
				gooditem.count--;
				that.onCalAllCoach();
			}
		},
		onShopRadioAll() {
			const that = this
			that.goodsRadioAll = !that.goodsRadioAll;
			console.log(that.goodsRadioAll)
			if(that.goodsRadioAll == true) {
				that.cartList.forEach(function(itemGoods) {
					itemGoods.goodsRadio = true;

				})
			} else {
				that.cartList.forEach(function(itemGoods) {
					itemGoods.goodsRadio = false;
				})
			}
			that.onCalAllCoach();
		},
		onCalAllCoach() {
			const that = this;
			that.allCoach = 0;
			that.cartList.forEach(function(item, index) {
				if(item.goodsRadio) {
					that.allCoach += item.count * item.price
				}
			})
		},
		onCartDel(item) {
			const that = this;
			var index = that.cartList.indexOf(item);
			that.cartList.splice(index, 1);
			console.log('index', index);
			console.log('that.cartList', that.cartList);
			console.log('item', item);
			console.log('item', typeof(item));
		},
		onDetail() {
			location.href = "../pages/detail.html";
		}
	},
})