import{axios,Vue} from '../js/base';
import '../less/base.less';
import '../less/detail.less';
new Vue({
	el: '#app',
	data() {
		return {
			addCartModel: false,
			/*添加购物车*/
			payModel: false,
			/*支付*/
			successModel: false,
			/*添加成功*/
			/*获取商品详情信息*/
			goodsNum: 1 /*商品数量*/
		}
	},
	mounted: function() {},
	methods: {

		/*添加商品数量*/
		onAddGoods() {
			const that = this;

			that.goodsNum++;

		},
		/*减少商品数量*/
		onCutGoods() {
			const that = this;

			if(that.goodsNum > 1) {
				that.goodsNum--;
			}

		},
		/*添加到购物车*/
		onAddCart() {
			const that = this;
			that.addCartModel = false;

		}
	}
})