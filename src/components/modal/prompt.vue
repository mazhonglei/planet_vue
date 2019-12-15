<template>
    <div class="pwd-mask" v-show="prompt.show">
        <div class="popup-in" style="display: block;">
            <div class="popup-inner">
                <div class="popup-title">{{ prompt.title }}</div>
                <div class="popup-input">
                    <input id="prompt-focus" :type="prompt.type" autofocus="" :placeholder="prompt.placeholder" v-model="value" onclick="this.focus()">
                </div>
            </div>
            <div class="popup-buttons">
                <span class="popup-button" @click="cancel()">{{ prompt.cancel }}</span>
                <span class="popup-button pwd-color" @click="confirm()">{{ prompt.confirm }}</span>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapState, mapActions} from 'vuex'

    export default {
        name: 'prompt',
        mounted() {
            window.scrollTo(0,0);
            setInterval(() => {
                if (this.prompt.show) {
                    window.scrollTo(0,0);
                    let obj = document.querySelector('#prompt-focus');
                    if(obj){
                        obj.focus();
                    }
                }
            }, 200);
        },
        computed: {
            ...mapState("modal", [
                "prompt"
            ]),
        },
        data() {
            return {
                value: ""
            }
        },
        methods: {
            cancel: function () {
                this.value = "";
                this.aPrompt({
                    show: false,
                })
            },
            confirm: function () {
                this.aPrompt({
                    show: false,
                    isConfirm: true,
                    value: this.value,
                });
                this.value = "";
            },
            ...mapActions('modal', [
                'aPrompt'
            ]),
        }
    }
</script>
<style scoped>
    @import "../../assets/css/components/modal/pwdpopup.css";
</style>
