import {ethers} from 'ethers';
import {Provider} from "../base";

let provider = Provider.VNS;
let privateKey = '310F05F0103F8055C07484E7EBB0C2D9E58AD3F79F5AEEB23924597507AF0AB8';
let wallet = new ethers.Wallet(privateKey, provider);


//0xC74c52E1D5126b81a5002B5fFD0b191600AAA935
export async function Whitelist() {
    let abi = [
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
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "_address",
                    "type": "address"
                }
            ],
            "name": "AddressAddition",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "_address",
                    "type": "address"
                }
            ],
            "name": "AddressRemoval",
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
            "constant": true,
            "inputs": [
                {
                    "name": "_address",
                    "type": "address"
                }
            ],
            "name": "isWhitelisted",
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
            "constant": false,
            "inputs": [
                {
                    "name": "_address",
                    "type": "address"
                }
            ],
            "name": "addAddress",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_addresses",
                    "type": "address[]"
                }
            ],
            "name": "addAddresses",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_address",
                    "type": "address"
                }
            ],
            "name": "removeAddress",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_addresses",
                    "type": "address[]"
                }
            ],
            "name": "removeAddresses",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];
    let bytecode = "0x608060405234801561001057600080fd5b5060008054600160a060020a03191633179055610699806100326000396000f3006080604052600436106100985763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416633628731c811461009d57806338eada1c146100f45780633af32abf146101225780634ba79dfe1461016457806379ba5097146101925780638da5cb5b146101a7578063a84eb999146101e5578063d4ee1d901461023a578063f2fde38b1461024f575b600080fd5b3480156100a957600080fd5b50604080516020600480358082013583810280860185019096528085526100f29536959394602494938501929182918501908490808284375094975061027d9650505050505050565b005b34801561010057600080fd5b506100f273ffffffffffffffffffffffffffffffffffffffff600435166102b5565b34801561012e57600080fd5b5061015073ffffffffffffffffffffffffffffffffffffffff600435166103b3565b604080519115158252519081900360200190f35b34801561017057600080fd5b506100f273ffffffffffffffffffffffffffffffffffffffff600435166103de565b34801561019e57600080fd5b506100f26104b7565b3480156101b357600080fd5b506101bc610571565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b3480156101f157600080fd5b50604080516020600480358082013583810280860185019096528085526100f29536959394602494938501929182918501908490808284375094975061058d9650505050505050565b34801561024657600080fd5b506101bc6105c1565b34801561025b57600080fd5b506100f273ffffffffffffffffffffffffffffffffffffffff600435166105dd565b60005b81518110156102b1576102a9828281518110151561029a57fe5b906020019060200201516102b5565b600101610280565b5050565b60005473ffffffffffffffffffffffffffffffffffffffff1633146102d657fe5b8073ffffffffffffffffffffffffffffffffffffffff811615156102f957600080fd5b73ffffffffffffffffffffffffffffffffffffffff821660009081526002602052604090205460ff161561032c576102b1565b73ffffffffffffffffffffffffffffffffffffffff821660008181526002602090815260409182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00166001179055815192835290517f2c51f80053e9ee7518567e43b2f8e8b48f50cf10daede6d11893df9ad49e4a8a9281900390910190a15050565b73ffffffffffffffffffffffffffffffffffffffff1660009081526002602052604090205460ff1690565b60005473ffffffffffffffffffffffffffffffffffffffff1633146103ff57fe5b73ffffffffffffffffffffffffffffffffffffffff811660009081526002602052604090205460ff161515610433576104b4565b73ffffffffffffffffffffffffffffffffffffffff811660008181526002602090815260409182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00169055815192835290517f7ec2df28665f8610f9b1d2f74faae35dbc6bd58684a1194a6dfc31584953f03b9281900390910190a15b50565b60015473ffffffffffffffffffffffffffffffffffffffff1633146104db57600080fd5b6001546000805460405173ffffffffffffffffffffffffffffffffffffffff93841693909116917f343765429aea5a34b3ff6a3785a98a5abb2597aca87bfbb58632c173d585373a91a360018054600080547fffffffffffffffffffffffff000000000000000000000000000000000000000090811673ffffffffffffffffffffffffffffffffffffffff841617909155169055565b60005473ffffffffffffffffffffffffffffffffffffffff1681565b60005b81518110156102b1576105b982828151811015156105aa57fe5b906020019060200201516103de565b600101610590565b60015473ffffffffffffffffffffffffffffffffffffffff1681565b60005473ffffffffffffffffffffffffffffffffffffffff1633146105fe57fe5b60005473ffffffffffffffffffffffffffffffffffffffff8281169116141561062657600080fd5b600180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff929092169190911790555600a165627a7a7230582006e9ced43637dcf67bc880f3332f8909c9047ef14f5731acb8468b6c95e886a20029";
    let factory = new ethers.ContractFactory(abi, bytecode, wallet);
    let contract = await factory.deploy();
    console.log("Whitelist address：" + contract.address);
    console.log(contract.deployTransaction.hash);
    await contract.deployed()
}

//0x0E8eA7DDc4330112479eeCEa919BeAd7B1aC2d23
export async function ContractFeatures() {
    let abi = [
        {
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "_address",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "_features",
                    "type": "uint256"
                }
            ],
            "name": "FeaturesAddition",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "_address",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "_features",
                    "type": "uint256"
                }
            ],
            "name": "FeaturesRemoval",
            "type": "event"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_contract",
                    "type": "address"
                },
                {
                    "name": "_features",
                    "type": "uint256"
                }
            ],
            "name": "isSupported",
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
            "constant": false,
            "inputs": [
                {
                    "name": "_features",
                    "type": "uint256"
                },
                {
                    "name": "_enable",
                    "type": "bool"
                }
            ],
            "name": "enableFeatures",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];
    let bytecode = "0x608060405234801561001057600080fd5b506101d8806100206000396000f30060806040526004361061004b5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416632c7077c08114610050578063a5fbf2871461006f575b600080fd5b34801561005c57600080fd5b5061006d60043560243515156100b4565b005b34801561007b57600080fd5b506100a073ffffffffffffffffffffffffffffffffffffffff6004351660243561017e565b604080519115158252519081900360200190f35b801561011b576100c4338361017e565b156100ce5761017a565b3360008181526020818152604091829020805486179055815185815291517f461f0180592d0fa11ece082775c5b037a96f6a5418f3f23d4ee4ee063b5c1aac9281900390910190a261017a565b610125338361017e565b15156101305761017a565b336000818152602081815260409182902080548619169055815185815291517f903f96a6f8c316bb88b30f8b641bd2aa80b6e92732bab4d1accf30e1d6eba89c9281900390910190a25b5050565b73ffffffffffffffffffffffffffffffffffffffff91909116600090815260208190526040902054811614905600a165627a7a7230582036353a6e90af297ac547e775525e0accc080711eeade80fd69d88ad6ab44cb4b0029";
    let factory = new ethers.ContractFactory(abi, bytecode, wallet);
    let contract = await factory.deploy();
    console.log("ContractFeatures address：" + contract.address);
    console.log(contract.deployTransaction.hash);
    await contract.deployed()
}

//0xa262ee04FC50fCc1257704521949bbB6e3550d1b
export async function ContractIds() {
    let abi = [
        {
            "constant": true,
            "inputs": [],
            "name": "BANCOR_FORMULA",
            "outputs": [
                {
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "CONTRACT_FEATURES",
            "outputs": [
                {
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "BANCOR_NETWORK",
            "outputs": [
                {
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ];
    let bytecode = "0x608060405234801561001057600080fd5b50610144806100206000396000f3006080604052600436106100565763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416636d7bd3fc811461005b57806383315b6e146100825780639232494e14610097575b600080fd5b34801561006757600080fd5b506100706100ac565b60408051918252519081900360200190f35b34801561008e57600080fd5b506100706100d0565b3480156100a357600080fd5b506100706100f4565b7f42616e636f72466f726d756c610000000000000000000000000000000000000081565b7f436f6e747261637446656174757265730000000000000000000000000000000081565b7f42616e636f724e6574776f726b00000000000000000000000000000000000000815600a165627a7a72305820ba5115dd9d4e1bf1ef9c20a2f5308a11212c432c9d9f342cf7184bc657292b340029";
    let factory = new ethers.ContractFactory(abi, bytecode, wallet);
    let contract = await factory.deploy();
    console.log("ContractIds address：" + contract.address);
    console.log(contract.deployTransaction.hash);
    await contract.deployed()
}

//0x70F9a2F90CD7e44d303A0F1c960361137E231151
export async function ContractRegistry() {
    let abi = [
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
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "_contractName",
                    "type": "bytes32"
                },
                {
                    "indexed": false,
                    "name": "_contractAddress",
                    "type": "address"
                }
            ],
            "name": "AddressUpdate",
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
            "constant": true,
            "inputs": [
                {
                    "name": "_contractName",
                    "type": "bytes32"
                }
            ],
            "name": "getAddress",
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
            "constant": false,
            "inputs": [
                {
                    "name": "_contractName",
                    "type": "bytes32"
                },
                {
                    "name": "_contractAddress",
                    "type": "address"
                }
            ],
            "name": "registerAddress",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];
    let bytecode = "0x608060405234801561001057600080fd5b5060008054600160a060020a031916331790556103dd806100326000396000f3006080604052600436106100775763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166321f8a721811461007c578063662de379146100bd57806379ba5097146100f05780638da5cb5b14610105578063d4ee1d901461011a578063f2fde38b1461012f575b600080fd5b34801561008857600080fd5b5061009460043561015d565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b3480156100c957600080fd5b506100ee60043573ffffffffffffffffffffffffffffffffffffffff60243516610185565b005b3480156100fc57600080fd5b506100ee61022f565b34801561011157600080fd5b506100946102e9565b34801561012657600080fd5b50610094610305565b34801561013b57600080fd5b506100ee73ffffffffffffffffffffffffffffffffffffffff60043516610321565b60009081526002602052604090205473ffffffffffffffffffffffffffffffffffffffff1690565b60005473ffffffffffffffffffffffffffffffffffffffff1633146101a657fe5b60008281526002602090815260409182902080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff85169081179091558251908152915184927ffc08d1253c81bcd5444fc7056ef1f5a5df4c9220b6fd70d7449267f1f0f2991892908290030190a25050565b60015473ffffffffffffffffffffffffffffffffffffffff16331461025357600080fd5b6001546000805460405173ffffffffffffffffffffffffffffffffffffffff93841693909116917f343765429aea5a34b3ff6a3785a98a5abb2597aca87bfbb58632c173d585373a91a360018054600080547fffffffffffffffffffffffff000000000000000000000000000000000000000090811673ffffffffffffffffffffffffffffffffffffffff841617909155169055565b60005473ffffffffffffffffffffffffffffffffffffffff1681565b60015473ffffffffffffffffffffffffffffffffffffffff1681565b60005473ffffffffffffffffffffffffffffffffffffffff16331461034257fe5b60005473ffffffffffffffffffffffffffffffffffffffff8281169116141561036a57600080fd5b600180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff929092169190911790555600a165627a7a723058203ac395c0cd2e33ea1c495bd15133ec8a2ffe588d144f6081cb8384d51f69ba6d0029";
    let factory = new ethers.ContractFactory(abi, bytecode, wallet);
    let contract = await factory.deploy();
    console.log("ContractRegistry address：" + contract.address);
    console.log(contract.deployTransaction.hash);
    await contract.deployed()
}

//0x6D5a9a51674691bb74Aefe63E4e0EFE783e35528
export async function BancorGasPriceLimit() {
    let abi = [
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
            "constant": true,
            "inputs": [],
            "name": "gasPrice",
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
            "inputs": [
                {
                    "name": "_gasPrice",
                    "type": "uint256"
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
                    "name": "_gasPrice",
                    "type": "uint256"
                }
            ],
            "name": "setGasPrice",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_gasPrice",
                    "type": "uint256"
                }
            ],
            "name": "validateGasPrice",
            "outputs": [],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ];
    let bytecode = "0x6080604052600060025534801561001557600080fd5b506040516020806103d9833981016040525160008054600160a060020a031916331781558190811161004657600080fd5b50600255610380806100596000396000f3006080604052600436106100825763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416636b4dff1f811461008757806379ba5097146100a15780638da5cb5b146100b6578063bf1fe420146100f4578063d4ee1d901461010c578063f2fde38b14610121578063fe173b971461014f575b600080fd5b34801561009357600080fd5b5061009f600435610176565b005b3480156100ad57600080fd5b5061009f610197565b3480156100c257600080fd5b506100cb610251565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b34801561010057600080fd5b5061009f60043561026d565b34801561011857600080fd5b506100cb6102a2565b34801561012d57600080fd5b5061009f73ffffffffffffffffffffffffffffffffffffffff600435166102be565b34801561015b57600080fd5b5061016461034e565b60408051918252519081900360200190f35b806000811161018457600080fd5b60025482111561019357600080fd5b5050565b60015473ffffffffffffffffffffffffffffffffffffffff1633146101bb57600080fd5b6001546000805460405173ffffffffffffffffffffffffffffffffffffffff93841693909116917f343765429aea5a34b3ff6a3785a98a5abb2597aca87bfbb58632c173d585373a91a360018054600080547fffffffffffffffffffffffff000000000000000000000000000000000000000090811673ffffffffffffffffffffffffffffffffffffffff841617909155169055565b60005473ffffffffffffffffffffffffffffffffffffffff1681565b60005473ffffffffffffffffffffffffffffffffffffffff16331461028e57fe5b806000811161029c57600080fd5b50600255565b60015473ffffffffffffffffffffffffffffffffffffffff1681565b60005473ffffffffffffffffffffffffffffffffffffffff1633146102df57fe5b60005473ffffffffffffffffffffffffffffffffffffffff8281169116141561030757600080fd5b600180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b600254815600a165627a7a72305820e8c515d551c38372c20456e6aa2eb0ea52b64d81159d98eee0ecb57953df308c0029";
    let factory = new ethers.ContractFactory(abi, bytecode, wallet);
    let contract = await factory.deploy(30000000000);
    console.log("BancorGasPriceLimit address：" + contract.address);
    console.log(contract.deployTransaction.hash);
    await contract.deployed()
}

//0x1DE92e95039Dde10381B80799f7F6eC7BbE94623
export async function BancorFormula() {
    let abi = [
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
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_supply",
                    "type": "uint256"
                },
                {
                    "name": "_connectorBalance",
                    "type": "uint256"
                },
                {
                    "name": "_connectorWeight",
                    "type": "uint32"
                },
                {
                    "name": "_depositAmount",
                    "type": "uint256"
                }
            ],
            "name": "calculatePurchaseReturn",
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
            "inputs": [
                {
                    "name": "_supply",
                    "type": "uint256"
                },
                {
                    "name": "_connectorBalance",
                    "type": "uint256"
                },
                {
                    "name": "_connectorWeight",
                    "type": "uint32"
                },
                {
                    "name": "_sellAmount",
                    "type": "uint256"
                }
            ],
            "name": "calculateSaleReturn",
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
            "inputs": [
                {
                    "name": "_fromConnectorBalance",
                    "type": "uint256"
                },
                {
                    "name": "_fromConnectorWeight",
                    "type": "uint32"
                },
                {
                    "name": "_toConnectorBalance",
                    "type": "uint256"
                },
                {
                    "name": "_toConnectorWeight",
                    "type": "uint32"
                },
                {
                    "name": "_amount",
                    "type": "uint256"
                }
            ],
            "name": "calculateCrossConnectorReturn",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ];
    let bytecode = "0x60c0604052600360808190527f302e33000000000000000000000000000000000000000000000000000000000060a0908152620000409160009190620007f7565b503480156200004e57600080fd5b506001606060020a641c35fedd1502036021556001605e60020a646c3390ecc902036022556001606160020a640cf801476102036023556001605f60020a6431bdb23e1d02036024556001605b60020a6502fb1d8fe08302036025556001605a60020a6505b771955b3702036026556001605960020a650af67a93bb5102036027556001605860020a6515060c256cb302036028556001605860020a651428a2f98d7302036029556001605660020a654d51566397090203602a556001605560020a65944620b0e70f0203602b557011c592761c666fffffffffffffffffffff602c5570110a688680a757ffffffffffffffffffff602d55701056f1b5bedf77ffffffffffffffffffff602e55700faadceceeff8bffffffffffffffffffff602f55700f05dc6b27edadffffffffffffffffffff603055700e67a5a25da4107fffffffffffffffffff603155700dcff115b14eedffffffffffffffffffff603255700d3e7a392431239fffffffffffffffffff603355700cb2ff529eb71e4fffffffffffffffffff603455700c2d415c3db974afffffffffffffffffff603555700bad03e7d883f69bffffffffffffffffff603655700b320d03b2c343d5ffffffffffffffffff603755700abc25204e02828dffffffffffffffffff603855700a4b16f74ee4bb207fffffffffffffffff6039557009deaf736ac1f569ffffffffffffffffff603a55700976bd9952c7aa957fffffffffffffffff603b557009131271922eaa606fffffffffffffffff603c557008b380f3558668c46fffffffffffffffff603d55700857ddf0117efa215bffffffffffffffff603e556001608360020a03603f557007abbf6f6abb9d087fffffffffffffffff60405570075af62cbac95f7dfa7fffffffffffffff60415570070d7fb7452e187ac13fffffffffffffff6042557006c3390ecc8af379295fffffffffffffff60435570067c00a3b07ffc01fd6fffffffffffffff604455700637b647c39cbb9d3d27ffffffffffffff6045557005f63b1fc104dbd39587ffffffffffffff6046557005b771955b36e12f7235ffffffffffffff60475570057b3d49dda84556d6f6ffffffffffffff60485570054183095b2c8ececf30ffffffffffffff60495570050a28be635ca2b888f77fffffffffffff604a557004d5156639708c9db33c3fffffffffffff604b557004a23105873875bd52dfdfffffffffffff604c55700471649d87199aa990756fffffffffffff604d557004429a21a029d4c1457cfbffffffffffff604e55700415bc6d6fb7dd71af2cb3ffffffffffff604f557003eab73b3bbfe282243ce1ffffffffffff6050557003c1771ac9fb6b4c18e229ffffffffffff605155700399e96897690418f785257fffffffffff605255700373fc456c53bb779bf0ea9fffffffffff60535570034f9e8e490c48e67e6ab8bfffffffffff60545570032cbfd4a7adc790560b3337ffffffffff60555570030b50570f6e5d2acca94613ffffffffff6056557002eb40f9f620fda6b56c2861ffffffffff6057557002cc8340ecb0d0f520a6af58ffffffffff6058557002af09481380a0a35cf1ba02ffffffffff605955700292c5bdd3b92ec810287b1b3fffffffff605a55700277abdcdab07d5a77ac6d6b9fffffffff605b5570025daf6654b1eaa55fd64df5efffffffff605c55700244c49c648baa98192dce88b7ffffffff605d5570022ce03cd5619a311b2471268bffffffff605e55700215f77c045fbe885654a44a0fffffffff605f556001608160020a036060557001eaefdbdaaee7421fc4d3ede5ffffffff6061557001d6bd8b2eb257df7e8ca57b09bfffffff6062557001c35fedd14b861eb0443f7f133fffffff6063557001b0ce43b322bcde4a56e8ada5afffffff60645570019f0028ec1fff007f5a195a39dfffffff60655570018ded91f0e72ee74f49b15ba527ffffff60665570017d8ec7f04136f4e5615fd41a63ffffff60675570016ddc6556cdb84bdc8d12d22e6fffffff60685570015ecf52776a1155b5bd8395814f7fffff60695570015060c256cb23b3b3cc3754cf40ffffff606a557001428a2f98d728ae223ddab715be3fffff606b5570013545598e5c23276ccf0ede68034fffff606c557001288c4161ce1d6f54b7f61081194fffff606d5570011c592761c666aa641d5a01a40f17ffff606e55700110a688680a7530515f3e6e6cfdcdffff606f557001056f1b5bedf75c6bcb2ce8aed428ffff6070556ffaadceceeff8a0890f3875f008277fff6071556ff05dc6b27edad306388a600f6ba0bfff6072556fe67a5a25da41063de1495d5b18cdbfff6073556fdcff115b14eedde6fc3aa5353f2e4fff6074556fd3e7a3924312399f9aae2e0f868f8fff6075556fcb2ff529eb71e41582cccd5a1ee26fff6076556fc2d415c3db974ab32a51840c0b67edff6077556fbad03e7d883f69ad5b0a186184e06bff6078556fb320d03b2c343d4829abd6075f0cc5ff6079556fabc25204e02828d73c6e80bcdb1a95bf607a556fa4b16f74ee4bb2040a1ec6c15fbbf2df607b556f9deaf736ac1f569deb1b5ae3f36c130f607c556f976bd9952c7aa957f5937d790ef65037607d556f9131271922eaa6064b73a22d0bd4f2bf607e556f8b380f3558668c46c91c49a2f8e967b9607f556f857ddf0117efa215952912839f6473e66080556200089c565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200083a57805160ff19168380011785556200086a565b828001600101855582156200086a579182015b828111156200086a5782518255916020019190600101906200084d565b50620008789291506200087c565b5090565b6200089991905b8082111562000878576000815560010162000883565b90565b61167980620008ac6000396000f3006080604052600436106100615763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166329a00e7c811461006657806349f9b0f71461009f57806354fd4d50146100c657806365098bb314610150575b600080fd5b34801561007257600080fd5b5061008d60043560243563ffffffff6044351660643561017e565b60408051918252519081900360200190f35b3480156100ab57600080fd5b5061008d60043560243563ffffffff6044351660643561024c565b3480156100d257600080fd5b506100db61033d565b6040805160208082528351818301528351919283929083019185019080838360005b838110156101155781810151838201526020016100fd565b50505050905090810190601f1680156101425780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561015c57600080fd5b5061008d60043563ffffffff60243581169060443590606435166084356103e9565b600080600080600080891180156101955750600088115b80156101a7575060008763ffffffff16115b80156101bc5750620f424063ffffffff881611155b15156101c757600080fd5b8515156101d75760009450610240565b63ffffffff8716620f4240141561020457876101f38a886104e6565b8115156101fc57fe5b049450610240565b61020e8689610511565b915061021f828989620f4240610520565b909450925060ff83166102328a866104e6565b9060020a9004905088810394505b50505050949350505050565b60008060008060008060008a1180156102655750600089115b8015610277575060008863ffffffff16115b801561028c5750620f424063ffffffff891611155b80156102985750898711155b15156102a357600080fd5b8615156102b35760009550610330565b898714156102c357889550610330565b63ffffffff8816620f424014156102f057896102df8a896104e6565b8115156102e857fe5b049550610330565b868a0392506103048a84620f42408b610520565b909550935061031389866104e6565b91505060ff831660020a88028481830381151561032c57fe5b0495505b5050505050949350505050565b6000805460408051602060026001851615610100027fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0190941693909304601f810184900484028201840190925281815292918301828280156103e15780601f106103b6576101008083540402835291602001916103e1565b820191906000526020600020905b8154815290600101906020018083116103c457829003601f168201915b505050505081565b60008060008060008060008b118015610408575060008a63ffffffff16115b801561041d5750620f424063ffffffff8b1611155b80156104295750600089115b801561043b575060008863ffffffff16115b80156104505750620f424063ffffffff891611155b151561045b57600080fd5b8763ffffffff168a63ffffffff161415610494576104798b88610511565b6104838a896104e6565b81151561048c57fe5b0495506104d8565b61049e8b88610511565b92506104ac838c8c8b610520565b90955093506104bb89866104e6565b91505060ff831660020a8802848183038115156104d457fe5b0495505b505050505095945050505050565b600082820283158061050257508284828115156104ff57fe5b04145b151561050a57fe5b9392505050565b60008282018381101561050a57fe5b600080808080807002000000000000000000000000000000008a1061054157fe5b886f800000000000000000000000000000008b0281151561055e57fe5b04925070015bf0a8b1457695355fb8ac404e7a79e383101561058a5761058383610613565b9350610596565b61059383610b07565b93505b8663ffffffff168863ffffffff1685028115156105af57fe5b0491507008000000000000000000000000000000008210156105df576105d482610c46565b607f95509550610606565b6105e88261112b565b905061060060ff607f8390031660020a8304826111ba565b81955095505b5050505094509492505050565b6000808080806fd3094c70f034de4b96ff7d5b6f99fcd8861061066e576f4000000000000000000000000000000093909301926fd3094c70f034de4b96ff7d5b6f99fcd86f8000000000000000000000000000000087020495505b6fa45af1e1f40c333b3de1db4dd55f29a786106106c3576f2000000000000000000000000000000093909301926fa45af1e1f40c333b3de1db4dd55f29a76f8000000000000000000000000000000087020495505b6f910b022db7ae67ce76b441c27035c6a18610610718576f1000000000000000000000000000000093909301926f910b022db7ae67ce76b441c27035c6a16f8000000000000000000000000000000087020495505b6f88415abbe9a76bead8d00cf112e4d4a8861061076d576f0800000000000000000000000000000093909301926f88415abbe9a76bead8d00cf112e4d4a86f8000000000000000000000000000000087020495505b6f84102b00893f64c705e841d5d4064bd386106107c2576f0400000000000000000000000000000093909301926f84102b00893f64c705e841d5d4064bd36f8000000000000000000000000000000087020495505b6f8204055aaef1c8bd5c3259f4822735a28610610817576f0200000000000000000000000000000093909301926f8204055aaef1c8bd5c3259f4822735a26f8000000000000000000000000000000087020495505b6f810100ab00222d861931c15e39b44e99861061086c576f0100000000000000000000000000000093909301926f810100ab00222d861931c15e39b44e996f8000000000000000000000000000000087020495505b6f808040155aabbbe9451521693554f73386106108c0576e80000000000000000000000000000093909301926f808040155aabbbe9451521693554f7336f8000000000000000000000000000000087020495505b7fffffffffffffffffffffffffffffffff80000000000000000000000000000000860192508291506f8000000000000000000000000000000082800204905070010000000000000000000000000000000083810383020493909301926f800000000000000000000000000000008282020491507002000000000000000000000000000000006faaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa84900383020493909301926f800000000000000000000000000000008282020491507003000000000000000000000000000000006f9999999999999999999999999999999984900383020493909301926f800000000000000000000000000000008282020491507004000000000000000000000000000000006f9249249249249249249249249249249284900383020493909301926f800000000000000000000000000000008282020491507005000000000000000000000000000000006f8e38e38e38e38e38e38e38e38e38e38e84900383020493909301926f800000000000000000000000000000008282020491507006000000000000000000000000000000006f8ba2e8ba2e8ba2e8ba2e8ba2e8ba2e8b84900383020493909301926f800000000000000000000000000000008282020491507007000000000000000000000000000000006f89d89d89d89d89d89d89d89d89d89d8984900383020493909301926f800000000000000000000000000000008282020491507008000000000000000000000000000000006f888888888888888888888888888888888490038302049390930195945050505050565b60008080807001000000000000000000000000000000008510610b6357610b3f6f8000000000000000000000000000000086046115dd565b60ff8116600281900a909604956f8000000000000000000000000000000002935091505b6f80000000000000000000000000000000851115610c165750607f5b60008160ff161115610c16576f800000000000000000000000000000008580020494507001000000000000000000000000000000008510610bef576002948590049460ff7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff830116900a92909201915b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff01610b7f565b6f05b9de1d10bf4103d647b0955897ba806f03f80fe03f80fe03f80fe03f80fe03f884020493505b505050919050565b6000670168244fdac780006f800000000000000000000000000000006f0fffffffffffffffffffffffffffffff84168080028290048082028390048083028490049485026710e1b3be415a00009092026705a0913f6b1e000091909102010192909181830204905080664807432bc1800002830192506f80000000000000000000000000000000828202811515610cd957fe5b04905080660c0135dca0400002830192506f80000000000000000000000000000000828202811515610d0757fe5b049050806601b707b1cdc00002830192506f80000000000000000000000000000000828202811515610d3557fe5b049050806536e0f639b80002830192506f80000000000000000000000000000000828202811515610d6257fe5b04905080650618fee9f80002830192506f80000000000000000000000000000000828202811515610d8f57fe5b04905080649c197dcc0002830192506f80000000000000000000000000000000828202811515610dbb57fe5b04905080640e30dce40002830192506f80000000000000000000000000000000828202811515610de757fe5b0490508064012ebd130002830192506f80000000000000000000000000000000828202811515610e1357fe5b049050806317499f0002830192506f80000000000000000000000000000000828202811515610e3e57fe5b049050806301a9d48002830192506f80000000000000000000000000000000828202811515610e6957fe5b04905080621c638002830192506f80000000000000000000000000000000828202811515610e9357fe5b049050806201c63802830192506f80000000000000000000000000000000828202811515610ebd57fe5b04905080611ab802830192506f80000000000000000000000000000000828202811515610ee657fe5b0490508061017c02830192506f80000000000000000000000000000000828202811515610f0f57fe5b04905080601402830192506f80000000000000000000000000000000828202811515610f3757fe5b6721c3677c82b400009190049384010482016f80000000000000000000000000000000019290506f10000000000000000000000000000000851615610fa05770018ebef9eac820ae8682b9793ac6d1e7767001c3d6a24ed82218787d624d3e5eba95f984020492505b6f20000000000000000000000000000000851615610fe2577001368b2fc6f9609fe7aceb46aa619baed470018ebef9eac820ae8682b9793ac6d1e77884020492505b6f40000000000000000000000000000000851615611023576fbc5ab1b16779be3575bd8f0520a9f21f7001368b2fc6f9609fe7aceb46aa619baed584020492505b6f80000000000000000000000000000000851615611063576f454aaa8efe072e7f6ddbab84b40a55c96fbc5ab1b16779be3575bd8f0520a9f21e84020492505b7001000000000000000000000000000000008516156110a4576f0960aadc109e7a3bf4578099615711ea6f454aaa8efe072e7f6ddbab84b40a55c584020492505b7002000000000000000000000000000000008516156110e4576e2bf84208204f5977f9a8cf01fdce3d6f0960aadc109e7a3bf4578099615711d784020492505b700400000000000000000000000000000000851615611122576d03c6ab775dd0b95b4cbee7e65d116e2bf84208204f5977f9a8cf01fdc30784020492505b50909392505050565b60006020607f825b8160ff168360010160ff16101561117857600260ff8484011604905084600160ff83166080811061116057fe5b01541061116f57809250611173565b8091505b611133565b84600160ff84166080811061118957fe5b01541061119857819350610c3e565b84600160ff8516608081106111a957fe5b0154106111b857829350610c3e565bfe5b6000806000849150600090508360ff168583029060020a90049150816f03442c4e6074a82f1797f72ac000000002810190508360ff168583029060020a90049150816f0116b96f757c380fb287fd0e4000000002810190508360ff168583029060020a90049150816e45ae5bdd5f0e03eca1ff439000000002810190508360ff168583029060020a90049150816e0defabf91302cd95b9ffda5000000002810190508360ff168583029060020a90049150816e02529ca9832b22439efff9b800000002810190508360ff168583029060020a90049150816d54f1cf12bd04e516b6da8800000002810190508360ff168583029060020a90049150816d0a9e39e257a09ca2d6db5100000002810190508360ff168583029060020a90049150816d012e066e7b839fa050c30900000002810190508360ff168583029060020a90049150816c1e33d7d926c329a1ad1a80000002810190508360ff168583029060020a90049150816c02bee513bdb4a6b19b5f80000002810190508360ff168583029060020a90049150816b3a9316fa79b88eccf2a0000002810190508360ff168583029060020a90049150816b048177ebe1fa81237520000002810190508360ff168583029060020a90049150816a5263fe90242dcbacf0000002810190508360ff168583029060020a90049150816a057e22099c030d9410000002810190508360ff168583029060020a90049150816957e22099c030d941000002810190508360ff168583029060020a900491508169052b6b5456997631000002810190508360ff168583029060020a9004915081684985f67696bf74800002810190508360ff168583029060020a90049150816803dea12ea99e49800002810190508360ff168583029060020a90049150816731880f2214b6e00002810190508360ff168583029060020a900491508167025bcff56eb3600002810190508360ff168583029060020a9004915081661b722e10ab100002810190508360ff168583029060020a90049150816601317c7007700002810190508360ff168583029060020a9004915081650cba84aafa0002810190508360ff168583029060020a90049150816482573a0a0002810190508360ff168583029060020a90049150816405035ad90002810190508360ff168583029060020a9004915081632f881b0002810190508360ff168583029060020a90049150816301b2934002810190508360ff168583029060020a9004915081620efc4002810190508360ff168583029060020a9004915081617fe002810190508360ff168583029060020a900491508161042002810190508360ff168583029060020a9004915081602102810190508360ff168583029060020a9004915081600102810190508360ff1660019060020a02856f0688589cc0e9505e2f2fee5580000000838115156115d157fe5b04010195945050505050565b6000808061010084101561160c575b600184111561160757600290930492600191909101906115ec565b611646565b5060805b60008160ff1611156116465760ff811660020a84106116395760ff811660020a90930492908117905b600260ff90911604611610565b50929150505600a165627a7a723058205b8fcd172efcffef42fac658276df1d8cabe291cb242be0b13688d5fb5e19bd90029";
    let factory = new ethers.ContractFactory(abi, bytecode, wallet);
    let contract = await factory.deploy();
    console.log("BancorFormula address：" + contract.address);
    console.log(contract.deployTransaction.hash);
    await contract.deployed()
}


// 注册合约地址
export async function Cr_registerAddress() {
    let wallet = new ethers.Wallet(privateKey, provider);
    let abi = [
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
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "_contractName",
                    "type": "bytes32"
                },
                {
                    "indexed": false,
                    "name": "_contractAddress",
                    "type": "address"
                }
            ],
            "name": "AddressUpdate",
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
            "constant": true,
            "inputs": [
                {
                    "name": "_contractName",
                    "type": "bytes32"
                }
            ],
            "name": "getAddress",
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
            "constant": false,
            "inputs": [
                {
                    "name": "_contractName",
                    "type": "bytes32"
                },
                {
                    "name": "_contractAddress",
                    "type": "address"
                }
            ],
            "name": "registerAddress",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];
    let contract = new ethers.Contract("0x70F9a2F90CD7e44d303A0F1c960361137E231151", abi, provider);
    let contractWithSigner = contract.connect(wallet);
    let tx = await contractWithSigner.registerAddress("0x42616e636f72466f726d756c6100000000000000000000000000000000000000",
        "0x1DE92e95039Dde10381B80799f7F6eC7BbE94623",
    );
    tx.wait();
    let tx2 = await contractWithSigner.registerAddress("0x42616e636f724e6574776f726b00000000000000000000000000000000000000",
        "0x9A386A9B90B8CCdcc57662cd56d7067c1F45026D",
    );
    tx2.wait();
    let tx3 = await contractWithSigner.registerAddress("0x436f6e7472616374466561747572657300000000000000000000000000000000",
        "0x0E8eA7DDc4330112479eeCEa919BeAd7B1aC2d23",
    );
    tx3.wait();
}

// 查看已注册的合约
export async function Cr_getAddress() {
    let abi = [
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
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "_contractName",
                    "type": "bytes32"
                },
                {
                    "indexed": false,
                    "name": "_contractAddress",
                    "type": "address"
                }
            ],
            "name": "AddressUpdate",
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
            "constant": true,
            "inputs": [
                {
                    "name": "_contractName",
                    "type": "bytes32"
                }
            ],
            "name": "getAddress",
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
            "constant": false,
            "inputs": [
                {
                    "name": "_contractName",
                    "type": "bytes32"
                },
                {
                    "name": "_contractAddress",
                    "type": "address"
                }
            ],
            "name": "registerAddress",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];
    let contract = new ethers.Contract("0x70F9a2F90CD7e44d303A0F1c960361137E231151", abi, provider);
    let addr1 = await contract.getAddress("0x42616e636f72466f726d756c6100000000000000000000000000000000000000");
    let addr2 = await contract.getAddress("0x42616e636f724e6574776f726b00000000000000000000000000000000000000");
    let addr3 = await contract.getAddress("0x436f6e7472616374466561747572657300000000000000000000000000000000");
    console.log(addr1, addr2, addr3)
}

export async function Balance() {
    provider.getBalance(wallet.address).then((balance) => {
        // balance is a BigNumber (in wei); format is as a sting (in ether)
        console.log(ethers.utils.formatEther(balance));
    });
}