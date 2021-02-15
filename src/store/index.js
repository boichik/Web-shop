import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import good from './good'
import cart from './cart'
import order from './order'
import gift from './gift'



Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error:null
  },
  mutations: {
    setError(state, error){
      state.error = error
    },
    clearError(state){
      state.error =null
    }
  },
  getters:{
    error: s=> s.error
  },
  actions: {
  },
  modules: {
    auth, good, cart, order, gift
  }
})
