import {ethers} from 'ethers';
import {Provider} from "../base";
import web3Config from "@/assets/js/config/web3";

let provider = Provider.VNS;
let abi = web3Config.abi.SmartToken;
// let contractWithSigner = contract.connect(wallet);

/*
 * 智能token 权限拥有者
 */
export async function Smt_totalSupply(smt_addr) {
    let contract = new ethers.Contract(smt_addr, abi, provider);
    contract.totalSupply().then((res) => console.log(res.toString()));
}


export async function Smt_balanceOf(smt_addr, addr) {
    let contract = new ethers.Contract(smt_addr, abi, provider);
    let res = await contract.balanceOf(addr);
    return res.toString();
}

export async function Smt_owner(smt_addr) {
    let contract = new ethers.Contract(smt_addr, abi, provider);
    return await contract.owner();
}

// 授权给bancorNetwork，进行币卖出
export async function Smt_approve({smt_addr, privateKey, gasPrice}) {
    let wallet = new ethers.Wallet(privateKey, provider);
    let contract = new ethers.Contract(smt_addr, abi, provider);
    let contractWithSigner = contract.connect(wallet);

    let overrides = {
        gasPrice: ethers.utils.bigNumberify((gasPrice * 10 ** 9).toString()),
    };
    let tx = await contractWithSigner.approve(
        web3Config.address.BancorNetwork,
        ethers.utils.parseEther('1000000000'),
        overrides
    );
    await tx.wait();
    return 1;
}

// 查询是否授权过
export async function Smt_allowance(smt_addr, addr) {
    let contract = new ethers.Contract(smt_addr, abi, provider);
    return await contract.allowance(addr, web3Config.address.BancorNetwork);
}

export async function Smt_transfer({smt_addr, to, privateKey, amount, gasPrice}) {
    let wallet = new ethers.Wallet(privateKey, provider);
    let contract = new ethers.Contract(smt_addr, abi, provider);
    let contractWithSigner = contract.connect(wallet);

    let overrides = {
        gasPrice: ethers.utils.bigNumberify((gasPrice * 10 ** 9).toString()),
    };
    let tx = await contractWithSigner.transfer(
        to,
        ethers.utils.parseEther(amount),
        overrides
    );
    await tx.wait();
    return 1;
}