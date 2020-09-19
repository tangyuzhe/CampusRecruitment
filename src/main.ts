import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
//mintui不兼容
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(Mint);

//uview-ui

new App().$mount()
