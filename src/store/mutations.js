const mutations={
    mAlert_shot(state, show) {
        state.alert_shot = show;
    },
    mFromRouter(state,from){
      state.fromRouter=from;
    },
    set_img_upload_cache (state, arg) {
        state.img_upload_cache = arg
    },
    set_img_paths (state, arg) {
        state.img_paths = arg
    },
    set_img_status (state, arg) {
        state.img_status = arg
    },

};
export default mutations;
