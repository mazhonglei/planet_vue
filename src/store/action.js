const action={
    aAlert_shot({commit}, show) {
        commit('mAlert_shot', show);
    },
    aFromRouter({commit},from){
        commit('mFromRouter',from)
    },

};
export default action;