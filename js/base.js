import $ from '../js/jquery';
import Vue from 'vue/dist/vue.common';
import VueLazyLoad from 'vue-lazyload'
const axios = require('axios');
export {axios,Vue};
Vue.use(VueLazyLoad,{
//  error:'../img/1.png',
//  loading:'../img/2.png'
})
	
