import { createStore } from 'vuex'
import stocks from './modules/stocks'
import stock from './modules/stock'
import watchlist from './modules/watchlist'

const state = {
  isSidebarMinimized: true,
  baseUrl: "http://localhost:4000/",
}

const actions = {
  toggleSidebar({ commit }) {
    commit("toggleSidebar")
  },

}


const mutations = {
  toggleSidebar(state) {
    state.isSidebarMinimized = !state.isSidebarMinimized
  },
}

export default createStore({
  state,
  actions,
  mutations,
  modules: {
    stock,
    stocks,
    watchlist
  }
})
