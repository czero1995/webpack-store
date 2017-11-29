new Vue({
	el: '#app',
	data() {
		return {
			orderList: [],
			tipModel: false
		}
	},
	mounted: function() {
		if(localStorage.Token == undefined) {
			location.href = "login.html"
		} else {
			this.getOrderList();
		}

	},
	methods: {
		/*获取订单列表*/
		getOrderList: function() {
			const that = this;
			axios.get(path + 'order/getorderList', {

				}).then(function(res) {
					that.orderList = res.data.data.data
					console.log('orderList', that.orderList);
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		/*进入订单详情*/
		onOrderDetail(item) {
			if(item.pay_status == 1 && item.order_status == 0) {
				location.href = "orderwaitDetail.html?id=" + item.id;
				console.log('待收货', item.id);
			} else if(item.pay_status == 1 && item.order_status == 1) {
				location.href = "orderdownDetail.html?id=" + item.id;
				console.log('已完成', item.id);
			} else if(item.pay_status == 0) {
				location.href = "paywaitDown.html?id=" + item.id;
				console.log('待付款', item.id);
			} else if(item.pay_status == 2) {
				location.href = "paydownDetail.html?id=" + item.id;
				console.log('已付款', item.id);
			}

		},
		/*支付*/
		onPay(id) {
			const that = this;
			axios.get(path + 'pay/wxPay?id=' + id, {

				}).then(function(res) {
					alert(res.data.errcode)
					console.log('pay', res);
					if(res.data.errcode == 200) {
						axios.get(path + 'auth/getJsSignInfo', {

						}).then(function(resConfig) {
							console.log('resConfig.data.data.appId', resConfig.data.data.appId);
							wx.config({
								debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
								appId: resConfig.data.data.appId, // 必填，公众号的唯一标识
								timestamp: resConfig.data.data.timeStamp, // 必填，生成签名的时间戳
								nonceStr: resConfig.data.data.nonceStr, // 必填，生成签名的随机串
								signature: resConfig.data.data.signature, // 必填，调用js签名，
								jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，这里只写支付的
							})

						}).catch(function(error) {
							console.log(error)
						});
						wx.ready(function() {
							wx.chooseWXPay({
								appId: res.data.data.appId,
								timestamp: res.data.data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
								nonceStr: res.data.data.nonceStr, // 支付签名随机串，不长于 32 位
								package: res.data.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
								signType: res.data.data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
								paySign: res.data.data.paySign, // 支付签名
								success: function(res) {

									// 支付成功后的回调函数
									axios.get(path + 'order/updateOrderById?status=pay_status&&scode=2&&id=' + id, {

										}).then(function(res) {
											if(res.data.errcode == 200) {
												location.href = "paydownDetail.html?id=" + id;
											}
										})
										.catch(function(error) {
											console.log(error);
										});

								},
								cancel: function(res) {
									that.tipModel = true;
								}

							});

						});
						wx.error(function(res) {
							alert('error', res)
							// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
						});

					}
					console.log(JSON.stringify(res))
				})
				.catch(function(error) {
					console.log(error)
				});

		},
		/*取消订单*/
		onCancel: function(id) {
			const that = this;
			axios.get(path + 'order/cancelOrderById?id=' + id, {}).then(function(res) {
					if(res.data.errcode == 200) {
						that.getOrderList();
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},

	}
})