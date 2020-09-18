import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(Mint);
new App().$mount()
