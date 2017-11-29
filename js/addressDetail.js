new Vue({
				el: '#app',
				data() {
					return {
						addressDetil: {},
						/*地址详情信息*/
						addressList: [],
						/*地址列表*/
						aid: '',
						addressid:'',
						cartid:'',
						pageurl:'',
						/*获取地址传值*/
						addModel: false,
						addressList: [], //城市列表
						province: '', //选中的省份 
						city: '', //选中的城市
						area: '', //选择的区域
						addressaText: '请选择', //选中的完整地址
						addressDetail: '', //填写的详细地址
						name: '', //填写的收件人姓名
						phone: '', //填写的收件人手机号码
						zipcode: '', //填写的邮政编码
						provinceText: '',
						/*省编号文字*/
						cityText: '',
						/*市编号文字*/
						areaText: '',
						/*区编号文字*/
						tipModel:false,
						tipText:''
					}
				},
				mounted: function() {
					const that = this;
					that.getUrlParam('id');
					that.getAddressParam('addressid');
					that.getCartParam('cartid');
					that.getPageParam('pageurl');
					that.getAddressList();
					that.addressList = init_city_picker;
				},
				methods: {
					/*获取地址列表*/
					getAddressList: function() {
						const that = this;
						axios.get(path + 'member_address/getMemberAddressById?id=' + that.addressid, {
							}).then(function(res) {
								that.addressDetail = res.data.data;
								that.addressaText = that.addressDetail.province_name + that.addressDetail.city_name + that.addressDetail.district_name;
								that.provinceText = that.addressDetail.province + '-' + that.addressDetail.province_name;
								that.cityText = that.addressDetail.city + '-' + that.addressDetail.province_name;
								that.areaText = that.addressDetail.district + '-' + that.addressDetail.district_name;
								console.log('addressDetail', that.addressDetail);
							})
							.catch(function(error) {
								console.log(error);
							});
					},
					/*设置为默认地址*/
					onSelectDefault(){
						const that = this;
						if(that.addressDetail.is_default == 1){
							that.addressDetail.is_default = 2;
						}else{
							that.addressDetail.is_default =1;
						}
						console.log(that.addressDetail.is_default)
					},
					/*获取页面传值*/
					getPageParam(name) {
						const that = this;
						var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
						var r = window.location.search.substr(1).match(reg);
						if(r != null) {
							that.pageurl = r[2];
							return(r[2]);
						}
					},
					/*获取页面地址传值*/
					getUrlParam(name) {
						const that = this;
						var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
						var r = window.location.search.substr(1).match(reg);
						if(r != null) {
							that.aid = r[2];
							console.log('that.aid',that.aid)
							return(r[2]);
						}
					},
					/*获取地址id传值*/
					getAddressParam(name) {
						const that = this;
						var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
						var r = window.location.search.substr(1).match(reg);
						if(r != null) {
							that.addressid = r[2];
							console.log('that.addressid',that.addressid)
							return(r[2]);
						}
					},
					/*获取购物车传值*/
					getCartParam(name) {
						const that = this;
						var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
						var r = window.location.search.substr(1).match(reg);
						if(r != null) {
							that.cartid = r[2];
							console.log('that.addressid',that.addressid)
							return(r[2]);
						}
					},
					
					/*保存地址*/
					onSave(){
						const that = this;
						var phoneReg = /(1[3-9]\d{9}$)/;
						if(that.areaText == ''){						
							that.tipText = '请选择地址';
							that.tipModel = true;
						}else if(that.addressDetail.address.length < 3){						
							that.tipText = '请填写完整详细地址';
							that.tipModel = true;
						}else if(that.addressDetail.consignee.length<1){							
							that.tipText = '请输入正确姓名';
							that.tipModel = true;
						}else if(!phoneReg.test(that.addressDetail.mobile)){							
							that.tipText = '请输入正确手机号码';
							that.tipModel = true;
						}else if(that.addressDetail.zipcode.length<5){							
							that.tipText = '请输入正确邮政编码';
							that.tipModel = true;
						}else{
							axios.post(path + 'member_address/updateMemberAddress', {
								'id': that.addressDetail.id,
								'consignee': that.addressDetail.consignee,
								'mobile':	that.addressDetail.mobile,
								'province': that.provinceText,
								'city':		that.cityText,
								'district':	that.areaText,
								'address':	that.addressDetail.address,
								'zipcode':	that.addressDetail.zipcode,
								'is_default': that.addressDetail.is_default
								
						}).then(function(res) {
								if(res.data.errcode == 200){
									that.onBack();
								}
								console.log('editAddress', res);
							})
							.catch(function(error) {
								console.log(error);
							});
						}						
					},
					/*删除地址*/
					onDel(){
						const that = this;
						axios.get(path + 'member_address/delMemberAddressById?id=' + that.addressDetail.id, {								
								
						}).then(function(res) {
								if(res.data.errcode == 200){
										that.onBack();
									}
								console.log('delAddress', res);
							})
							.catch(function(error) {
								console.log(error);
							});
					},
					/*返回*/
					onBack(){
						const that = this;
						if(that.aid == 1){
							location.href="address.html?id=" + that.aid;
						}else if(that.aid == 2){
							location.href="address.html?id=" + that.aid + '&&cartid=' + that.cartid +'&&pageurl=' + that.pageurl;
						}
												
					},
					onProvinceSelect: function(event, value) {
						var that = this;
						$(event.currentTarget).addClass("active");
						$(event.currentTarget).siblings().removeClass("active");
						that.province = $(event.currentTarget).children("span").text();
						that.provinceText = value + '-' + that.province;
						console.log(that.provinceText)
					},
					onCitySelect: function(event, value) {
						var that = this;
						$(".cityBox").find("li").removeClass("active");
						$(event.currentTarget).addClass("active");
						that.city = $(event.currentTarget).children("span").text();
						that.cityText = value + '-' + that.city;
					},
					onAreaSelect: function(event, value) {
						var that = this;
						$(".areaBox").find("li").removeClass("select");
						$(event.currentTarget).addClass("select");
						that.area = $(event.currentTarget).children("span").text();
						that.addressaText = that.province + " " + that.city + that.area;
						console.log(that.addressaText);
						that.areaText = value +'-' +that.area;
						that.addModel = false;
					},
					
				}
			})