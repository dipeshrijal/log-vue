import { createStore } from 'vuex'
import _ from 'lodash'
import axios from 'axios'

const state = {
  toggle: false,
  mutatedAllStocks: [],
  baseUrl: "http://localhost:4000/",
  uploadStatus: "",
  stocks: [],
  stock: {}
}

const actions = {

  toggleSidebar({ commit }) {
    commit("toggleSidebar")
  },

  async getAllStocks({ commit, state }, frame) {
    const stocks = await axios.get(`${state.baseUrl}cards?frame=${frame}`);

    let totaledStock = [];

    _.each(stocks.data, (data) => {
      const total = data.transactions.reduce((sum, stock) => {
        return sum + (stock.type == "realized" ? stock.amount : 0)
      }, 0)

      data.total = parseFloat(total.toFixed(2))

      totaledStock.push(data)
    })

    const sstocks = _.chain(totaledStock)
      .sortBy(({ _id }) => _id)
      .value()

    commit("setAllStocks", sstocks)
  },

  async getLoss({ commit, state, dispatch }) {
    await dispatch('getAllStocks')

    const stocks = _.chain(state.stocks)
      .filter((f) => f.total < 0)
      .sortBy(({ total }) => total)
      .value()

    commit("setAllStocks", stocks)
  },

  async getOpenPositions({ commit, state, dispatch }) {
    await dispatch('getAllStocks')

    const stocks = _.chain(state.stocks)
      .filter(({ transactions }) => {
        let exists = false
        _.each(transactions, k => {
          if (k.type === "unrealized") {
            exists = true
          }
        })

        return exists
      })
      .value()

    commit("setAllStocks", stocks)

  },

  async getProfit({ commit, state, dispatch }) {
    await dispatch('getAllStocks')

    const stocks = _.chain(state.stocks)
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

    const stocks = _.chain(state.stocks)
      .filter(f => f._id.includes(search.toUpperCase()))
      .value()

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

  setMutatedStocks(state, stocks) {
    state.mutatedAllStocks = stocks
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
}

export default createStore({
  state,
  mutations,
  actions
})
