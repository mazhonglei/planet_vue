import Vue from 'vue'
import Vuex from 'vuex'
import state from "./state";
import mutations from "./mutations"
import actions from "./action";
import modal from "./modules/modal";
import wallet from "./modules/wallet";
import balance from "./modules/balance";

Vue.use(Vuex);

export default new Vuex.Store({
    state,
    mutations,
    actions,
    modules: {
        modal: modal,
        wallet: wallet,
        balance: balance,
    }
});
