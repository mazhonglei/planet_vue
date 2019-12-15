/**
 *
 */
const state = {
    balance: {
        VNS: 0,
        ETH: 0
    },
    currency: {
        vns: 0
    },
    exchange: {
        rate: 6.8,
        type: "USD"
    },
};

const actions = {
    aBalance({commit}, {VNS = '', ETH = ''}) {
        commit('mBalance', {VNS, ETH})
    },
    aCurrency({commit}, {
        VNS = "",
    }) {
        commit('mCurrency', {VNS})
    },

    aExchange({commit}, {rate, type}) {
        commit('mExchange', {rate, type})
    },
};

const mutations = {
    mBalance(state, {VNS, ETH}) {
        VNS === '' && (VNS = state.balance.VNS);
        ETH === '' && (ETH = state.balance.ETH);
        state.balance = {VNS, ETH};
    },
    mCurrency(state, {VNS}) {
        VNS === '' && (VNS = state.currency.VNS);
        state.currency = {VNS};
    },

    mExchange(state, {rate = "", type = ""}) {
        rate === '' && (rate = state.exchange.rate);
        type === '' && (type = state.exchange.type);
        state.exchange = {rate, type};
    },
};



export default {
    namespaced: true,
    state,
    actions,
    mutations,
}