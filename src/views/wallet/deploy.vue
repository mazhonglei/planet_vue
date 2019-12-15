<template>
    <transition>
        <div>
            <div class="body" id="wallet" style="padding-bottom: 30px;">

                <div class="deploy">
                    <div :class="{active:index==0}" @click="index=0">EtherToken</div>
                    <div :class="{active:index==1}" @click="index=1">SmartToken</div>
                    <div :class="{active:index==2}" @click="index=2">Common</div>
                    <div :class="{active:index==3}" @click="index=3">BancorNetwork</div>
                    <div :class="{active:index==4}" @click="index=4">BancorConverter</div>
                </div>
                <div class="deploy_content">
                    <div v-show="index==0">
                        <div class="hide_deploy">
                            <div class="btn_left">Etn_deploy</div>
                        </div>
                        <div class="hide_deploy">
                            <div class="btn_left" @click="Etn_balanceOf(EtherToken.balanceOf)">Etn_balanceOf</div>
                            <label>
                                <input type="text" class="put" v-model="EtherToken.balanceOf">
                            </label>
                        </div>
                        <div class="hide_deploy">
                            <div class="btn_left" @click="Etn_deposit">Etn_deposit</div>
                            <label>
                                <input type="text" class="put">
                            </label>
                        </div>
                        <div class="hide_deploy">
                            <div class="btn_left" @click="Etn_transfer">Etn_transfer</div>
                            <label>
                                <input type="text" class="put">
                            </label>
                        </div>
                    </div>
                    <div v-show="index==1">
                        <div class="hide_deploy">
                            <div class="btn_left" @click="Smt_deploy()">Smt_deploy</div>
                        </div>
                        <div class="hide_deploy">
                            <div class="btn_left" @click="Smt_owner()">Smt_owner</div>
                        </div>
                        <div class="hide_deploy">
                            <div class="btn_left" @click="Smt_totalSupply()">Smt_totalSupply</div>
                        </div>
                        <div class="hide_deploy">
                            <div class="btn_left" @click="Smt_issue()">Smt_issue</div>
                            <label>
                                <input type="text" class="put">
                            </label>
                        </div>
                        <div class="hide_deploy">
                            <div class="btn_left" @click="Smt_balanceOf(smt.balanceOf)">Smt_balanceOf</div>
                            <label>
                                <input type="text" class="put" v-model="smt.balanceOf">
                            </label>
                        </div>
                        <div class="hide_deploy">
                            <div class="btn_left" @click="Smt_allowance(smt.from, smt.to)">Smt_allowance</div>
                            <label>
                                <input type="text" class="put" v-model="smt.from">
                            </label>
                            <label>
                                <input type="text" class="textPut" v-model="smt.to">
                            </label>
                        </div>
                        <div class="hide_deploy">
                            <div class="btn_left" @click="Smt_transferOwnership()">Smt_transferOwnership</div>
                            <label>
                                <input type="text" class="put">
                            </label>
                        </div>
                        <div class="hide_deploy">
                            <div class="btn_left" @click="Smt_acceptOwnership()">Smt_acceptOwnership</div>
                        </div>

                    </div>
                    <div v-show="index==2">
                        <div class="hide_deploy">
                            <div class="btn_left">Whitelist</div>
                            <label>
                                <input type="text" class="put">
                            </label>
                        </div>
                        <div class="hide_deploy">
                            <div class="btn_left">ContractFeatures</div>
                            <label>
                                <input type="text" class="put">
                            </label>
                        </div>
                        <div class="hide_deploy">
                            <div class="btn_left">ContractIds</div>
                            <label>
                                <input type="text" class="put">
                            </label>
                        </div>

                        <div class="hide_deploy">
                            <div class="btn_left">ContractRegistry</div>
                            <label>
                                <input type="text" class="put">
                            </label>
                        </div>
                        <div class="hide_deploy">
                            <div class="btn_left">BancorGasPriceLimit</div>
                            <label>
                                <input type="text" class="put">
                            </label>
                        </div>

                        <div class="hide_deploy">
                            <div class="btn_left">BancorFormula</div>
                            <label>
                                <input type="text" class="put">
                            </label>
                        </div>

                        <div class="hide_deploy">
                            <div class="btn_left">Cr_registerAddress</div>
                            <label>
                                <input type="text" class="put">
                            </label>
                            <label>
                                <input type="text" class="crPut">
                            </label>
                        </div>

                        <div class="hide_deploy">
                            <div class="btn_left">Cr_getAddress</div>
                            <label>
                                <input type="text" class="put">
                            </label>
                        </div>

                        <div class="hide_deploy">
                            <div class="btn_left">Balance</div>
                            <label>
                                <input type="text" class="put">
                            </label>
                        </div>

                    </div>
                    <div v-show="index==3 ">
                        <div class="hide_deploy">
                            <div class="btn_left">Bnt_deploy</div>
                        </div>

                        <div class="hide_deploy">
                            <div class="btn_left">Bnt_registerEtherToken</div>
                            <label>
                                <input type="text" class="put">
                            </label>
                        </div>
                        <div class="hide_deploy">
                            <div class="btn_left">Bnt_buy</div>
                            <label>
                                <input type="text" class="put">
                            </label>
                            <label>
                                <input type="text" class="textPut">
                            </label>
                            <label>
                                <input type="text" class="textPut">
                            </label>
                        </div>

                    </div>
                    <div v-show="index==4 ">
                        <div class="hide_deploy">
                            <div class="btn_left" @click="Bcv_deploy">Bcv_deploy</div>
                        </div>
                        <div class="hide_deploy">
                            <div class="btn_left" @click="Bcv_acceptTokenOwnership">Bcv_acceptTokenOwnership</div>
                        </div>

                        <div class="hide_deploy">
                            <div class="btn_left">Bcv_transferTokenOwnership</div>
                            <label>
                                <input type="text" class="put" v-model="BancorConverter.transferOwnerAddr" @click="Bcv_transferTokenOwnership(BancorConverter.transferOwnerAddr)">
                            </label>
                        </div>
                        <div class="hide_deploy">
                            <div class="btn_left">Bcv_getReturn</div>
                            <label>
                                <input type="text" class="put" placeholder="from" v-model="BancorConverter.getReturn.from">
                            </label>
                            <label>
                                <input type="text" class="textPut" placeholder="to" v-model="BancorConverter.getReturn.to">
                            </label>
                            <label>
                                <input type="text" class="textPut" placeholder="amount" v-model="BancorConverter.getReturn.amount">
                            </label>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import {Etn_deploy, Etn_balanceOf, Etn_deposit, Etn_transfer} from "@/assets/js/etherjs/deploy/EtherToken"
    import {Smt_allowance, Smt_deploy, Smt_totalSupply, Smt_owner, Smt_issue, Smt_transferOwnership, Smt_acceptOwnership, Smt_balanceOf} from "@/assets/js/etherjs/deploy/SmartToken"
    import {
        Whitelist, ContractFeatures, ContractIds, ContractRegistry, BancorGasPriceLimit,
        BancorFormula, Cr_registerAddress, Cr_getAddress, Balance
    } from "@/assets/js/etherjs/deploy/Common"
    import {Bnt_deploy, Bnt_registerEtherToken, Bnt_buy} from "@/assets/js/etherjs/deploy/BancorNetwork"
    import {Bcv_deploy, Bcv_acceptTokenOwnership, Bcv_transferTokenOwnership, Bcv_getReturn} from "@/assets/js/etherjs/deploy/BancorConverter"


    export default {
        name: "deploy",
        data() {
            return {
                ContractRegistryAddr: "",
                index: 0,
                BancorConverter: {
                    transferOwnerAddr: "",
                    getReturn: {
                        from: "",
                        to: "",
                        amount: 0
                    }
                },
                EtherToken: {
                    balanceOf: "",
                },
                smt: {
                    balanceOf: "",
                    from: "",
                    to: ""
                }
            }
        },
        created() {
        },

        methods: {
            Etn_deploy, Etn_balanceOf, Etn_deposit, Etn_transfer,
            Smt_deploy, Smt_owner, Smt_issue, Smt_transferOwnership, Smt_acceptOwnership, Smt_totalSupply, Smt_balanceOf, Smt_allowance,
            Whitelist, ContractFeatures, ContractIds, ContractRegistry, BancorGasPriceLimit, BancorFormula, Cr_registerAddress, Cr_getAddress, Balance,
            Bnt_deploy, Bnt_registerEtherToken, Bnt_buy,
            Bcv_deploy, Bcv_acceptTokenOwnership, Bcv_transferTokenOwnership, Bcv_getReturn
        },

    }
</script>

<style lang="scss">
    @import "../../assets/css/wallet/deploy";

    .button {
        width: 100%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background: white;
        border: 1px solid #ffffff;
        font-size: 14px;
        margin-top: 15px;
    }

    .active {
        color: #411E60 !important;
        border-bottom: 0.04rem solid #411E60;
    }
</style>
