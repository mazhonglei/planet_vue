import {ethers} from 'ethers';
import {Provider} from "../base";
import web3Config from "@/assets/js/config/web3";

let provider = Provider.VNS;
// let Bcv_address = web3Config.address.BancorConverter;
let abi = web3Config.abi.BancorConverter;
let Etn_address = web3Config.address.EtherToken;

// 预计购买返回
export async function Bcv_getPurchaseReturn(Bcv_address, amount) {
    let contract = new ethers.Contract(Bcv_address, abi, provider);
    return await contract.getPurchaseReturn(Etn_address, ethers.utils.parseEther(amount.toString()))
}

// 购买
export async function Bcv_purchase({smt_address, amount, privateKey, gasPrice, Bcv_address}) {
    console.log({smt_address, amount, privateKey, gasPrice, Bcv_address});
    let wallet = new ethers.Wallet(privateKey, provider);
    let contract = new ethers.Contract(Bcv_address, abi, provider);
    let contractWithSigner = contract.connect(wallet);

    let overrides = {
        gasPrice: ethers.utils.bigNumberify((gasPrice * 10 ** 9).toString()),
        value: ethers.utils.parseEther(amount.toString()),
    };
    let tx = await contractWithSigner.convert(
        Etn_address, smt_address,
        ethers.utils.parseEther(amount.toString()),
        ethers.utils.parseEther('0.001'),
        overrides
    );
    await tx.wait();
    return 1;
}


// 预计卖出返回
export async function Bcv_getSaleReturn(Bcv_address, amount) {
    let contract = new ethers.Contract(Bcv_address, abi, provider);
    return await contract.getSaleReturn(Etn_address, ethers.utils.parseEther(amount.toString()))
}

// 卖出
export async function Bcv_sale({smt_address, amount, privateKey, gasPrice, Bcv_address}) {
    let wallet = new ethers.Wallet(privateKey, provider);
    let contract = new ethers.Contract(Bcv_address, abi, provider);
    let contractWithSigner = contract.connect(wallet);

    let overrides = {
        gasPrice: ethers.utils.bigNumberify((gasPrice * 10 ** 9).toString()),
    };
    let tx = await contractWithSigner.convert(
        smt_address, Etn_address,
        ethers.utils.parseEther(amount.toString()),
        ethers.utils.parseEther('0.001'),
        overrides
    );
    await tx.wait();
    return 1;
}

