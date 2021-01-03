
import axios from 'axios'

const state = {
    watchlist: []
}

const actions = {
    async index({ commit, rootState }) {
        let watchlist = await axios.get(`${rootState.baseUrl}watchlist`);

        commit("index", watchlist.data)
    },
}


const mutations = {
    index(state, watchlist) {
        state.watchlist = watchlist
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
