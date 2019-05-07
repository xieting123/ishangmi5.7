// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import App from './App'

import 'babel-polyfill'
import ElementUI from 'element-ui'
import App from './App'
import 'swiper/dist/css/swiper.css'
import 'element-ui/lib/theme-chalk/index.css'
import Footer from './components/common/Footer'
import Header from './components/common/Header'
import SideBar from './components/common/SideBar'
import NoData from './components/common/NoData'
import MyAcountAalance from './components/common/MyAcountAalance'
// import RongCloudIM from './components/common/RongCloudIM'
import router from './router'
//引入全局文件
import global_ from './Global'
Vue.prototype.GLOBAL = global_//挂载到Vue实例上面，接着在整个项目中不需要再通过引用Global.vue模块文件，直接通过this就可以直接访问Global文件里面定义的全局变量。

Vue.config.productionTip = false
Vue.use(ElementUI)

import VueCropper from 'vue-cropper' 
Vue.use(VueCropper)
// Vue.prototype.$http = axios;
// axios.defaults.baseURL = BASE_URL;

//引入公用组件
Vue.component('myHeader', Header)
Vue.component('myFooter', Footer)
Vue.component('mySideBar', SideBar)
Vue.component('NoData', NoData)
Vue.component('MyAcountAalance', MyAcountAalance)
// Vue.component('RongCloudIM', RongCloudIM)

//引入vue-cookies
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

//引入轮播图
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default global options } */)

//引入vue-meta-info
import Meta from 'vue-meta'
Vue.use(Meta)

//金额过滤器
Vue.filter('numFilter', function (value) {
  if(!value) return '0.00';
  value = value.toString();
  var intPart = Number(value).toFixed(0); //获取整数部分
  var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); //将整数部分逢三一断
  var floatPart = ".00"; //预定义小数部分
  var value2Array = value.split(".");
  //=2表示数据有小数位
  if(value2Array.length == 2) {
      floatPart = value2Array[1].toString(); //拿到小数部分
      if(floatPart.length == 1) { //补0,实际上用不着
          return intPartFormat + "." + floatPart + '0';
      } else {
          return intPartFormat + "." + floatPart;
      }
  } else {
      return intPartFormat + floatPart;
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  components: { App },
  template: '<App/>'
});

//页面路由跳转全局记录
Vue.prototype.$setgoindex = function () {
  if (window.history.length <= 1) {
    if (location.href.indexOf('?') === -1) {
      window.location.href = location.href + '?goindex=true'
    } else if (location.href.indexOf('?') !== -1 && location.href.indexOf('goindex') === -1) {
      window.location.href = location.href + '&goindex=true'
    }
  }
}

//跳转后滚动条回到顶部
router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
});