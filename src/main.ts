import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
//mintui不兼容
// import Mint from 'mint-ui';
// import 'mint-ui/lib/style.css'
// Vue.use(Mint);

//vant
import Vant from 'vant';
Vue.use(Vant);

//uview-ui
import uView from "uview-ui";
Vue.use(uView);

new App().$mount()
