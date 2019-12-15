import {Provider} from "./base";
import {ethers} from 'ethers';

export function getVNSBalance(address) {
    return Provider.VNS.getBalance(address).then((balance) => {
        // balance is a BigNumber (in wei); format is as a sting (in ether)
        return ethers.utils.formatEther(balance);
    });
}

export async function getGasPrice() {
    return await Provider.VNS.getGasPrice();
}

export async function getTransaction(txHash) {
    return await Provider.VNS.getTransaction(txHash);
}

export async function getTransactionReceipt(txHash) {
    return await Provider.VNS.getTransactionReceipt(txHash);
}


