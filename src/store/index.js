import { createStore } from 'vuex'
import _ from 'lodash'
import axios from 'axios'

const state = {
  toggle: false,
  baseUrl: "http://localhost:4000/",
  uploadStatus: "",
  totalStocksCount: 0,
  paginatePerPage: 30,
  paginationCurrentPage: 1,
  status: "all",
  postionStatus: false,
  isLoading: false,
  timeFilter: "",
  plStatus: false,
  stocks: [],
  mutatedStocks: [],
  stock: {}
}

const actions = {

  toggleSidebar({ commit }) {
    commit("toggleSidebar")
  },

  PnLstatus({ commit }) {
    commit("PnLstatus")
  },

  async getAllStocks({ commit, state }) {
    const stocks = await axios.get(`${state.baseUrl}cards?frame=${state.timeFilter}`);

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

    commit("setTotalStockCount", sstocks.length)
    commit("setMutatedStock", totaledStock);
    commit("setAllStocks", sstocks)
  },

  async paginate({ commit, dispatch, state }) {
    state.isLoading = true

    if (state.status === "all") {
      await dispatch("getAllStocks")
    } else {
      await dispatch(`get${state.status.charAt(0).toUpperCase() + state.status.slice(1)}`)
    }

    const totalStocksCount = state.stocks.length
    commit("setTotalStockCount", totalStocksCount)

    const paginated = _(state.stocks).drop((state.paginationCurrentPage - 1) * state.paginatePerPage).take(state.paginatePerPage).value();
    commit("setAllStocks", paginated)

    state.isLoading = false
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
      .filter((f) => f.total >= 0)
      .sortBy(({ total }) => -total)
      .value()

    commit("setAllStocks", stocks)
  },


  async getOpenPositions({ commit, state, dispatch }) {
    state.isLoading = true
    let stocks = []

    await dispatch('getAllStocks')

    if (state.postionStatus) {
      stocks = _.chain(state.stocks)
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
    } else {
      stocks = state.stocks
    }

    const paginated = _(stocks).drop((state.paginationCurrentPage - 1) * state.paginatePerPage).take(state.paginatePerPage).value();
    const totalStocksCount = stocks.length

    commit("setTotalStockCount", totalStocksCount)

    commit("setAllStocks", paginated)

    state.isLoading = false

  },

  async filteredStocks({ commit, state, dispatch }) {
    state.isLoading = true
    let stocks = []

    // await dispatch('getAllStocks')
    switch (state.status) {
      case "profit":
        await dispatch("getProfit")
        break
      case "loss":
        await dispatch("getLoss")
        break
      default:
        await dispatch("getAllStocks")
    }

    if (state.postionStatus) {
      stocks = _.chain(state.stocks)
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
    } else {
      stocks = state.stocks
    }

    const paginated = _(stocks).drop((state.paginationCurrentPage - 1) * state.paginatePerPage).take(state.paginatePerPage).value();
    const totalStocksCount = stocks.length

    commit("setTotalStockCount", totalStocksCount)

    commit("setAllStocks", paginated)

    state.isLoading = false
    state.paginationCurrentPage = 0

  },

  async toggleRealized({ dispatch, state }, transaction) {
    await axios.post(`${state.baseUrl}tables/${transaction._id}`, transaction)

    dispatch("getStock", transaction.symbol)
  },

  async getStock({ commit, state }, id) {
    let stock = await axios.get(`${state.baseUrl}tables/${id}?frame=${state.timeFilter}`);

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

  PnLstatus(state) {
    state.plStatus = !state.plStatus
  },

  setMutatedStock(state, mutatedStocks) {
    state.mutatedStocks = mutatedStocks
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

const getters = {
  getTotal() {
    console.log(state.mutatedStocks)
    return state.mutatedStocks.reduce((sum, stock) => {
      return sum + parseFloat(stock.total)
    }, 0).toFixed(2)
  },

  getTotalLoss() {
    return state.mutatedStocks.filter(f => f.total < 0).reduce((sum, stock) => {
      return sum + parseFloat(stock.total)
    }, 0).toFixed(2)
  },

  getTotalProfit() {
    return state.mutatedStocks.filter(f => f.total > 0).reduce((sum, stock) => {
      return sum + parseFloat(stock.total)
    }, 0).toFixed(2)
  }
}

export default createStore({
  state,
  mutations,
  actions,
  getters,
})
