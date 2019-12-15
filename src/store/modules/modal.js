/**
 * loading\alert\actionsheet\
 */
const state = {
    loading: {
        tip: "",
        show: false,
        close: false,
    },
    success: {
        tip: "",
        show: false
    },
    alert_shot: {
        show: false,
        title: "",
        tip: "",
        confirm: ""
    },
    alert_little: {
        show: false,
        msg: "",
        top: "",
    },
    prompt: {
        show: false,
        title: "请输入密码",
        cancel: "取消",
        confirm: "确认",
        type: "password",
        placeholder: "请输入密码",
        value: "",
        isConfirm: false,
        complete: ""
    }
};

const actions = {
    aLoading({commit}, {show, tip = '', close = false}) {
        commit('mLoading', {show, tip, close})
    },
    aSuccess({commit}, {tip = ''}) {
        return new Promise((resolve, reject) => {
            try {
                commit('mLoading', {
                    show: false,
                    tip: tip
                });
                commit('mSuccess', {
                    show: true,
                    tip: tip
                });
                setTimeout(function () {
                    commit('mSuccess', {
                        show: false,
                        tip: tip
                    });
                    resolve()
                }, 800);
            } catch (e) {
                reject(e)
            }
        });

    },
    aAlert_shot({commit}, {show, title = '', tip = '', confirm = ''}) {
        commit('mAlert_shot', {show, title, tip, confirm});
    },
    aAlert_little({commit}, {msg = '', top = ''}) {
        return new Promise((resolve, reject) => {
            try {
                commit('mAlert_little', {show: true, msg, top});
                setTimeout(function () {
                    commit('mAlert_little', {
                        show: false,
                    });
                    resolve()
                }, 500);
            } catch (e) {
                reject(e)
            }
        });
    },
    aPrompt({commit}, {show, title = '', cancel = '', confirm = '', type = '', placeholder = '', value = '', isConfirm = false, complete = ""}) {
        commit('mPrompt', {show, title, cancel, confirm, type, placeholder, value, isConfirm, complete});
    },
};

const mutations = {
    mLoading(state, {show, tip = '', close}) {
        state.loading = {
            show, tip, close
        };
    },
    mSuccess(state, {show, tip = ''}) {
        state.success = {
            show, tip
        };
    },
    mAlert_shot(state, {show, title, tip, confirm}) {
        state.alert_shot = {show, title, tip, confirm};
    },
    mAlert_little(state, {show, msg, top}) {
        state.alert_little = {show, msg, top};
    },
    mPrompt(state, {show, title, cancel, confirm, type, placeholder, value, isConfirm, complete}) {
        title === '' && (title = state.prompt.title);
        cancel === '' && (cancel = state.prompt.cancel);
        confirm === '' && (confirm = state.prompt.confirm);
        type === '' && (type = state.prompt.type);
        placeholder === '' && (placeholder = state.prompt.placeholder);
        // value === '' && (value = state.prompt.value);
        complete === '' && (complete = state.prompt.complete);

        state.prompt = {show, title, cancel, confirm, type, placeholder, value, isConfirm, complete};
    },
};

const getters = {
    getMLoading: (state) => {
        return state.loading
    }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
