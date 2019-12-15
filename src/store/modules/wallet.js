const state = {
    // 自己创建的钱包
    walletCreate: {
        address: "",
        pKey: "",
        mnemonic: "", //breeze mobile wide brick pudding recall cake transfer inflict current sorry feature
        keystore: "",
        backUp: "",
        name: "",
        tip: "",
        token: "",
        avatar: "",
    },
    // 当前使用的钱包
    walletActive: {
        address: "",
        pKey: "",
        mnemonic: "", //breeze mobile wide brick pudding recall cake transfer inflict current sorry feature
        keystore: "",
        backUp: "",
        name: "",
        tip: "",
        token: "",
        avatar: "",
        index: "",
    },
    // 解密之后的钱包数据
    walletDecode: {
        pKey: "",
        mnemonic: "", //breeze mobile wide brick pudding recall cake transfer inflict current sorry feature
        keystore: "",
    }
};

const actions = {
    aWalletCreate({commit}, {address = '', pKey = '', mnemonic = '', keystore = '', backUp = '', name = '', tip = '', token = '', avatar = ''}) {

        commit('mWalletCreate', {address, pKey, mnemonic, keystore, backUp, name, tip, token, avatar})
    },

    aWalletActive({commit}, {address = '', pKey = '', mnemonic = '', keystore = '', backUp = '', name = '', tip = '', token = '', avatar = '', index = ""}) {

        commit('mWalletActive', {address, pKey, mnemonic, keystore, backUp, name, tip, token, avatar, index})
    },
    aWalletDecode({commit}, {pKey = '', mnemonic = '', keystore = ''}) {
        commit('mWalletDecode', {pKey, mnemonic, keystore})
    },
};

const mutations = {
    mWalletCreate(state, {address, pKey, mnemonic, keystore, backUp, name, tip, token, avatar}) {
        address === '' && (address = state.walletCreate.address);
        pKey === '' && (pKey = state.walletCreate.pKey);
        mnemonic === '' && (mnemonic = state.walletCreate.mnemonic);
        keystore === '' && (keystore = state.walletCreate.keystore);
        backUp === '' && (backUp = state.walletCreate.backUp);
        name === '' && (name = state.walletCreate.name);
        tip === '' && (tip = state.walletCreate.tip);
        token === '' && (token = state.walletCreate.token);
        avatar === '' && (avatar = state.walletCreate.avatar);

        state.walletCreate = {address, pKey, mnemonic, keystore, backUp, name, tip, token, avatar};
    },
    mWalletActive(state, {address, pKey, mnemonic, keystore, backUp, name, tip, token, avatar, index}) {
        address === '' && (address = state.walletActive.address);
        pKey === '' && (pKey = state.walletActive.pKey);
        mnemonic === '' && (mnemonic = state.walletActive.mnemonic);
        keystore === '' && (keystore = state.walletActive.keystore);
        backUp === '' && (backUp = state.walletActive.backUp);
        name === '' && (name = state.walletActive.name);
        tip === '' && (tip = state.walletActive.tip);
        token === '' && (token = state.walletActive.token);
        avatar === '' && (avatar = state.walletActive.avatar);
        index === '' && (index = state.walletActive.index);

        state.walletActive = {address, pKey, mnemonic, keystore, backUp, name, tip, token, avatar, index};
    },
    mWalletDecode(state, {pKey = '', mnemonic = '', keystore = ''}) {

        state.walletDecode = {pKey, mnemonic, keystore};
    },

};

const getters = {
    getMnemonicArray(state) {
        return state.walletDecode.mnemonic.split(" ");
    },
    getMnemonicArrayRandom(state) {
        return state.walletDecode.mnemonic.split(" ").sort();
    },
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}