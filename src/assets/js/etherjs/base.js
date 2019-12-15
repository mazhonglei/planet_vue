import {ethers} from 'ethers';
import web3Config from "@/assets/js/config/web3";


let VNSProvider = new ethers.providers.JsonRpcProvider(web3Config.provider.VNS, {chainId: 2018});
let ETHProvider = new ethers.providers.JsonRpcProvider(web3Config.provider.ETH);

export let Provider = {
    VNS: VNSProvider, ETH: ETHProvider
};