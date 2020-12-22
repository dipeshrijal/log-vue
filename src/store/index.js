import { createStore } from 'vuex'
import axios from 'axios'
import _ from 'lodash'


const state = {
  toggle: false,
  baseUrl: "http://localhost:4000/",
  total: 0,
  totalProfit: 0,
  totalLoss: 0,
  uploadStatus: "",
  stocks: [],
  getTotalStocks: 0,
  stock: {}
}

const actions = {

  toggleSidebar({ commit }) {
    commit("toggleSidebar")
  },

  async getAllStocks({ commit, state }, page = 1) {
    const stocks = await axios.get(`${state.baseUrl}cards?frame=${500}`);

    const sstocks = _.chain(stocks.data).sortBy(({ _id }) => _id).value()

    state.getTotalStocks = sstocks.length

    console.log(page)

    const paginated = _(sstocks).drop((page - 1) * 60).take(60).value();

    commit("setAllStocks", paginated)
  },

  async getLoss({ commit, state, dispatch }) {
    await dispatch('getAllStocks')

    const stocks = _.chain(state.stocks)
      .filter((f) => f.total < 0)
      .sortBy(({ total }) => total)
      .value()

    commit("setAllStocks", stocks)
  },

  async getProfit({ commit, state, dispatch }) {
    await dispatch('getAllStocks')

    const stocks = await _.chain(state.stocks)
      .filter((f) => f.total > 0)
      .sortBy(({ total }) => -total)
      .value()


    commit("setAllStocks", stocks)
  },

  async toggleRealized({ dispatch, state }, transaction) {
    await axios.post(`${state.baseUrl}tables/${transaction._id}`, transaction)

    dispatch("getStock", transaction.symbol)
  },

  async getStock({ commit, state }, id) {
    let stock = await axios.get(`${state.baseUrl}tables/${id}`);

    commit("setStock", stock.data)
  },


  async searchSymbol({ commit, dispatch }, search) {
    await dispatch('getAllStocks')

    const stocks = _.chain(state.stocks).filter(f => f._id.includes(search.toUpperCase())).value()

    commit("setAllStocks", stocks)
  },

  async uploadFile({ commit, state }, formData) {
    const headers = {
      'Content-Type': 'multipart/form-data'
    }

    await axios.post(`${state.baseUrl}stocks/upload`, formData, headers)

    commit("setuploadStatus", "Upload Success")
  }
}

const mutations = {
  toggleSidebar(state) {
    state.toggle = !state.toggle
  },

  setAllStocks(state, stocks) {
    state.stocks = stocks
  },

  toggleval(state) {
    state.toggle = !state.toggle
  },

  setStock(state, stock) {
    state.stock = stock
  },

  setuploadStatus(state, status) {
    state.uploadStatus = status
  },

  setTotal(state, total) {
    state.total = total
  },

  setTotalLoss(state, totalLoss) {
    state.totalLoss = totalLoss
  },

  setTotalProfit(state, totalProfit) {
    state.totalProfit = totalProfit
  },
}

const getters = {
  getStock(state) {
    return state.stock
  },

  getTotal() {
    return state.stocks.reduce((sum, stock) => {
      return sum + parseFloat(stock.total)
    }, 0)
  },

  getTotalLoss() {
    return state.stocks.filter(f => f.total < 0).reduce((sum, stock) => {
      return sum + parseFloat(stock.total)
    }, 0)
  },

  getTotalProfit() {
    return state.stocks.filter(f => f.total > 0).reduce((sum, stock) => {
      return sum + parseFloat(stock.total)
    }, 0)
  }
}

export default createStore({
  state,
  mutations,
  getters,
  actions
})
