import {ethers} from 'ethers';
import {Provider} from "../base";

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
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
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
        "inputs": [],
        "name": "deposit",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "withdraw",
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
        "name": "withdrawTo",
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
let bytecode = "0x60c0604052600960808190527f546f6b656e20302e31000000000000000000000000000000000000000000000060a090815262000040916002919062000186565b50604080516020810191829052600090819052620000619160039162000186565b50604080516020810191829052600090819052620000829160049162000186565b506005805460ff1916905560006006553480156200009f57600080fd5b50604080518082018252600b81527f457468657220546f6b656e0000000000000000000000000000000000000000006020808301919091528251808401909352600383527f45544800000000000000000000000000000000000000000000000000000000009083015260008054600160a060020a03191633178155815191929160129110801562000131575060008251115b15156200013d57600080fd5b82516200015290600390602086019062000186565b5081516200016890600490602085019062000186565b506005805460ff191660ff92909216919091179055506200022b9050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10620001c957805160ff1916838001178555620001f9565b82800160010185558215620001f9579182015b82811115620001f9578251825591602001919060010190620001dc565b50620002079291506200020b565b5090565b6200022891905b8082111562000207576000815560010162000212565b90565b610df7806200023b6000396000f3006080604052600436106100fb5763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166306fdde038114610105578063095ea7b31461018f57806318160ddd146101d4578063205c2878146101fb57806323b872dd1461022c5780632e1a7d4d14610263578063313ce5671461027b5780635a3b7e42146102a65780635e35359e146102bb57806370a08231146102f257806379ba5097146103205780638da5cb5b1461033557806395d89b4114610373578063a9059cbb14610388578063d0e30db0146100fb578063d4ee1d90146103b9578063dd62ed3e146103ce578063f2fde38b14610402575b610103610430565b005b34801561011157600080fd5b5061011a6104d6565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561015457818101518382015260200161013c565b50505050905090810190601f1680156101815780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561019b57600080fd5b506101c073ffffffffffffffffffffffffffffffffffffffff60043516602435610582565b604080519115158252519081900360200190f35b3480156101e057600080fd5b506101e9610662565b60408051918252519081900360200190f35b34801561020757600080fd5b5061010373ffffffffffffffffffffffffffffffffffffffff60043516602435610668565b34801561023857600080fd5b506101c073ffffffffffffffffffffffffffffffffffffffff60043581169060243516604435610779565b34801561026f57600080fd5b506101036004356107bd565b34801561028757600080fd5b506102906107ca565b6040805160ff9092168252519081900360200190f35b3480156102b257600080fd5b5061011a6107d3565b3480156102c757600080fd5b5061010373ffffffffffffffffffffffffffffffffffffffff60043581169060243516604435610849565b3480156102fe57600080fd5b506101e973ffffffffffffffffffffffffffffffffffffffff600435166108dc565b34801561032c57600080fd5b506101036108ee565b34801561034157600080fd5b5061034a6109a8565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b34801561037f57600080fd5b5061011a6109c4565b34801561039457600080fd5b506101c073ffffffffffffffffffffffffffffffffffffffff60043516602435610a3d565b3480156103c557600080fd5b5061034a610a7f565b3480156103da57600080fd5b506101e973ffffffffffffffffffffffffffffffffffffffff60043581169060243516610a9b565b34801561040e57600080fd5b5061010373ffffffffffffffffffffffffffffffffffffffff60043516610ab8565b3360009081526007602052604090205461044a9034610b48565b336000908152600760205260409020556006546104679034610b48565b6006556040805134815290517f9386c90217c323f58030f9dadcbc938f807a940f4ff41cd4cead9562f5da7dc39181900360200190a1604080513481529051339130917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9181900360200190a3565b6003805460408051602060026001851615610100027fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0190941693909304601f8101849004840282018401909252818152929183018282801561057a5780601f1061054f5761010080835404028352916020019161057a565b820191906000526020600020905b81548152906001019060200180831161055d57829003601f168201915b505050505081565b60008273ffffffffffffffffffffffffffffffffffffffff811615156105a757600080fd5b8215806105e2575033600090815260086020908152604080832073ffffffffffffffffffffffffffffffffffffffff88168452909152902054155b15156105ed57600080fd5b33600081815260086020908152604080832073ffffffffffffffffffffffffffffffffffffffff891680855290835292819020879055805187815290519293927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925929181900390910190a35060019392505050565b60065481565b8173ffffffffffffffffffffffffffffffffffffffff811630141561068c57600080fd5b336000908152600760205260409020546106a69083610b5e565b336000908152600760205260409020556006546106c39083610b5e565b60065560405173ffffffffffffffffffffffffffffffffffffffff84169083156108fc029084906000818181858888f19350505050158015610709573d6000803e3d6000fd5b50604080518381529051309133917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9181900360200190a36040805183815290517f9a1b418bc061a5d80270261562e6986a35d995f8051145f277be16103abd34539181900360200190a1505050565b60008273ffffffffffffffffffffffffffffffffffffffff811630141561079f57600080fd5b6107aa858585610b70565b15156107b257fe5b506001949350505050565b6107c73382610668565b50565b60055460ff1681565b600280546040805160206001841615610100027fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff01909316849004601f8101849004840282018401909252818152929183018282801561057a5780601f1061054f5761010080835404028352916020019161057a565b60005473ffffffffffffffffffffffffffffffffffffffff16331461086a57fe5b8273ffffffffffffffffffffffffffffffffffffffff8116151561088d57600080fd5b8273ffffffffffffffffffffffffffffffffffffffff811615156108b057600080fd5b8373ffffffffffffffffffffffffffffffffffffffff81163014156108d457600080fd5b505050505050565b60076020526000908152604090205481565b60015473ffffffffffffffffffffffffffffffffffffffff16331461091257600080fd5b6001546000805460405173ffffffffffffffffffffffffffffffffffffffff93841693909116917f343765429aea5a34b3ff6a3785a98a5abb2597aca87bfbb58632c173d585373a91a360018054600080547fffffffffffffffffffffffff000000000000000000000000000000000000000090811673ffffffffffffffffffffffffffffffffffffffff841617909155169055565b60005473ffffffffffffffffffffffffffffffffffffffff1681565b6004805460408051602060026001851615610100027fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0190941693909304601f8101849004840282018401909252818152929183018282801561057a5780601f1061054f5761010080835404028352916020019161057a565b60008273ffffffffffffffffffffffffffffffffffffffff8116301415610a6357600080fd5b610a6d8484610ce7565b1515610a7557fe5b5060019392505050565b60015473ffffffffffffffffffffffffffffffffffffffff1681565b600860209081526000928352604080842090915290825290205481565b60005473ffffffffffffffffffffffffffffffffffffffff163314610ad957fe5b60005473ffffffffffffffffffffffffffffffffffffffff82811691161415610b0157600080fd5b600180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b600082820183811015610b5757fe5b9392505050565b600081831015610b6a57fe5b50900390565b60008373ffffffffffffffffffffffffffffffffffffffff81161515610b9557600080fd5b8373ffffffffffffffffffffffffffffffffffffffff81161515610bb857600080fd5b73ffffffffffffffffffffffffffffffffffffffff86166000908152600860209081526040808320338452909152902054610bf39085610b5e565b73ffffffffffffffffffffffffffffffffffffffff8716600081815260086020908152604080832033845282528083209490945591815260079091522054610c3b9085610b5e565b73ffffffffffffffffffffffffffffffffffffffff8088166000908152600760205260408082209390935590871681522054610c779085610b48565b73ffffffffffffffffffffffffffffffffffffffff80871660008181526007602090815260409182902094909455805188815290519193928a16927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a350600195945050505050565b60008273ffffffffffffffffffffffffffffffffffffffff81161515610d0c57600080fd5b33600090815260076020526040902054610d269084610b5e565b336000908152600760205260408082209290925573ffffffffffffffffffffffffffffffffffffffff861681522054610d5f9084610b48565b73ffffffffffffffffffffffffffffffffffffffff85166000818152600760209081526040918290209390935580518681529051919233927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a350600193925050505600a165627a7a723058208d495e8b3cecd6f7ba617287e93e3e472b28aec057dd6bc96ec9243e509f18620029";
let contract = new ethers.Contract("0x7F3D1eA53612F293A77F54d1Bd26E70801d7e2A9", abi, provider);
let contractWithSigner = contract.connect(wallet);

//0x7F3D1eA53612F293A77F54d1Bd26E70801d7e2A9
export async function Etn_deploy() {
    let factory = new ethers.ContractFactory(abi, bytecode, wallet);
    let contract = await factory.deploy();
    console.log("EtherToken address：" + contract.address);
    console.log(contract.deployTransaction.hash);
    await contract.deployed()
}

export async function Etn_balanceOf(address) {
    contract.balanceOf(address).then((res) => console.log(res.toString() / 10 ** 18));
}

// etherToken 充值转账
export async function Etn_deposit() {
    let overrides = {
        value: ethers.utils.parseEther('20'),
    };
    let tx = await contractWithSigner.deposit(
        overrides
    );
    tx.wait().catch(() => {
        contract.balanceOf(wallet.address).then((res) => console.log(res.toString()));
    });
}

// etherToken 转账
export async function Etn_transfer() {
    let tx = await contractWithSigner.transfer(
        "0xff5188F903Baf00cC045430084465dA99E497583",
        ethers.utils.parseEther('20'),
    );
    contract.balanceOf("0xff5188F903Baf00cC045430084465dA99E497583").then((res) => console.log(res.toString()));
    await tx.wait();
    contract.balanceOf("0xff5188F903Baf00cC045430084465dA99E497583").then((res) => console.log(res.toString()));
}

