new Vue({
				el: '#app',
				data() {
					return {
						orderList: [],
					}
				},
				mounted: function() {
					if(localStorage.Token == undefined) {
						location.href = "login.html"
					} else {
						this.getOrderDetail();
					}	
					
				},
				methods: {
					/*获取支付列表*/
					getOrderDetail: function() {
						const that = this;
						axios.get(path + 'order/getorderList?shipping_status=0&&pay_status=2&&order_status=0', {
							
						}).then(function(res) {
								that.orderList = res.data.data.data;
								console.log('orderList', that.orderList);
							})
							.catch(function(error) {
								console.log(error);
							});
					},
					
					/*进去订单详情*/
					onGoodsDetail(id) {
						const that = this;
						location.href = "paydownDetail.html?id=" + id;

					},
				}
			})