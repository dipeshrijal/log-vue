import { createStore } from 'vuex'
import axios from 'axios'
import _ from 'lodash'


const state = {
  toggle: false,
  total: 0,
  totalProfit: 0,
  totalLoss: 0,
  stocks: [],
  stock: {}
}

const actions = {
  async getAllStocks({ state, commit }) {
    const stocks = await axios.get("http://localhost:3333/cards");

    const sortedStocks = _.chain(stocks.data).sortBy(({ ticker }) => ticker).value()

    commit("setStocks", sortedStocks)

    const total = state.stocks.reduce((sum, stock) => {
      return sum + parseFloat(stock.total)
    }, 0)

    const totalLoss = state.stocks.filter(f => f.total < 0).reduce((sum, stock) => {
      return sum + parseFloat(stock.total)
    }, 0)

    const totalProfit = state.stocks.filter(f => f.total > 0).reduce((sum, stock) => {
      return sum + parseFloat(stock.total)
    }, 0)

    commit("setTotal", total.toFixed(2))
    commit("setTotalProfit", totalProfit.toFixed(2))
    commit("setTotalLoss", totalLoss.toFixed(2))
  },

  async getLoss({ commit, state, dispatch }) {
    await dispatch('getAllStocks')

    const stocks = _.chain(state.stocks)
      .filter((f) => f.total < 0)
      .sortBy(({ total }) => -parseFloat(total))
      .value()

    commit("setStocks", stocks)


  },

  async getProfit({ commit, state, dispatch }) {
    await dispatch('getAllStocks')

    const stocks = _.chain(state.stocks)
      .filter((f) => f.total > 0)
      .sortBy(({ total }) => parseFloat(total))
      .value()

    commit("setStocks", stocks)
  },

  async getStock({ commit }, id) {
    let stock = await axios.get(`http://localhost:3333/tables/${id}`);

    commit("setStock", stock.data)

  }
}

const mutations = {
  toggleval(state) {
    state.toggle = !state.toggle
  },

  setStock(state, stock) {

    state.stock = stock

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

  setStocks(state, stocks) {
    state.stocks = stocks
  }
}

export default createStore({
  state,
  mutations,
  actions
})
