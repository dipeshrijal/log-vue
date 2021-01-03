import _ from 'lodash'
import axios from 'axios'

const state = {
    stocks: [],
    mutated: [],
    count: 0,
    paginatePerPage: 30,
    paginationCurrentPage: 1,
    isLoading: false,
    isPrivate: true,
    uploadStatus: "",
    range: "",
    showUnrealized: false,
    status: "all",
}

const actions = {

    async all({ commit, rootState }) {
        const stocks = await axios.get(`${rootState.baseUrl}stocks?frame=${state.range}`);

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

        commit("count", sstocks.length)
        commit("mutated", totaledStock);
        commit("all", sstocks)
    },

    async profit({ commit, state, dispatch }) {

        await dispatch('all')

        const stocks = _.chain(state.stocks)
            .filter((f) => f.total >= 0)
            .sortBy(({ total }) => -total)
            .value()

        commit("all", stocks)
    },

    async loss({ commit, state, dispatch }) {
        await dispatch('all')

        const stocks = _.chain(state.stocks)
            .filter((f) => f.total < 0)
            .sortBy(({ total }) => total)
            .value()


        commit("all", stocks)
    },

    async filter({ commit, state, dispatch }) {
        state.isLoading = true
        let stocks = []

        switch (state.status) {
            case "profit":
                await dispatch("profit")
                break
            case "loss":
                await dispatch("loss")
                break
            default:
                await dispatch("all")
        }

        if (state.showUnrealized) {
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
        const count = stocks.length

        commit("count", count)
        commit("all", paginated)

        state.isLoading = false
        state.paginationCurrentPage = 0

    },

    async search({ commit, dispatch }, search) {
        await dispatch('all')

        const stocks = _.chain(state.stocks)
            .filter(f => f._id.includes(search.toUpperCase()))
            .value()

        const paginated = _(stocks).drop((state.paginationCurrentPage - 1) * state.paginatePerPage).take(state.paginatePerPage).value();
        const count = stocks.length
        commit("count", count)
        commit("all", paginated)
    },

    async upload({ commit, state }, formData) {
        const headers = {
            'Content-Type': 'multipart/form-data'
        }

        await axios.post(`${state.baseUrl}stocks/upload`, formData, headers)

        commit("uploadStatus", "Upload Success")
    },

    togglePrivate({ commit }) {
        commit("togglePrivate")
    },
}


const mutations = {

    all(state, stocks) {
        state.stocks = stocks
    },

    mutated(state, mutated) {
        state.mutated = mutated
    },

    count(state, count) {
        state.count = count
    },

    uploadStatus(state, status) {
        state.uploadStatus = status
    },

    togglePrivate(state) {
        state.isPrivate = !state.isPrivate
    },

}

const getters = {
    total() {
        return state.mutated.reduce((sum, stock) => {
            return sum + parseFloat(stock.total)
        }, 0).toFixed(2)
    },

    loss() {
        return state.mutated.filter(f => f.total < 0).reduce((sum, stock) => {
            return sum + parseFloat(stock.total)
        }, 0).toFixed(2)
    },

    profit() {
        return state.mutated.filter(f => f.total > 0).reduce((sum, stock) => {
            return sum + parseFloat(stock.total)
        }, 0).toFixed(2)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
