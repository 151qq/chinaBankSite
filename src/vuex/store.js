import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const userStore = new Vuex.Store({
  state: {
    userInfo: {},
    iosUrl: '',
    gateList: [],
    gameInfo: {},
    gameUser: {},
    gameTemplate: {},
    pointData: {}
  },
  getters: {
    getUserInfo (state) {
      return state.userInfo
    },
    getUrl (state) {
      return state.iosUrl
    },
    getGateList (state) {
      return state.gateList
    },
    getGameInfo (state) {
      return state.gameInfo
    },
    getGameUser (state) {
      return state.gameUser
    },
    getGameTemplate (state) {
      return state.gameTemplate
    },
    getPointData (state) {
      return state.pointData
    }
  },
  mutations: {
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
    },
    setUrl (state, url) {
      state.iosUrl = url
    },
    setGateList (state, gateList) {
      state.gateList = gateList
    },
    setGameInfo (state, gameInfo) {
      state.gameInfo = gameInfo
    },
    setGameUser (state, gameUser) {
      state.gameUser = gameUser
    },
    setGameTemplate (state, gameTemplate) {
      state.gameTemplate = gameTemplate
    },
    setPointData (state, pointData) {
      state.pointData = pointData
    }
  },
  actions: {
    setUserInfo ({ commit }, userInfo) {
      commit('setUserInfo', userInfo)
    },
    setUrl ({ commit }, url) {
      commit('setUrl', url)
    },
    setGateList ({ commit }, gateList) {
      commit('setGateList', gateList)
    },
    setGameInfo ({ commit }, gameInfo) {
      commit('setGameInfo',gameInfo)
    },
    setGameUser ({ commit }, gameUser) {
      commit('setGameUser',gameUser)
    },
    setGameTemplate ({ commit }, gameTemplate) {
      commit('setGameTemplate',gameTemplate)
    },
    setPointData ({ commit }, pointData) {
      commit('setPointData',pointData)
    }
  }
})

export default userStore
