import Vue from 'vue'
import App from './App'
// import 'static/css/common/bootstrap.min.css';
Vue.config.productionTip = false

Vue.prototype.$hostUrl = 'http://10.18.88.73:8081/scalper/v1/';  // 请求基准路径

// Vue.prototype.$hostUrl = 'http://localhost:3000/';

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
