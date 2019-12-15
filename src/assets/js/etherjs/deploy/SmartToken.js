import {ethers} from 'ethers';
import {Provider} from "../base";
import web3Config from "@/assets/js/config/web3";

let provider = Provider.VNS;
let privateKey = '310F05F0103F8055C07484E7EBB0C2D9E58AD3F79F5AEEB23924597507AF0AB8';
let wallet = new ethers.Wallet(privateKey, provider);
let abi = [
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "version",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "standard",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_token",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "withdrawTokens",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "acceptOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "transfersEnabled",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "newOwner",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            },
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "_name",
                "type": "string"
            },
            {
                "name": "_symbol",
                "type": "string"
            },
            {
                "name": "_decimals",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "_token",
                "type": "address"
            }
        ],
        "name": "NewSmartToken",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "Issuance",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "Destruction",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "_from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "_to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "_owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "_spender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "_prevOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "_newOwner",
                "type": "address"
            }
        ],
        "name": "OwnerUpdate",
        "type": "event"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_disable",
                "type": "bool"
            }
        ],
        "name": "disableTransfers",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "issue",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "destroy",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];
let bytecode = "0x60c0604052600960808190527f546f6b656e20302e31000000000000000000000000000000000000000000000060a0908152620000409160029190620001d6565b506040805160208101918290526000908190526200006191600391620001d6565b506040805160208101918290526000908190526200008291600491620001d6565b506005805460ff1916905560006006556040805180820190915260038082527f302e3300000000000000000000000000000000000000000000000000000000006020909201918252620000d891600991620001d6565b50600a805460ff19166001179055348015620000f357600080fd5b50604051620010a7380380620010a7833981016040908152815160208301519183015160008054600160a060020a0319163317815591840180519094939093019290918491849184911180156200014b575060008251115b15156200015757600080fd5b82516200016c906003906020860190620001d6565b50815162000182906004906020850190620001d6565b506005805460ff90921660ff1990921691909117905550506040805130815290517ff4cd1f8571e8d9c97ffcb81558807ab73f9803d54de5da6a0420593c82a4a9f09181900360200190a15050506200027b565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200021957805160ff191683800117855562000249565b8280016001018555821562000249579182015b82811115620002495782518255916020019190600101906200022c565b50620002579291506200025b565b5090565b6200027891905b8082111562000257576000815560010162000262565b90565b610e1c806200028b6000396000f3006080604052600436106101115763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166306fdde038114610116578063095ea7b3146101a05780631608f18f146101e557806318160ddd1461020157806323b872dd14610228578063313ce5671461025f57806354fd4d501461028a5780635a3b7e421461029f5780635e35359e146102b457806370a08231146102eb57806379ba509714610319578063867904b41461032e5780638da5cb5b1461035f57806395d89b411461039d578063a24835d1146103b2578063a9059cbb146103e3578063bef97c8714610414578063d4ee1d9014610429578063dd62ed3e1461043e578063f2fde38b14610472575b600080fd5b34801561012257600080fd5b5061012b6104a0565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561016557818101518382015260200161014d565b50505050905090810190601f1680156101925780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156101ac57600080fd5b506101d173ffffffffffffffffffffffffffffffffffffffff6004351660243561054c565b604080519115158252519081900360200190f35b3480156101f157600080fd5b506101ff600435151561062c565b005b34801561020d57600080fd5b50610216610650565b60408051918252519081900360200190f35b34801561023457600080fd5b506101d173ffffffffffffffffffffffffffffffffffffffff60043581169060243516604435610656565b34801561026b57600080fd5b50610274610671565b6040805160ff9092168252519081900360200190f35b34801561029657600080fd5b5061012b61067a565b3480156102ab57600080fd5b5061012b6106f3565b3480156102c057600080fd5b506101ff73ffffffffffffffffffffffffffffffffffffffff60043581169060243516604435610769565b3480156102f757600080fd5b5061021673ffffffffffffffffffffffffffffffffffffffff600435166107fc565b34801561032557600080fd5b506101ff61080e565b34801561033a57600080fd5b506101ff73ffffffffffffffffffffffffffffffffffffffff600435166024356108c8565b34801561036b57600080fd5b50610374610a21565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b3480156103a957600080fd5b5061012b610a3d565b3480156103be57600080fd5b506101ff73ffffffffffffffffffffffffffffffffffffffff60043516602435610ab6565b3480156103ef57600080fd5b506101d173ffffffffffffffffffffffffffffffffffffffff60043516602435610be6565b34801561042057600080fd5b506101d1610c12565b34801561043557600080fd5b50610374610c1b565b34801561044a57600080fd5b5061021673ffffffffffffffffffffffffffffffffffffffff60043581169060243516610c37565b34801561047e57600080fd5b506101ff73ffffffffffffffffffffffffffffffffffffffff60043516610c54565b6003805460408051602060026001851615610100027fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0190941693909304601f810184900484028201840190925281815292918301828280156105445780601f1061051957610100808354040283529160200191610544565b820191906000526020600020905b81548152906001019060200180831161052757829003601f168201915b505050505081565b60008273ffffffffffffffffffffffffffffffffffffffff8116151561057157600080fd5b8215806105ac575033600090815260086020908152604080832073ffffffffffffffffffffffffffffffffffffffff88168452909152902054155b15156105b757600080fd5b33600081815260086020908152604080832073ffffffffffffffffffffffffffffffffffffffff891680855290835292819020879055805187815290519293927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925929181900390910190a35060019392505050565b60005473ffffffffffffffffffffffffffffffffffffffff16331461064d57fe5b50565b60065481565b600a5460009060ff16151561066757fe5b5060019392505050565b60055460ff1681565b6009805460408051602060026001851615610100027fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0190941693909304601f810184900484028201840190925281815292918301828280156105445780601f1061051957610100808354040283529160200191610544565b600280546040805160206001841615610100027fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff01909316849004601f810184900484028201840190925281815292918301828280156105445780601f1061051957610100808354040283529160200191610544565b60005473ffffffffffffffffffffffffffffffffffffffff16331461078a57fe5b8273ffffffffffffffffffffffffffffffffffffffff811615156107ad57600080fd5b8273ffffffffffffffffffffffffffffffffffffffff811615156107d057600080fd5b8373ffffffffffffffffffffffffffffffffffffffff81163014156107f457600080fd5b505050505050565b60076020526000908152604090205481565b60015473ffffffffffffffffffffffffffffffffffffffff16331461083257600080fd5b6001546000805460405173ffffffffffffffffffffffffffffffffffffffff93841693909116917f343765429aea5a34b3ff6a3785a98a5abb2597aca87bfbb58632c173d585373a91a360018054600080547fffffffffffffffffffffffff000000000000000000000000000000000000000090811673ffffffffffffffffffffffffffffffffffffffff841617909155169055565b60005473ffffffffffffffffffffffffffffffffffffffff1633146108e957fe5b8173ffffffffffffffffffffffffffffffffffffffff8116151561090c57600080fd5b8273ffffffffffffffffffffffffffffffffffffffff811630141561093057600080fd5b61093c60065484610ce4565b60065573ffffffffffffffffffffffffffffffffffffffff841660009081526007602052604090205461096f9084610ce4565b73ffffffffffffffffffffffffffffffffffffffff851660009081526007602090815260409182902092909255805185815290517f9386c90217c323f58030f9dadcbc938f807a940f4ff41cd4cead9562f5da7dc3929181900390910190a160408051848152905173ffffffffffffffffffffffffffffffffffffffff86169130917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9181900360200190a350505050565b60005473ffffffffffffffffffffffffffffffffffffffff1681565b6004805460408051602060026001851615610100027fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0190941693909304601f810184900484028201840190925281815292918301828280156105445780601f1061051957610100808354040283529160200191610544565b3373ffffffffffffffffffffffffffffffffffffffff83161480610af1575060005473ffffffffffffffffffffffffffffffffffffffff1633145b1515610afc57600080fd5b73ffffffffffffffffffffffffffffffffffffffff8216600090815260076020526040902054610b2c9082610cfa565b73ffffffffffffffffffffffffffffffffffffffff8316600090815260076020526040902055600654610b5f9082610cfa565b600655604080518281529051309173ffffffffffffffffffffffffffffffffffffffff8516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9181900360200190a36040805182815290517f9a1b418bc061a5d80270261562e6986a35d995f8051145f277be16103abd34539181900360200190a15050565b600a5460009060ff161515610bf757fe5b610c018383610d0c565b1515610c0957fe5b50600192915050565b600a5460ff1681565b60015473ffffffffffffffffffffffffffffffffffffffff1681565b600860209081526000928352604080842090915290825290205481565b60005473ffffffffffffffffffffffffffffffffffffffff163314610c7557fe5b60005473ffffffffffffffffffffffffffffffffffffffff82811691161415610c9d57600080fd5b600180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b600082820183811015610cf357fe5b9392505050565b600081831015610d0657fe5b50900390565b60008273ffffffffffffffffffffffffffffffffffffffff81161515610d3157600080fd5b33600090815260076020526040902054610d4b9084610cfa565b336000908152600760205260408082209290925573ffffffffffffffffffffffffffffffffffffffff861681522054610d849084610ce4565b73ffffffffffffffffffffffffffffffffffffffff85166000818152600760209081526040918290209390935580518681529051919233927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a350600193925050505600a165627a7a723058209cb9fc5ab09c1271d8fa4fae88172a85bbbcc2bf2d85d5e36be691cd7892ac940029";
let contract = new ethers.Contract("0x99Dc2458914d9a39B530995305F1425a99D095e8", abi, provider);
let contractWithSigner = contract.connect(wallet);

//0xF85b1de7f129c678831B46c79a9052e68B6bE9b3

// smart token-2
// 0x99Dc2458914d9a39B530995305F1425a99D095e8
export async function Smt_deploy() {
    let factory = new ethers.ContractFactory(abi, bytecode, wallet);
    let contract = await factory.deploy("smart token-2", "sm2", 18);
    console.log("smartToken address：" + contract.address);
    console.log(contract.deployTransaction.hash);
    await contract.deployed();
    alert("smt 部署成功");
}

// 智能token 权限拥有者
export async function Smt_owner() {
    contract.owner().then((res) => console.log("owner：" + res));
    contract.newOwner().then((res) => console.log("newOwner：" + res));
}

// 智能token 权限拥有者
export async function Smt_totalSupply() {
    contract.totalSupply().then((res) => console.log(res.toString() / 10 ** 18));
}

// 智能token发行
export async function Smt_issue() {
    let tx = await contractWithSigner.issue(
        "0x80e468815d469F3548AAa347BF21DD0E78636fbc",
        ethers.utils.parseEther('20000'),
    );
    tx.wait().then(() => {
        contract.totalSupply().then((res) => console.log(res.toString()));
    }).catch((e) => {
        console.log(e);
    });
}

// 智能token转移权限
export async function Smt_transferOwnership() {
    let tx = await contractWithSigner.transferOwnership(
        "0xff5188F903Baf00cC045430084465dA99E497583"
    );
    tx.wait().then(() => {
        contract.newOwner().then((res) => console.log(res));
    }).catch((e) => {
        console.log(e)
    });
}

// 智能token接收权限
export async function Smt_acceptOwnership() {
    let tx = await contractWithSigner.acceptOwnership();
    tx.wait().catch((e) => {
        console.log(e);
        contract.owner().then((res) => console.log(res));
    });
}

export async function Smt_balanceOf(address) {
    contract.balanceOf(address).then((res) => console.log(res.toString() / 10 ** 18));
}

// 查询是否授权过
export async function Smt_allowance(address) {
    contract.allowance(address, web3Config.address.BancorNetwork).then((res)=>console.log(res.toString() / 10 ** 18));
}