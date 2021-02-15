import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Vue2TouchEvents from 'vue2-touch-events'
import textFilter from './filters/text.filter'
import dateFilter from './filters/date.filter'
import VueMeta from 'vue-meta'
import valid from '@/plugins/valid.plugin'
import generatePDF from '@/plugins/generatePDF.plugin'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

import Loader from '@/components/app/Loader'
import AddedCart from '@/components/app/AddedCart'
import Notification from '@/components/app/NotificationCart'



import vueCountryRegionSelect from 'vue-country-region-select'
Vue.use(vueCountryRegionSelect)
Vue.use(valid)
Vue.use(VueMeta)
Vue.use(Vue2TouchEvents)
Vue.use(generatePDF)
Vue.component('Loader',Loader)
Vue.component('AddedCart',AddedCart)
Vue.component('Notification',Notification)

Vue.filter('text', textFilter)
Vue.filter('date', dateFilter)


firebase.initializeApp({
    apiKey: `${process.env.VUE_APP_API_KEY}`,
    authDomain: "web-shop-13e9e.firebaseapp.com",
    databaseURL: "https://web-shop-13e9e-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "web-shop-13e9e",
    storageBucket: "web-shop-13e9e.appspot.com",
    messagingSenderId: "104567797441",
    appId: `${process.env.VUE_APP_APP_ID}`,
    measurementId: "G-Z8K9SFE1JV"
})

Vue.config.productionTip = false

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
      app = new Vue({
          router,
          store,
          render: h => h(App)
      }).$mount('#app')
  }
})
