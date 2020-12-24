import { createStore } from 'vuex'
import _ from 'lodash'
import axios from 'axios'

const state = {
  toggle: false,
  mutatedAllStocks: [],
  baseUrl: "http://localhost:4000/",
  uploadStatus: "",
  totalStocksCount: 0,
  paginatePerPage: 30,
  paginationCurrentPage: 0,
  status: "all",
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

    // const totalStocksCount = sstocks.length
    // commit("setTotalStockCount", totalStocksCount)

    commit("setAllStocks", sstocks)
  },

  async paginate({ commit, dispatch, state }) {

    if (state.status === "all") {
      await dispatch("getAllStocks")
    } else {
      await dispatch(`get${state.status.charAt(0).toUpperCase() + state.status.slice(1)}`)
    }

    const totalStocksCount = state.stocks.length
    commit("setTotalStockCount", totalStocksCount)

    const paginated = _(state.stocks).drop((state.paginationCurrentPage - 1) * state.paginatePerPage).take(state.paginatePerPage).value();
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

    const stocks = _.chain(state.stocks)
      .filter((f) => f.total > 0)
      .sortBy(({ total }) => -total)
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

    const paginated = _(stocks).drop((state.paginationCurrentPage - 1) * state.paginatePerPage).take(state.paginatePerPage).value();
    const totalStocksCount = stocks.length
    commit("setTotalStockCount", totalStocksCount)

    commit("setAllStocks", paginated)

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

    const paginated = _(stocks).drop((state.paginationCurrentPage - 1) * state.paginatePerPage).take(state.paginatePerPage).value();
    const totalStocksCount = stocks.length
    commit("setTotalStockCount", totalStocksCount)
    commit("setAllStocks", paginated)
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

  setTotalStockCount(state, totalStocksCount) {
    state.totalStocksCount = totalStocksCount
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
