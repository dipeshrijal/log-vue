
import axios from 'axios'

const state = {
    stock: {},
    range: ""
}

const actions = {

    async index({ commit, rootState }, id) {
        let stock = await axios.get(`${rootState.baseUrl}stocks/${id}?range=${state.range}`);

        commit("index", stock.data)
    },

    async update({ dispatch, rootState }, transaction) {
        await axios.put(`${rootState.baseUrl}stocks/${transaction._id}`, transaction)

        dispatch("index", transaction.symbol)
    },
}


const mutations = {
    index(state, stock) {
        state.stock = stock
    }
}

const getters = {
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
