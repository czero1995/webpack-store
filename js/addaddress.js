import Vue from 'vue/dist/vue.common.js';
import '../less/address.less';
import {init_city_picker} from '../js/datacity.js';
new Vue({
	el: "#app",
	data: {
		addressModel: false,
		/*选择地址选择模态框*/
		addressList: [], //城市列表
		province: '', //选中的省份 
		city: '', //选中的城市
		area: '', //选择的区域
		addressText: '请选择', //选中的完整地址
		activeProvince: 0,
		activeCity: 0,
		activeArea: 0,
		tipModel:false,
		tipText: ''

	},
	mounted: function() {
		const that = this;
		that.addressList = init_city_picker;
		
	},
	methods: {
		/*选择省份*/
		onProvinceSelect: function(index, item) {
			var that = this;
			that.activeProvince = index;
			that.province = item;
			that.addressText = that.province;
			console.log(index, that.activeProvince, that.province)
		},
		/*选择城市*/
		onCitySelect: function(index, item) {
			var that = this;
			that.activeCity = index;
			that.city = item
			that.addressText = that.province + " " + that.city;
			console.log(index, that.activeCity, that.city, that.addressText);
		},
		/*选择区域*/
		onAreaSelect: function(index, item) {
			var that = this;
			that.activeArea = index;
			that.area = item
			that.addressText = that.province + " " + that.city + " " + that.area;
			that.addressModel = false;
			console.log(index, that.activeArea, that.area, that.addressText);
		},
		onInsure(){
			const that = this;
			that.tipText = '添加成功';
			that.tipModel=true;		
		}
	}
})