import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: '用户',
    username: '',
    address:''
  },
  getters: {
  },
  mutations: {
    login(state, val) {
      state.name = val.name
      state.username = val.username
    },
    exit(state) {
      state.name = '用户',
        state.username = ''
    }
  },
  actions: {
  },
  modules: {
  }
})
