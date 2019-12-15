import {Provider} from "./base";
import {ethers} from 'ethers';

export async function transferVNS({privateKey, to, gasPrice, value}) {
    let wallet = new ethers.Wallet(privateKey, Provider.VNS);
    let overrides = {
        to: to,
        gasPrice: ethers.utils.bigNumberify((gasPrice * 10 ** 9).toString()),
        value: ethers.utils.parseEther(value),
    };
    let tx = await wallet.sendTransaction(overrides);
    await tx.wait();
}