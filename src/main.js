import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import '@fortawesome/fontawesome-pro/css/all.css'
import '@fortawesome/fontawesome-pro/js/all.js'
import VueRouter from 'vue-router'

Vue.use(VueAxios, axios)
Vue.use(Buefy)
Vue.use(VueRouter)

Vue.config.productionTip = false

import ParkListing from './components/ParkListing.vue';
import ParkMap from './components/ParkMap.vue';
import Home from './components/Home.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/listing', component: ParkListing },
  { path: '/map', component: ParkMap }
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
