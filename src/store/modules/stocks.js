// import axios from 'axios'

const state = {
    toggle: false
}

const getters = {}

const actions = {
    // getStocks() {
    // const data = axios.get('http://localhost:3333/cards');

    // console.log(data)

    // }
}

const mutations = {
    toggleval(state) {
        state.toggle = !state.toggle
    }
}


export default {
    state,
    actions,
    getters,
    mutations
}