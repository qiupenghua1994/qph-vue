import Vue from 'vue'
import Vuex from 'vuex'
import {socket} from '@/common/js/socketAPI'

Vue.use(Vuex);

const conn = {
  state: {
    socket: socket,
    user: null,
    // user:{
    //   name:
    // }
  },

  mutations: {
    setSocket: (state, socket) => {
      state.socket = socket
    },
    setUser: (state, user) => {
      state.user = user;
    }
  },

  actions: {}
};

//getters 类似于计算属性，
const getters = {
  // socket: state => state.conn.state,
};


const store = new Vuex.Store({
  modules: {
    conn
  },
  getters
})

export default store
// this.$store.state.conn.socket;
