import {ethers} from 'ethers';
import {Provider} from "../base";

let provider = Provider.VNS;
let privateKey = '310F05F0103F8055C07484E7EBB0C2D9E58AD3F79F5AEEB23924597507AF0AB8';
let wallet = new ethers.Wallet(privateKey, provider);
let abi = [
    {
        "constant": true,
        "inputs": [],
        "name": "signerAddress",
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
        "name": "registry",
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
            }
        ],
        "name": "etherTokens",
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
        "inputs": [
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "name": "conversionHashes",
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
    },
    {
        "constant": true,
        "inputs": [],
        "name": "CONVERTER_CONVERSION_WHITELIST",
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
        "name": "gasPriceLimit",
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
        "inputs": [
            {
                "name": "_registry",
                "type": "address"
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
                "name": "_registry",
                "type": "address"
            }
        ],
        "name": "setContractRegistry",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_gasPriceLimit",
                "type": "address"
            }
        ],
        "name": "setGasPriceLimit",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_signerAddress",
                "type": "address"
            }
        ],
        "name": "setSignerAddress",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
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
                "name": "_register",
                "type": "bool"
            }
        ],
        "name": "registerEtherToken",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_path",
                "type": "address[]"
            },
            {
                "name": "_amount",
                "type": "uint256"
            },
            {
                "name": "_minReturn",
                "type": "uint256"
            },
            {
                "name": "_for",
                "type": "address"
            }
        ],
        "name": "convertFor",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_path",
                "type": "address[]"
            },
            {
                "name": "_amount",
                "type": "uint256"
            },
            {
                "name": "_minReturn",
                "type": "uint256"
            },
            {
                "name": "_for",
                "type": "address"
            },
            {
                "name": "_block",
                "type": "uint256"
            },
            {
                "name": "_v",
                "type": "uint8"
            },
            {
                "name": "_r",
                "type": "bytes32"
            },
            {
                "name": "_s",
                "type": "bytes32"
            }
        ],
        "name": "convertForPrioritized",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_paths",
                "type": "address[]"
            },
            {
                "name": "_pathStartIndex",
                "type": "uint256[]"
            },
            {
                "name": "_amounts",
                "type": "uint256[]"
            },
            {
                "name": "_minReturns",
                "type": "uint256[]"
            },
            {
                "name": "_for",
                "type": "address"
            }
        ],
        "name": "convertForMultiple",
        "outputs": [
            {
                "name": "",
                "type": "uint256[]"
            }
        ],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_path",
                "type": "address[]"
            },
            {
                "name": "_amount",
                "type": "uint256"
            },
            {
                "name": "_minReturn",
                "type": "uint256"
            },
            {
                "name": "_for",
                "type": "address"
            }
        ],
        "name": "claimAndConvertFor",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
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
                "name": "_path",
                "type": "address[]"
            },
            {
                "name": "_amount",
                "type": "uint256"
            },
            {
                "name": "_minReturn",
                "type": "uint256"
            }
        ],
        "name": "convert",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_path",
                "type": "address[]"
            },
            {
                "name": "_amount",
                "type": "uint256"
            },
            {
                "name": "_minReturn",
                "type": "uint256"
            }
        ],
        "name": "claimAndConvert",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];
let contract = new ethers.Contract("0x9A386A9B90B8CCdcc57662cd56d7067c1F45026D", abi, provider);
let contractWithSigner = contract.connect(wallet);

//0x9A386A9B90B8CCdcc57662cd56d7067c1F45026D
export async function Bnt_deploy(contractRegistry = "0x70F9a2F90CD7e44d303A0F1c960361137E231151") {
    let abi = [
        {
            "constant": true,
            "inputs": [],
            "name": "signerAddress",
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
            "name": "registry",
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
                }
            ],
            "name": "etherTokens",
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
            "inputs": [
                {
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "name": "conversionHashes",
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
        },
        {
            "constant": true,
            "inputs": [],
            "name": "CONVERTER_CONVERSION_WHITELIST",
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
            "name": "gasPriceLimit",
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
            "inputs": [
                {
                    "name": "_registry",
                    "type": "address"
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
                    "name": "_registry",
                    "type": "address"
                }
            ],
            "name": "setContractRegistry",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_gasPriceLimit",
                    "type": "address"
                }
            ],
            "name": "setGasPriceLimit",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_signerAddress",
                    "type": "address"
                }
            ],
            "name": "setSignerAddress",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
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
                    "name": "_register",
                    "type": "bool"
                }
            ],
            "name": "registerEtherToken",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_path",
                    "type": "address[]"
                },
                {
                    "name": "_amount",
                    "type": "uint256"
                },
                {
                    "name": "_minReturn",
                    "type": "uint256"
                },
                {
                    "name": "_for",
                    "type": "address"
                }
            ],
            "name": "convertFor",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_path",
                    "type": "address[]"
                },
                {
                    "name": "_amount",
                    "type": "uint256"
                },
                {
                    "name": "_minReturn",
                    "type": "uint256"
                },
                {
                    "name": "_for",
                    "type": "address"
                },
                {
                    "name": "_block",
                    "type": "uint256"
                },
                {
                    "name": "_v",
                    "type": "uint8"
                },
                {
                    "name": "_r",
                    "type": "bytes32"
                },
                {
                    "name": "_s",
                    "type": "bytes32"
                }
            ],
            "name": "convertForPrioritized",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_paths",
                    "type": "address[]"
                },
                {
                    "name": "_pathStartIndex",
                    "type": "uint256[]"
                },
                {
                    "name": "_amounts",
                    "type": "uint256[]"
                },
                {
                    "name": "_minReturns",
                    "type": "uint256[]"
                },
                {
                    "name": "_for",
                    "type": "address"
                }
            ],
            "name": "convertForMultiple",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256[]"
                }
            ],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_path",
                    "type": "address[]"
                },
                {
                    "name": "_amount",
                    "type": "uint256"
                },
                {
                    "name": "_minReturn",
                    "type": "uint256"
                },
                {
                    "name": "_for",
                    "type": "address"
                }
            ],
            "name": "claimAndConvertFor",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
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
                    "name": "_path",
                    "type": "address[]"
                },
                {
                    "name": "_amount",
                    "type": "uint256"
                },
                {
                    "name": "_minReturn",
                    "type": "uint256"
                }
            ],
            "name": "convert",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_path",
                    "type": "address[]"
                },
                {
                    "name": "_amount",
                    "type": "uint256"
                },
                {
                    "name": "_minReturn",
                    "type": "uint256"
                }
            ],
            "name": "claimAndConvert",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];
    let bytecode = "0x608060405260028054600160a060020a031916905534801561002057600080fd5b50604051602080612111833981016040525160008054600160a060020a0319163317905580600160a060020a038116151561005a57600080fd5b5060038054600160a060020a031916600160a060020a03929092169190911790556120878061008a6000396000f30060806040526004361061013d5763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166302ef521e8114610142578063046dc166146101775780635b7633d0146101a55780635e35359e146101e35780636d7bd3fc1461021a57806379ba5097146102415780637b103999146102565780638077ccf71461026b57806383315b6e146102ad57806389e63a60146102c25780638da5cb5b146102da5780639232494e146102ef57806392d1abb714610304578063961a929c14610319578063b1e9932b1461032e578063b5cadc91146103a6578063c7ba24bc14610501578063c98fefed1461055f578063d4ee1d90146105ca578063db427f68146105df578063e33051dd14610663578063f2fde38b14610691578063f3898a97146106bf578063fcd13d6514610710575b600080fd5b34801561014e57600080fd5b5061017573ffffffffffffffffffffffffffffffffffffffff60043516602435151561073e565b005b34801561018357600080fd5b5061017573ffffffffffffffffffffffffffffffffffffffff600435166107fe565b3480156101b157600080fd5b506101ba6108af565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b3480156101ef57600080fd5b5061017573ffffffffffffffffffffffffffffffffffffffff600435811690602435166044356108cb565b34801561022657600080fd5b5061022f61095e565b60408051918252519081900360200190f35b34801561024d57600080fd5b50610175610982565b34801561026257600080fd5b506101ba610a3c565b34801561027757600080fd5b5061029973ffffffffffffffffffffffffffffffffffffffff60043516610a58565b604080519115158252519081900360200190f35b3480156102b957600080fd5b5061022f610a6d565b3480156102ce57600080fd5b50610299600435610a91565b3480156102e657600080fd5b506101ba610aa6565b3480156102fb57600080fd5b5061022f610ac2565b34801561031057600080fd5b5061022f610ae6565b34801561032557600080fd5b506101ba610aeb565b34801561033a57600080fd5b506040805160206004803580820135838102808601850190965280855261022f95369593946024949385019291829185019084908082843750949750508435955050506020830135926040013573ffffffffffffffffffffffffffffffffffffffff169150610b079050565b604080516020600480358082013583810280860185019096528085526104b195369593946024949385019291829185019084908082843750506040805187358901803560208181028481018201909552818452989b9a998901989297509082019550935083925085019084908082843750506040805187358901803560208181028481018201909552818452989b9a998901989297509082019550935083925085019084908082843750506040805187358901803560208181028481018201909552818452989b9a9989019892975090820195509350839250850190849080828437509497505050923573ffffffffffffffffffffffffffffffffffffffff169350610be792505050565b60408051602080825283518183015283519192839290830191858101910280838360005b838110156104ed5781810151838201526020016104d5565b505050509050019250505060405180910390f35b34801561050d57600080fd5b506040805160206004803580820135838102808601850190965280855261022f95369593946024949385019291829185019084908082843750949750508435955050506020909201359150610f199050565b6040805160206004803580820135838102808601850190965280855261022f95369593946024949385019291829185019084908082843750949750508435955050506020830135926040013573ffffffffffffffffffffffffffffffffffffffff169150610f2f9050565b3480156105d657600080fd5b506101ba610f4a565b6040805160206004803580820135838102808601850190965280855261022f953695939460249493850192918291850190849080828437509497505084359550505060208301359273ffffffffffffffffffffffffffffffffffffffff60408201351692506060810135915060ff6080820135169060a08101359060c00135610f66565b34801561066f57600080fd5b5061017573ffffffffffffffffffffffffffffffffffffffff600435166110a3565b34801561069d57600080fd5b5061017573ffffffffffffffffffffffffffffffffffffffff60043516611154565b6040805160206004803580820135838102808601850190965280855261022f953695939460249493850192918291850190849080828437509497505084359550505060209092013591506111e49050565b34801561071c57600080fd5b5061017573ffffffffffffffffffffffffffffffffffffffff600435166111f2565b60005473ffffffffffffffffffffffffffffffffffffffff16331461075f57fe5b8173ffffffffffffffffffffffffffffffffffffffff8116151561078257600080fd5b8273ffffffffffffffffffffffffffffffffffffffff81163014156107a657600080fd5b505073ffffffffffffffffffffffffffffffffffffffff91909116600090815260056020526040902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016911515919091179055565b60005473ffffffffffffffffffffffffffffffffffffffff16331461081f57fe5b8073ffffffffffffffffffffffffffffffffffffffff8116151561084257600080fd5b8173ffffffffffffffffffffffffffffffffffffffff811630141561086657600080fd5b5050600280547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b60025473ffffffffffffffffffffffffffffffffffffffff1681565b60005473ffffffffffffffffffffffffffffffffffffffff1633146108ec57fe5b8273ffffffffffffffffffffffffffffffffffffffff8116151561090f57600080fd5b8273ffffffffffffffffffffffffffffffffffffffff8116151561093257600080fd5b8373ffffffffffffffffffffffffffffffffffffffff811630141561095657600080fd5b505050505050565b7f42616e636f72466f726d756c610000000000000000000000000000000000000081565b60015473ffffffffffffffffffffffffffffffffffffffff1633146109a657600080fd5b6001546000805460405173ffffffffffffffffffffffffffffffffffffffff93841693909116917f343765429aea5a34b3ff6a3785a98a5abb2597aca87bfbb58632c173d585373a91a360018054600080547fffffffffffffffffffffffff000000000000000000000000000000000000000090811673ffffffffffffffffffffffffffffffffffffffff841617909155169055565b60035473ffffffffffffffffffffffffffffffffffffffff1681565b60056020526000908152604090205460ff1681565b7f436f6e747261637446656174757265730000000000000000000000000000000081565b60066020526000908152604090205460ff1681565b60005473ffffffffffffffffffffffffffffffffffffffff1681565b7f42616e636f724e6574776f726b0000000000000000000000000000000000000081565b600181565b60045473ffffffffffffffffffffffffffffffffffffffff1681565b600080856000815181101515610b1957fe5b6020908102909101810151604080517f23b872dd00000000000000000000000000000000000000000000000000000000815233600482015230602482015260448101899052905191935073ffffffffffffffffffffffffffffffffffffffff8416926323b872dd926064808401938290030181600087803b158015610b9d57600080fd5b505af1158015610bb1573d6000803e3d6000fd5b505050506040513d6020811015610bc757600080fd5b50511515610bd157fe5b610bdd86868686610f2f565b9695505050505050565b6060600080808381805b8a51841015610efd5760018b51038414610c25578a84600101815181101515610c1657fe5b90602001906020020151610c28565b8b515b94508a84815181101515610c3857fe5b906020019060200201518503604051908082528060200260200182016040528015610c6d578160200160208202803883390190505b5092508a84815181101515610c7e57fe5b9060200190602002015191505b84821015610d02578b82815181101515610ca157fe5b90602001906020020151838c86815181101515610cba57fe5b906020019060200201518403815181101515610cd257fe5b73ffffffffffffffffffffffffffffffffffffffff90921660209283029091019091015260019190910190610c8b565b826000815181101515610d1157fe5b9060200190602002015190503460001480610d735750348a85815181101515610d3657fe5b9060200190602002015111158015610d73575073ffffffffffffffffffffffffffffffffffffffff811660009081526005602052604090205460ff165b80610da4575073ffffffffffffffffffffffffffffffffffffffff811660009081526005602052604090205460ff16155b1515610daf57600080fd5b600034118015610de4575073ffffffffffffffffffffffffffffffffffffffff811660009081526005602052604090205460ff165b15610e9a578073ffffffffffffffffffffffffffffffffffffffff1663d0e30db08b86815181101515610e1357fe5b906020019060200201516040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004016000604051808303818588803b158015610e6457600080fd5b505af1158015610e78573d6000803e3d6000fd5b50505050508984815181101515610e8b57fe5b90602001906020020151860195505b610ed9838b86815181101515610eac57fe5b906020019060200201518b87815181101515610ec457fe5b602090810290910101518b60008080806112a3565b8a85815181101515610ee757fe5b6020908102909101015260019390930192610bf1565b348614610f0957600080fd5b50979a9950505050505050505050565b6000610f2784848433610b07565b949350505050565b6000610f418585858585808080610f66565b95945050505050565b60015473ffffffffffffffffffffffffffffffffffffffff1681565b6000808960028151118015610f7d57506015815111155b8015610f8e57508051600290066001145b1515610f9957600080fd5b8a6000815181101515610fa857fe5b9060200190602002015191503460001480610ff25750348a148015610ff2575073ffffffffffffffffffffffffffffffffffffffff821660009081526005602052604090205460ff165b1515610ffd57600080fd5b6000341115611084578173ffffffffffffffffffffffffffffffffffffffff1663d0e30db0346040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004016000604051808303818588803b15801561106a57600080fd5b505af115801561107e573d6000803e3d6000fd5b50505050505b6110948b8b8b8b8b8b8b8b6112a3565b9b9a5050505050505050505050565b60005473ffffffffffffffffffffffffffffffffffffffff1633146110c457fe5b8073ffffffffffffffffffffffffffffffffffffffff811615156110e757600080fd5b8173ffffffffffffffffffffffffffffffffffffffff811630141561110b57600080fd5b5050600480547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b60005473ffffffffffffffffffffffffffffffffffffffff16331461117557fe5b60005473ffffffffffffffffffffffffffffffffffffffff8281169116141561119d57600080fd5b600180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b6000610f2784848433610f2f565b60005473ffffffffffffffffffffffffffffffffffffffff16331461121357fe5b8073ffffffffffffffffffffffffffffffffffffffff8116151561123657600080fd5b8173ffffffffffffffffffffffffffffffffffffffff811630141561125a57600080fd5b5050600380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b60008060008a600281511180156112bc57506015815111155b80156112cd57508051600290066001145b15156112d857600080fd5b60ff87161580156112e7575085155b80156112f1575084155b156113865760048054604080517f6b4dff1f0000000000000000000000000000000000000000000000000000000081523a938101939093525173ffffffffffffffffffffffffffffffffffffffff90911691636b4dff1f91602480830192600092919082900301818387803b15801561136957600080fd5b505af115801561137d573d6000803e3d6000fd5b505050506113a0565b6113958c8c8a8c8b8b8b6115a3565b15156113a057600080fd5b8b60008151811015156113af57fe5b9060200190602002015192506113c88c8c8c868d6117f5565b73ffffffffffffffffffffffffffffffffffffffff8216600090815260056020526040902054909c5090925060ff16156114bc578173ffffffffffffffffffffffffffffffffffffffff1663205c28788a8d6040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050600060405180830381600087803b15801561149f57600080fd5b505af11580156114b3573d6000803e3d6000fd5b50505050611593565b8173ffffffffffffffffffffffffffffffffffffffff1663a9059cbb8a8d6040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b15801561155f57600080fd5b505af1158015611573573d6000803e3d6000fd5b505050506040513d602081101561158957600080fd5b5051151561159357fe5b50989a9950505050505050505050565b600080600080883a89338d8f604051808781526020018681526020018573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c010000000000000000000000000281526014018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c01000000000000000000000000028152601401838152602001828051906020019060200280838360005b83811015611670578181015183820152602001611658565b50506040805195909301859003909420600081815260066020529290922054919d505060ff1615985050871596506116af955050505050505750884311155b15156116ba57600080fd5b604080517f19457468657265756d205369676e6564204d6573736167653a0a3332000000008152601c8101859052815190819003603c0181206002546000808452602084810180875284905260ff8d1685870152606085018c9052608085018b9052945192965073ffffffffffffffffffffffffffffffffffffffff9091169360019360a08082019492937fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0840193928390039091019190865af1158015611786573d6000803e3d6000fd5b5050506020604051035173ffffffffffffffffffffffffffffffffffffffff1614905080156117e757600083815260066020526040902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001660011790555b9a9950505050505050505050565b600354604080517f21f8a7210000000000000000000000000000000000000000000000000000000081527f436f6e747261637446656174757265730000000000000000000000000000000060048201529051600092839283928392839283928392839273ffffffffffffffffffffffffffffffffffffffff909116916321f8a7219160248082019260209290919082900301818787803b15801561189857600080fd5b505af11580156118ac573d6000803e3d6000fd5b505050506040513d60208110156118c257600080fd5b50518d519093509150600190505b81811015611b03578c818151811015156118e657fe5b9060200190602002015195508c8160010181518110151561190357fe5b9060200190602002015194508573ffffffffffffffffffffffffffffffffffffffff16638da5cb5b6040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b15801561197357600080fd5b505af1158015611987573d6000803e3d6000fd5b505050506040513d602081101561199d57600080fd5b505193506119ac848a85611b14565b73ffffffffffffffffffffffffffffffffffffffff868116908b16146119d7576119d78a858e611d50565b8373ffffffffffffffffffffffffffffffffffffffff16635e5144eb8b878f600287038614611a07576001611a09565b8f5b6040518563ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001838152602001828152602001945050505050602060405180830381600087803b158015611ac857600080fd5b505af1158015611adc573d6000803e3d6000fd5b505050506040513d6020811015611af257600080fd5b50519b5093985088936002016118d0565b50929b999a50505050505050505050565b604080517fa5fbf28700000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff858116600483015260016024830152915160009284169163a5fbf28791604480830192602092919082900301818787803b158015611b8d57600080fd5b505af1158015611ba1573d6000803e3d6000fd5b505050506040513d6020811015611bb757600080fd5b50511515611bc457611d4a565b8373ffffffffffffffffffffffffffffffffffffffff1663c45d3d926040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b158015611c2857600080fd5b505af1158015611c3c573d6000803e3d6000fd5b505050506040513d6020811015611c5257600080fd5b5051905073ffffffffffffffffffffffffffffffffffffffff81161515611c7857611d4a565b8073ffffffffffffffffffffffffffffffffffffffff16633af32abf846040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b158015611d1357600080fd5b505af1158015611d27573d6000803e3d6000fd5b505050506040513d6020811015611d3d57600080fd5b50511515611d4a57600080fd5b50505050565b604080517fdd62ed3e00000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff84811660248301529151839286169163dd62ed3e9160448083019260209291908290030181600087803b158015611dc857600080fd5b505af1158015611ddc573d6000803e3d6000fd5b505050506040513d6020811015611df257600080fd5b505110611dfe57612056565b604080517fdd62ed3e00000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff848116602483015291519185169163dd62ed3e916044808201926020929091908290030181600087803b158015611e7657600080fd5b505af1158015611e8a573d6000803e3d6000fd5b505050506040513d6020811015611ea057600080fd5b505115611f7f578273ffffffffffffffffffffffffffffffffffffffff1663095ea7b38360006040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b158015611f4b57600080fd5b505af1158015611f5f573d6000803e3d6000fd5b505050506040513d6020811015611f7557600080fd5b50511515611f7f57fe5b8273ffffffffffffffffffffffffffffffffffffffff1663095ea7b383836040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b15801561202257600080fd5b505af1158015612036573d6000803e3d6000fd5b505050506040513d602081101561204c57600080fd5b5051151561205657fe5b5050505600a165627a7a7230582039cf189a8a97ba9f27fa38d28af06c9f077a9cf9b085646488268447b36649eb0029";
    let wallet = new ethers.Wallet(privateKey, provider);
    let factory = new ethers.ContractFactory(abi, bytecode, wallet);
    let contract = await factory.deploy(contractRegistry);
    console.log("BancorNetwork address：" + contract.address);
    console.log(contract.deployTransaction.hash);
    await contract.deployed()
}

// bancorNetwork 注册ethertoken 和 gaslimit
export async function Bnt_registerEtherToken() {
    let tx = await contractWithSigner.registerEtherToken(
        "0x7F3D1eA53612F293A77F54d1Bd26E70801d7e2A9",
        true
    );
    tx.wait().catch(() => {
        contract.etherTokens("0x7F3D1eA53612F293A77F54d1Bd26E70801d7e2A9").then((res) => console.log(res));
    });

    let tx2 = await contractWithSigner.setGasPriceLimit(
        "0x6D5a9a51674691bb74Aefe63E4e0EFE783e35528"
    );
    tx2.wait().catch(() => {
        contract.gasPriceLimit().then((res) => console.log(res));
    });
}

// 购买
export async function Bnt_buy() {
    let overrides = {
        value: ethers.utils.parseEther('1'),
    };
    let tx = await contractWithSigner.convertFor(
        ["0x7F3D1eA53612F293A77F54d1Bd26E70801d7e2A9",
            "0xF85b1de7f129c678831B46c79a9052e68B6bE9b3",
            "0xF85b1de7f129c678831B46c79a9052e68B6bE9b3"],
        ethers.utils.parseEther('1'),
        ethers.utils.parseEther('0.001'),
        wallet.address,
        overrides
    );
    tx.wait().catch(() => {

    });
}