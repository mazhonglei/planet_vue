import {ethers} from 'ethers';
import {Provider} from "../base";
import web3Config from "@/assets/js/config/web3";

let provider = Provider.VNS;
let abi = web3Config.abi.BancorNetwork;
let Bnt_address = web3Config.address.BancorNetwork;
let Etn_address = web3Config.address.EtherToken;


// 购买
export async function Bnt_buy({smt_address, privateKey, vns, gasPrice}) {
    let wallet = new ethers.Wallet(privateKey, provider);
    let contract = new ethers.Contract(Bnt_address, abi, provider);
    let contractWithSigner = contract.connect(wallet);

    let overrides = {
        value: ethers.utils.parseEther(vns.toString()),
        gasPrice: ethers.utils.bigNumberify((gasPrice * 10 ** 9).toString()),
    };
    let tx = await contractWithSigner.convertFor(
        [Etn_address, smt_address, smt_address],
        ethers.utils.parseEther(vns.toString()),
        ethers.utils.parseEther('0.001'),
        wallet.address,
        overrides
    );
    await tx.wait();
    return 1;
}