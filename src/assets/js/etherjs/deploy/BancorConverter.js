import {ethers} from 'ethers';
import {Provider} from "../base";

let provider = Provider.VNS;
let privateKey = '310F05F0103F8055C07484E7EBB0C2D9E58AD3F79F5AEEB23924597507AF0AB8';
let wallet = new ethers.Wallet(privateKey, provider);
let abi = [
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "connectors",
        "outputs": [
            {
                "name": "virtualBalance",
                "type": "uint256"
            },
            {
                "name": "weight",
                "type": "uint32"
            },
            {
                "name": "isVirtualBalanceEnabled",
                "type": "bool"
            },
            {
                "name": "isPurchaseEnabled",
                "type": "bool"
            },
            {
                "name": "isSet",
                "type": "bool"
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
                "type": "uint256"
            }
        ],
        "name": "connectorTokens",
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
        "name": "transferTokenOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "acceptTokenOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "converterType",
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
        "name": "withdrawFromToken",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "newManager",
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
        "name": "manager",
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
        "name": "conversionFee",
        "outputs": [
            {
                "name": "",
                "type": "uint32"
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
        "constant": false,
        "inputs": [
            {
                "name": "_disable",
                "type": "bool"
            }
        ],
        "name": "disableTokenTransfers",
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
        "name": "maxConversionFee",
        "outputs": [
            {
                "name": "",
                "type": "uint32"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "conversionsEnabled",
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
        "name": "conversionWhitelist",
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
        "inputs": [],
        "name": "acceptManagement",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
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
                "name": "_newManager",
                "type": "address"
            }
        ],
        "name": "transferManagement",
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
                "type": "uint256"
            }
        ],
        "name": "quickBuyPath",
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
        "name": "testString",
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
        "name": "token",
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
        "inputs": [
            {
                "name": "_token",
                "type": "address"
            },
            {
                "name": "_registry",
                "type": "address"
            },
            {
                "name": "_maxConversionFee",
                "type": "uint32"
            },
            {
                "name": "_connectorToken",
                "type": "address"
            },
            {
                "name": "_connectorWeight",
                "type": "uint32"
            }
        ],
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
                "indexed": true,
                "name": "_fromToken",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "_toToken",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "_trader",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "_amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "_return",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "_conversionFee",
                "type": "int256"
            }
        ],
        "name": "Conversion",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "_connectorToken",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "_tokenSupply",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "_connectorBalance",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "_connectorWeight",
                "type": "uint32"
            }
        ],
        "name": "PriceDataUpdate",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "_prevFee",
                "type": "uint32"
            },
            {
                "indexed": false,
                "name": "_newFee",
                "type": "uint32"
            }
        ],
        "name": "ConversionFeeUpdate",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "str",
                "type": "string"
            }
        ],
        "name": "KandyLog",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "_prevManager",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "_newManager",
                "type": "address"
            }
        ],
        "name": "ManagerUpdate",
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
        "inputs": [],
        "name": "connectorTokenCount",
        "outputs": [
            {
                "name": "",
                "type": "uint16"
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
                "name": "_registry",
                "type": "address"
            }
        ],
        "name": "setRegistry",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "name",
                "type": "string"
            }
        ],
        "name": "testEvent",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_whitelist",
                "type": "address"
            }
        ],
        "name": "setConversionWhitelist",
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
            }
        ],
        "name": "setQuickBuyPath",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "clearQuickBuyPath",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getQuickBuyPathLength",
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
                "name": "_disable",
                "type": "bool"
            }
        ],
        "name": "disableConversions",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_amount",
                "type": "uint256"
            },
            {
                "name": "_magnitude",
                "type": "uint8"
            }
        ],
        "name": "getFinalAmount",
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
                "name": "_token",
                "type": "address"
            },
            {
                "name": "_weight",
                "type": "uint32"
            },
            {
                "name": "_enableVirtualBalance",
                "type": "bool"
            }
        ],
        "name": "addConnector",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_connectorToken",
                "type": "address"
            },
            {
                "name": "_enableVirtualBalance",
                "type": "bool"
            },
            {
                "name": "_virtualBalance",
                "type": "uint256"
            }
        ],
        "name": "updateConnector",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_connectorToken",
                "type": "address"
            },
            {
                "name": "_disable",
                "type": "bool"
            }
        ],
        "name": "disableConnectorPurchases",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_connectorToken",
                "type": "address"
            }
        ],
        "name": "getConnectorBalance",
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
                "name": "_fromToken",
                "type": "address"
            },
            {
                "name": "_toToken",
                "type": "address"
            },
            {
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "getReturn",
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
                "name": "_connectorToken",
                "type": "address"
            },
            {
                "name": "_depositAmount",
                "type": "uint256"
            }
        ],
        "name": "getPurchaseReturn",
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
                "name": "_connectorToken",
                "type": "address"
            },
            {
                "name": "_sellAmount",
                "type": "uint256"
            }
        ],
        "name": "getSaleReturn",
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
                "name": "_fromConnectorToken",
                "type": "address"
            },
            {
                "name": "_toConnectorToken",
                "type": "address"
            },
            {
                "name": "_sellAmount",
                "type": "uint256"
            }
        ],
        "name": "getCrossConnectorReturn",
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
                "name": "_fromToken",
                "type": "address"
            },
            {
                "name": "_toToken",
                "type": "address"
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
        "name": "convertInternal",
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
                "name": "_fromToken",
                "type": "address"
            },
            {
                "name": "_toToken",
                "type": "address"
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
        "name": "quickConvert",
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
        "name": "quickConvertPrioritized",
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
                "name": "_fromToken",
                "type": "address"
            },
            {
                "name": "_toToken",
                "type": "address"
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
        "name": "change",
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
let bytecode = "0x60c0604052600360808190527f302e39000000000000000000000000000000000000000000000000000000000060a0908152620000409160059190620005c0565b506040805180820190915260068082527f62616e636f7200000000000000000000000000000000000000000000000000006020909201918252620000859181620005c0565b50600c80546001606860020a0319166c010000000000000000000000001790556040805180820190915260058082527f4b616e64790000000000000000000000000000000000000000000000000000006020909201918252620000eb91600e91620005c0565b50348015620000f957600080fd5b5060405160a080620046d18339810160409081528151602083015191830151606084015160809094015160008054600160a060020a03191633178155929491928580600160a060020a03811615156200015157600080fd5b5060028054600160a060020a03928316600160a060020a03199182161790915560038054909116331790558590811615156200018c57600080fd5b8460008163ffffffff1610158015620001ae5750620f424063ffffffff821611155b1515620001ba57600080fd5b60078054600160a060020a031916600160a060020a038981169190911791829055604080517f21f8a7210000000000000000000000000000000000000000000000000000000081527f436f6e74726163744665617475726573000000000000000000000000000000006004820152905192909116916321f8a721916024808201926020929091908290030181600087803b1580156200025857600080fd5b505af11580156200026d573d6000803e3d6000fd5b505050506040513d60208110156200028457600080fd5b50519250600160a060020a038316156200031b57604080517f2c7077c000000000000000000000000000000000000000000000000000000000815260016004820181905260248201529051600160a060020a03851691632c7077c091604480830192600092919082900301818387803b1580156200030157600080fd5b505af115801562000316573d6000803e3d6000fd5b505050505b600c805467ffffffff00000000191664010000000063ffffffff891602179055600160a060020a038516156200036257620003628585600064010000000062000370810204565b505050505050505062000665565b600054600160a060020a031633146200038557fe5b600254604080517f8da5cb5b00000000000000000000000000000000000000000000000000000000815290513092600160a060020a031691638da5cb5b9160048083019260209291908290030181600087803b158015620003e557600080fd5b505af1158015620003fa573d6000803e3d6000fd5b505050506040513d60208110156200041157600080fd5b5051600160a060020a031614156200042557fe5b82600160a060020a03811615156200043c57600080fd5b83600160a060020a0381163014156200045457600080fd5b8360008163ffffffff16118015620004755750620f424063ffffffff821611155b15156200048157600080fd5b600254600160a060020a03878116911614801590620004c65750600160a060020a0386166000908152600b60205260409020600101546601000000000000900460ff16155b8015620004e55750600c54620f424063ffffffff918216870190911611155b1515620004f157600080fd5b505050600160a060020a039092166000818152600b602052604081208181556001908101805466ff0000000000001965ff0000000000199715156401000000000264ff000000001963ffffffff808a1663ffffffff19958616179190911691909117989098166501000000000017166601000000000000179091556009805492830181559092527f6e1540171b6c0c960b71a7020d9f60077f6af931a8bbf590da0223dacf75c7af018054600160a060020a031916909217909155600c80548085169093019093169116179055565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200060357805160ff191683800117855562000633565b8280016001018555821562000633579182015b828111156200063357825182559160200191906001019062000616565b506200064192915062000645565b5090565b6200066291905b808211156200064157600081556001016200064c565b90565b61405c80620006756000396000f3006080604052600436106102665763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630e53aae981146102dc57806319b640151461033e5780631e1401f81461037f57806321e6b53d146103c857806322742564146103f8578063228d2820146104605780632a2e2f0c1461047a57806338a5e016146104b45780633aa0145a146104c95780633e8ff43f146104e75780633f4d2fc21461057157806341a5b33d146105ad57806342906029146105e4578063481c6a75146105f95780634af80f0e1461060e5780634c2aaf951461063c5780634e2280c414610695578063514385be146106aa57806354fd4d50146106dd578063579cd3ca146106f25780635bff6d07146107205780635e35359e146107565780635e5144eb1461078d5780636d7bd3fc146107c757806371f52bf3146107dc57806372b44b2c1461080857806375892cf11461083957806379ba5097146108735780637b1039991461088857806383315b6e1461089d57806385d5e631146108b25780638da5cb5b146108cc5780638e3047e0146108e15780639232494e1461091857806392d1abb71461092d5780639396a7f01461094257806394c275ad14610957578063a2c4c3361461096c578063a91ee0dc1461099d578063bf754558146109cb578063c45d3d92146109f4578063c8c2fe6c14610a09578063d395ee0f14610a1e578063d4ee1d9014610a73578063d895951214610a88578063e4edf85214610ab6578063e7ee85a514610ae4578063f0843ba914610afc578063f2fde38b14610b4d578063fb8f0f5914610b7b578063fc0c546a14610b90575b6102d9600a8054806020026020016040519081016040528092919081815260200182805480156102cc57602002820191906000526020600020905b815473ffffffffffffffffffffffffffffffffffffffff1681526001909101906020018083116102a1575b5050505050346001610ba5565b50005b3480156102e857600080fd5b5061030a73ffffffffffffffffffffffffffffffffffffffff60043516610bf0565b6040805195865263ffffffff9094166020860152911515848401521515606084015215156080830152519081900360a00190f35b34801561034a57600080fd5b50610356600435610c36565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b34801561038b57600080fd5b506103b673ffffffffffffffffffffffffffffffffffffffff60043581169060243516604435610c6b565b60408051918252519081900360200190f35b3480156103d457600080fd5b506103f673ffffffffffffffffffffffffffffffffffffffff60043516610d09565b005b604080516020600480358082013583810280860185019096528085526103b695369593946024949385019291829185019084908082843750949750508435955050506020830135926040810135925060ff606082013516915060808101359060a00135610db9565b34801561046c57600080fd5b506103f66004351515611279565b34801561048657600080fd5b506103b673ffffffffffffffffffffffffffffffffffffffff60043581169060243516604435606435611300565b3480156104c057600080fd5b506103f661193a565b3480156104d557600080fd5b506103b660043560ff602435166119fb565b3480156104f357600080fd5b506104fc611a57565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561053657818101518382015260200161051e565b50505050905090810190601f1680156105635780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561057d57600080fd5b506103f673ffffffffffffffffffffffffffffffffffffffff6004351663ffffffff602435166044351515611b03565b3480156105b957600080fd5b506103f673ffffffffffffffffffffffffffffffffffffffff60043581169060243516604435611e2d565b3480156105f057600080fd5b50610356611eee565b34801561060557600080fd5b50610356611f0a565b34801561061a57600080fd5b506103f673ffffffffffffffffffffffffffffffffffffffff60043516611f26565b34801561064857600080fd5b506040805160206004803580820135601f81018490048402850184019095528484526103f6943694929360249392840191908190840183828082843750949750611fb39650505050505050565b3480156106a157600080fd5b506103f6612095565b3480156106b657600080fd5b506103f673ffffffffffffffffffffffffffffffffffffffff6004351660243515156120c6565b3480156106e957600080fd5b506104fc61218b565b3480156106fe57600080fd5b50610707612204565b6040805163ffffffff9092168252519081900360200190f35b34801561072c57600080fd5b506103f673ffffffffffffffffffffffffffffffffffffffff60043516602435151560443561221c565b34801561076257600080fd5b506103f673ffffffffffffffffffffffffffffffffffffffff600435811690602435166044356122e7565b34801561079957600080fd5b506103b673ffffffffffffffffffffffffffffffffffffffff6004358116906024351660443560643561237a565b3480156107d357600080fd5b506103b6612388565b3480156107e857600080fd5b506107f16123ac565b6040805161ffff9092168252519081900360200190f35b34801561081457600080fd5b506103b673ffffffffffffffffffffffffffffffffffffffff600435166024356123b3565b34801561084557600080fd5b506103b673ffffffffffffffffffffffffffffffffffffffff60043581169060243516604435606435612733565b34801561087f57600080fd5b506103f66127ee565b34801561089457600080fd5b506103566128a8565b3480156108a957600080fd5b506103b66128c4565b3480156108be57600080fd5b506103f660043515156128e8565b3480156108d857600080fd5b5061035661297d565b3480156108ed57600080fd5b506103b673ffffffffffffffffffffffffffffffffffffffff60043581169060243516604435612999565b34801561092457600080fd5b506103b6612d1e565b34801561093957600080fd5b506103b6612d42565b34801561094e57600080fd5b506103b6612d47565b34801561096357600080fd5b50610707612d4d565b34801561097857600080fd5b506103b673ffffffffffffffffffffffffffffffffffffffff60043516602435612d61565b3480156109a957600080fd5b506103f673ffffffffffffffffffffffffffffffffffffffff600435166130e8565b3480156109d757600080fd5b506109e0613199565b604080519115158252519081900360200190f35b348015610a0057600080fd5b506103566131b2565b348015610a1557600080fd5b506103f66131ce565b348015610a2a57600080fd5b50604080516020600480358082013583810280860185019096528085526103f69536959394602494938501929182918501908490808284375094975061328a9650505050505050565b348015610a7f57600080fd5b506103566132f3565b348015610a9457600080fd5b506103b673ffffffffffffffffffffffffffffffffffffffff6004351661330f565b348015610ac257600080fd5b506103f673ffffffffffffffffffffffffffffffffffffffff6004351661343a565b348015610af057600080fd5b506103566004356134f1565b604080516020600480358082013583810280860185019096528085526103b695369593946024949385019291829185019084908082843750949750508435955050506020909201359150610ba59050565b348015610b5957600080fd5b506103f673ffffffffffffffffffffffffffffffffffffffff600435166134ff565b348015610b8757600080fd5b506104fc61358f565b348015610b9c57600080fd5b50610356613608565b60008360028151118015610bbb57506015815111155b8015610bcc57508051600290066001145b1515610bd757600080fd5b610be78585856000808080610db9565b95945050505050565b600b602052600090815260409020805460019091015463ffffffff81169060ff640100000000820481169165010000000000810482169166010000000000009091041685565b6009805482908110610c4457fe5b60009182526020909120015473ffffffffffffffffffffffffffffffffffffffff16905081565b600073ffffffffffffffffffffffffffffffffffffffff8481169084161415610c9357600080fd5b60025473ffffffffffffffffffffffffffffffffffffffff84811691161415610cc757610cc08483612d61565b9050610d02565b60025473ffffffffffffffffffffffffffffffffffffffff85811691161415610cf457610cc083836123b3565b610cff848484612999565b90505b9392505050565b60005473ffffffffffffffffffffffffffffffffffffffff163314610d2a57fe5b600254604080517ff2fde38b00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff84811660048301529151919092169163f2fde38b91602480830192600092919082900301818387803b158015610d9e57600080fd5b505af1158015610db2573d6000803e3d6000fd5b5050505050565b60008060008960028151118015610dd257506015815111155b8015610de357508051600290066001145b1515610dee57600080fd5b8a6000815181101515610dfd57fe5b6020908102909101810151600754604080517f21f8a7210000000000000000000000000000000000000000000000000000000081527f42616e636f724e6574776f726b000000000000000000000000000000000000006004820152905192965073ffffffffffffffffffffffffffffffffffffffff909116926321f8a721926024808401938290030181600087803b158015610e9857600080fd5b505af1158015610eac573d6000803e3d6000fd5b505050506040513d6020811015610ec257600080fd5b505191503415156111165760025473ffffffffffffffffffffffffffffffffffffffff8481169116141561106357600254604080517fa24835d1000000000000000000000000000000000000000000000000000000008152336004820152602481018d9052905173ffffffffffffffffffffffffffffffffffffffff9092169163a24835d19160448082019260009290919082900301818387803b158015610f6957600080fd5b505af1158015610f7d573d6000803e3d6000fd5b50505050600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663867904b4838c6040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050600060405180830381600087803b15801561104657600080fd5b505af115801561105a573d6000803e3d6000fd5b50505050611116565b604080517f23b872dd00000000000000000000000000000000000000000000000000000000815233600482015273ffffffffffffffffffffffffffffffffffffffff8481166024830152604482018d90529151918516916323b872dd916064808201926020929091908290030181600087803b1580156110e257600080fd5b505af11580156110f6573d6000803e3d6000fd5b505050506040513d602081101561110c57600080fd5b5051151561111657fe5b8173ffffffffffffffffffffffffffffffffffffffff1663db427f68348d8d8d338e8e8e8e6040518a63ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180806020018981526020018881526020018773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018681526020018560ff1660ff1681526020018460001916600019168152602001836000191660001916815260200182810382528a818151815260200191508051906020019060200280838360005b838110156112125781810151838201526020016111fa565b5050505090500199505050505050505050506020604051808303818588803b15801561123d57600080fd5b505af1158015611251573d6000803e3d6000fd5b50505050506040513d602081101561126857600080fd5b50519b9a5050505050505050505050565b60005473ffffffffffffffffffffffffffffffffffffffff163314806112b6575060035473ffffffffffffffffffffffffffffffffffffffff1633145b15156112c157600080fd5b600c80547fffffffffffffffffffffffffffffffffffffff00ffffffffffffffffffffffff1691156c0100000000000000000000000002919091179055565b600754604080517f21f8a7210000000000000000000000000000000000000000000000000000000081527f42616e636f724e6574776f726b000000000000000000000000000000000000006004820152905160009283928392839283928392839273ffffffffffffffffffffffffffffffffffffffff16916321f8a72191602480830192602092919082900301818787803b15801561139e57600080fd5b505af11580156113b2573d6000803e3d6000fd5b505050506040513d60208110156113c857600080fd5b505190503373ffffffffffffffffffffffffffffffffffffffff8216146113ee57600080fd5b600c546c01000000000000000000000000900460ff16151561140c57fe5b876000811161141a57600080fd5b73ffffffffffffffffffffffffffffffffffffffff8c8116908c16141561144057600080fd5b60025473ffffffffffffffffffffffffffffffffffffffff8c8116911614156114755761146e8c8b8b613624565b975061192b565b60025473ffffffffffffffffffffffffffffffffffffffff8d8116911614156114a35761146e8b8b8b61393b565b6114ae8c8c8c612999565b965086158015906114bf5750888710155b15156114ca57600080fd5b73ffffffffffffffffffffffffffffffffffffffff8c166000908152600b602052604090206001810154909650640100000000900460ff1615611516578554611513908b613ddc565b86555b73ffffffffffffffffffffffffffffffffffffffff8b166000908152600b602052604090206001810154909550640100000000900460ff161561156257845461155f9088613deb565b85555b61156b8b61330f565b935083871061157657fe5b604080517f23b872dd000000000000000000000000000000000000000000000000000000008152336004820152306024820152604481018c9052905173ffffffffffffffffffffffffffffffffffffffff8e16916323b872dd9160648083019260209291908290030181600087803b1580156115f157600080fd5b505af1158015611605573d6000803e3d6000fd5b505050506040513d602081101561161b57600080fd5b5051151561162557fe5b604080517fa9059cbb00000000000000000000000000000000000000000000000000000000815233600482015260248101899052905173ffffffffffffffffffffffffffffffffffffffff8d169163a9059cbb9160448083019260209291908290030181600087803b15801561169a57600080fd5b505af11580156116ae573d6000803e3d6000fd5b505050506040513d60208110156116c457600080fd5b505115156116ce57fe5b6116e2876116dd8960026119fb565b613deb565b92506116f18c8c8c8a87613dfd565b8b73ffffffffffffffffffffffffffffffffffffffff167f8a6a7f53b3c8fa1dc4b83e3f1be668c1b251ff8d44cdcb83eb3acec3fec6a788600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166318160ddd6040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b1580156117af57600080fd5b505af11580156117c3573d6000803e3d6000fd5b505050506040513d60208110156117d957600080fd5b50516117e48f61330f565b60018a015460408051938452602084019290925263ffffffff1682820152519081900360600190a28a73ffffffffffffffffffffffffffffffffffffffff167f8a6a7f53b3c8fa1dc4b83e3f1be668c1b251ff8d44cdcb83eb3acec3fec6a788600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166318160ddd6040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b1580156118ca57600080fd5b505af11580156118de573d6000803e3d6000fd5b505050506040513d60208110156118f457600080fd5b50516118ff8e61330f565b600189015460408051938452602084019290925263ffffffff1682820152519081900360600190a28697505b50505050505050949350505050565b60005473ffffffffffffffffffffffffffffffffffffffff16331461195b57fe5b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166379ba50976040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401600060405180830381600087803b1580156119e157600080fd5b505af11580156119f5573d6000803e3d6000fd5b50505050565b60008160ff16620f42400a67ffffffffffffffff16611a46848460ff16600c60089054906101000a900463ffffffff1663ffffffff16620f4240030a67ffffffffffffffff16613e8e565b811515611a4f57fe5b049392505050565b6006805460408051602060026001851615610100027fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0190941693909304601f81018490048402820184019092528181529291830182828015611afb5780601f10611ad057610100808354040283529160200191611afb565b820191906000526020600020905b815481529060010190602001808311611ade57829003601f168201915b505050505081565b60005473ffffffffffffffffffffffffffffffffffffffff163314611b2457fe5b600254604080517f8da5cb5b0000000000000000000000000000000000000000000000000000000081529051309273ffffffffffffffffffffffffffffffffffffffff1691638da5cb5b9160048083019260209291908290030181600087803b158015611b9057600080fd5b505af1158015611ba4573d6000803e3d6000fd5b505050506040513d6020811015611bba57600080fd5b505173ffffffffffffffffffffffffffffffffffffffff161415611bda57fe5b8273ffffffffffffffffffffffffffffffffffffffff81161515611bfd57600080fd5b8373ffffffffffffffffffffffffffffffffffffffff8116301415611c2157600080fd5b8360008163ffffffff16118015611c415750620f424063ffffffff821611155b1515611c4c57600080fd5b60025473ffffffffffffffffffffffffffffffffffffffff878116911614801590611caa575073ffffffffffffffffffffffffffffffffffffffff86166000908152600b60205260409020600101546601000000000000900460ff16155b8015611cc85750600c54620f424063ffffffff918216870190911611155b1515611cd357600080fd5b50505073ffffffffffffffffffffffffffffffffffffffff9092166000818152600b60205260408120818155600190810180547fffffffffffffffffffffffffffffffffffffffffffffffffff00ffffffffffff7fffffffffffffffffffffffffffffffffffffffffffffffffffff00ffffffffff971515640100000000027fffffffffffffffffffffffffffffffffffffffffffffffffffffff00ffffffff63ffffffff808a167fffffffffffffffffffffffffffffffffffffffffffffffffffffffff00000000958616179190911691909117989098166501000000000017166601000000000000179091556009805492830181559092527f6e1540171b6c0c960b71a7020d9f60077f6af931a8bbf590da0223dacf75c7af0180547fffffffffffffffffffffffff000000000000000000000000000000000000000016909217909155600c80548085169093019093169116179055565b60005473ffffffffffffffffffffffffffffffffffffffff163314611e4e57fe5b600254604080517f5e35359e00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff868116600483015285811660248301526044820185905291519190921691635e35359e91606480830192600092919082900301818387803b158015611ed157600080fd5b505af1158015611ee5573d6000803e3d6000fd5b50505050505050565b60045473ffffffffffffffffffffffffffffffffffffffff1681565b60035473ffffffffffffffffffffffffffffffffffffffff1681565b60005473ffffffffffffffffffffffffffffffffffffffff163314611f4757fe5b8073ffffffffffffffffffffffffffffffffffffffff8116301415611f6b57600080fd5b50600880547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b8051611fc690600e906020840190613eb2565b50604080516020808252600e805460027fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff61010060018416150201909116049183018290527f246b16c791df20fee0d3976fb49880b0f1b6796e52f4cc52bcb3652cfa686c3a939092918291820190849080156120845780601f1061205957610100808354040283529160200191612084565b820191906000526020600020905b81548152906001019060200180831161206757829003601f168201915b50509250505060405180910390a150565b60005473ffffffffffffffffffffffffffffffffffffffff1633146120b657fe5b60006120c3600a82613f30565b50565b60005473ffffffffffffffffffffffffffffffffffffffff1633146120e757fe5b73ffffffffffffffffffffffffffffffffffffffff82166000908152600b602052604090206001015482906601000000000000900460ff16151561212a57600080fd5b5073ffffffffffffffffffffffffffffffffffffffff919091166000908152600b6020526040902060010180547fffffffffffffffffffffffffffffffffffffffffffffffffffff00ffffffffff1691156501000000000002919091179055565b6005805460408051602060026001851615610100027fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0190941693909304601f81018490048402820184019092528181529291830182828015611afb5780601f10611ad057610100808354040283529160200191611afb565b600c5468010000000000000000900463ffffffff1681565b6000805473ffffffffffffffffffffffffffffffffffffffff16331461223e57fe5b73ffffffffffffffffffffffffffffffffffffffff84166000908152600b602052604090206001015484906601000000000000900460ff16151561228157600080fd5b505073ffffffffffffffffffffffffffffffffffffffff9092166000908152600b60205260409020600181018054921515640100000000027fffffffffffffffffffffffffffffffffffffffffffffffffffffff00ffffffff9093169290921790915555565b60005473ffffffffffffffffffffffffffffffffffffffff16331461230857fe5b8273ffffffffffffffffffffffffffffffffffffffff8116151561232b57600080fd5b8273ffffffffffffffffffffffffffffffffffffffff8116151561234e57600080fd5b8373ffffffffffffffffffffffffffffffffffffffff811630141561237257600080fd5b505050505050565b6000610be785858585611300565b7f42616e636f72466f726d756c610000000000000000000000000000000000000081565b6009545b90565b6000806000806000803073ffffffffffffffffffffffffffffffffffffffff16600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16638da5cb5b6040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b15801561245957600080fd5b505af115801561246d573d6000803e3d6000fd5b505050506040513d602081101561248357600080fd5b505173ffffffffffffffffffffffffffffffffffffffff16146124a257fe5b73ffffffffffffffffffffffffffffffffffffffff88166000908152600b602052604090206001015488906601000000000000900460ff1615156124e557600080fd5b73ffffffffffffffffffffffffffffffffffffffff808a166000908152600b6020908152604080832060025482517f18160ddd0000000000000000000000000000000000000000000000000000000081529251919b50909416936318160ddd93600480840194938390030190829087803b15801561256257600080fd5b505af1158015612576573d6000803e3d6000fd5b505050506040513d602081101561258c57600080fd5b505194506125998961330f565b600754604080517f21f8a7210000000000000000000000000000000000000000000000000000000081527f42616e636f72466f726d756c61000000000000000000000000000000000000006004820152905192965073ffffffffffffffffffffffffffffffffffffffff909116916321f8a721916024808201926020929091908290030181600087803b15801561262f57600080fd5b505af1158015612643573d6000803e3d6000fd5b505050506040513d602081101561265957600080fd5b50516001870154604080517f49f9b0f7000000000000000000000000000000000000000000000000000000008152600481018990526024810188905263ffffffff9092166044830152606482018b90525191945073ffffffffffffffffffffffffffffffffffffffff8516916349f9b0f7916084808201926020929091908290030181600087803b1580156126ed57600080fd5b505af1158015612701573d6000803e3d6000fd5b505050506040513d602081101561271757600080fd5b505191506127268260016119fb565b9998505050505050505050565b6040805160608101825273ffffffffffffffffffffffffffffffffffffffff80871682526002548116602083015285169181019190915260009061277b90600d906003613f54565b50610be7600d8054806020026020016040519081016040528092919081815260200182805480156127e257602002820191906000526020600020905b815473ffffffffffffffffffffffffffffffffffffffff1681526001909101906020018083116127b7575b50505050508484610ba5565b60015473ffffffffffffffffffffffffffffffffffffffff16331461281257600080fd5b6001546000805460405173ffffffffffffffffffffffffffffffffffffffff93841693909116917f343765429aea5a34b3ff6a3785a98a5abb2597aca87bfbb58632c173d585373a91a360018054600080547fffffffffffffffffffffffff000000000000000000000000000000000000000090811673ffffffffffffffffffffffffffffffffffffffff841617909155169055565b60075473ffffffffffffffffffffffffffffffffffffffff1681565b7f436f6e747261637446656174757265730000000000000000000000000000000081565b60005473ffffffffffffffffffffffffffffffffffffffff16331461290957fe5b600254604080517f1608f18f0000000000000000000000000000000000000000000000000000000081528315156004820152905173ffffffffffffffffffffffffffffffffffffffff90921691631608f18f9160248082019260009290919082900301818387803b158015610d9e57600080fd5b60005473ffffffffffffffffffffffffffffffffffffffff1681565b60008060008060008060003073ffffffffffffffffffffffffffffffffffffffff16600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16638da5cb5b6040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b158015612a4157600080fd5b505af1158015612a55573d6000803e3d6000fd5b505050506040513d6020811015612a6b57600080fd5b505173ffffffffffffffffffffffffffffffffffffffff1614612a8a57fe5b73ffffffffffffffffffffffffffffffffffffffff8a166000908152600b60205260409020600101548a906601000000000000900460ff161515612acd57600080fd5b73ffffffffffffffffffffffffffffffffffffffff8a166000908152600b60205260409020600101548a906601000000000000900460ff161515612b1057600080fd5b73ffffffffffffffffffffffffffffffffffffffff8c81166000908152600b6020526040808220928e16825290206001810154919950975065010000000000900460ff161515612b5f57600080fd5b612b688c61330f565b9550612b738b61330f565b600754604080517f21f8a7210000000000000000000000000000000000000000000000000000000081527f42616e636f72466f726d756c61000000000000000000000000000000000000006004820152905192975073ffffffffffffffffffffffffffffffffffffffff909116916321f8a721916024808201926020929091908290030181600087803b158015612c0957600080fd5b505af1158015612c1d573d6000803e3d6000fd5b505050506040513d6020811015612c3357600080fd5b505160018981015490890154604080517f65098bb3000000000000000000000000000000000000000000000000000000008152600481018b905263ffffffff9384166024820152604481018a9052929091166064830152608482018d90525191955073ffffffffffffffffffffffffffffffffffffffff8616916365098bb39160a4808201926020929091908290030181600087803b158015612cd557600080fd5b505af1158015612ce9573d6000803e3d6000fd5b505050506040513d6020811015612cff57600080fd5b50519250612d0e8360026119fb565b9c9b505050505050505050505050565b7f42616e636f724e6574776f726b0000000000000000000000000000000000000081565b600181565b600a5490565b600c54640100000000900463ffffffff1681565b6000806000806000803073ffffffffffffffffffffffffffffffffffffffff16600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16638da5cb5b6040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b158015612e0757600080fd5b505af1158015612e1b573d6000803e3d6000fd5b505050506040513d6020811015612e3157600080fd5b505173ffffffffffffffffffffffffffffffffffffffff1614612e5057fe5b73ffffffffffffffffffffffffffffffffffffffff88166000908152600b602052604090206001015488906601000000000000900460ff161515612e9357600080fd5b73ffffffffffffffffffffffffffffffffffffffff89166000908152600b60205260409020600181015490965065010000000000900460ff161515612ed757600080fd5b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166318160ddd6040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b158015612f5d57600080fd5b505af1158015612f71573d6000803e3d6000fd5b505050506040513d6020811015612f8757600080fd5b50519450612f948961330f565b600754604080517f21f8a7210000000000000000000000000000000000000000000000000000000081527f42616e636f72466f726d756c61000000000000000000000000000000000000006004820152905192965073ffffffffffffffffffffffffffffffffffffffff909116916321f8a721916024808201926020929091908290030181600087803b15801561302a57600080fd5b505af115801561303e573d6000803e3d6000fd5b505050506040513d602081101561305457600080fd5b50516001870154604080517f29a00e7c000000000000000000000000000000000000000000000000000000008152600481018990526024810188905263ffffffff9092166044830152606482018b90525191945073ffffffffffffffffffffffffffffffffffffffff8516916329a00e7c916084808201926020929091908290030181600087803b1580156126ed57600080fd5b60005473ffffffffffffffffffffffffffffffffffffffff16331461310957fe5b8073ffffffffffffffffffffffffffffffffffffffff8116151561312c57600080fd5b8173ffffffffffffffffffffffffffffffffffffffff811630141561315057600080fd5b5050600780547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b600c546c01000000000000000000000000900460ff1681565b60085473ffffffffffffffffffffffffffffffffffffffff1681565b60045473ffffffffffffffffffffffffffffffffffffffff1633146131f257600080fd5b60045460035460405173ffffffffffffffffffffffffffffffffffffffff92831692909116907fbe4cc281795971a471c980e842627a7f1ea3892ddfce8c5b6357cd2611c1973290600090a360048054600380547fffffffffffffffffffffffff000000000000000000000000000000000000000090811673ffffffffffffffffffffffffffffffffffffffff841617909155169055565b60005473ffffffffffffffffffffffffffffffffffffffff1633146132ab57fe5b80600281511180156132bf57506015815111155b80156132d057508051600290066001145b15156132db57600080fd5b81516132ee90600a906020850190613f54565b505050565b60015473ffffffffffffffffffffffffffffffffffffffff1681565b73ffffffffffffffffffffffffffffffffffffffff81166000908152600b6020526040812060010154819083906601000000000000900460ff16151561335457600080fd5b73ffffffffffffffffffffffffffffffffffffffff84166000908152600b602052604090206001810154909250640100000000900460ff1661342f57604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905173ffffffffffffffffffffffffffffffffffffffff8616916370a082319160248083019260209291908290030181600087803b1580156133fe57600080fd5b505af1158015613412573d6000803e3d6000fd5b505050506040513d602081101561342857600080fd5b5051613432565b81545b949350505050565b60005473ffffffffffffffffffffffffffffffffffffffff16331480613477575060035473ffffffffffffffffffffffffffffffffffffffff1633145b151561348257600080fd5b60035473ffffffffffffffffffffffffffffffffffffffff828116911614156134aa57600080fd5b600480547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b600a805482908110610c4457fe5b60005473ffffffffffffffffffffffffffffffffffffffff16331461352057fe5b60005473ffffffffffffffffffffffffffffffffffffffff8281169116141561354857600080fd5b600180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b600e805460408051602060026001851615610100027fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0190941693909304601f81018490048402820184019092528181529291830182828015611afb5780601f10611ad057610100808354040283529160200191611afb565b60025473ffffffffffffffffffffffffffffffffffffffff1681565b6000806000806136348787612d61565b925082158015906136455750848310155b151561365057600080fd5b73ffffffffffffffffffffffffffffffffffffffff87166000908152600b602052604090206001810154909250640100000000900460ff161561369c5781546136999087613ddc565b82555b604080517f23b872dd00000000000000000000000000000000000000000000000000000000815233600482015230602482015260448101889052905173ffffffffffffffffffffffffffffffffffffffff8916916323b872dd9160648083019260209291908290030181600087803b15801561371757600080fd5b505af115801561372b573d6000803e3d6000fd5b505050506040513d602081101561374157600080fd5b5051151561374b57fe5b600254604080517f867904b400000000000000000000000000000000000000000000000000000000815233600482015260248101869052905173ffffffffffffffffffffffffffffffffffffffff9092169163867904b49160448082019260009290919082900301818387803b1580156137c457600080fd5b505af11580156137d8573d6000803e3d6000fd5b505050506137eb836116dd8560016119fb565b60025490915061381590889073ffffffffffffffffffffffffffffffffffffffff16888685613dfd565b8673ffffffffffffffffffffffffffffffffffffffff167f8a6a7f53b3c8fa1dc4b83e3f1be668c1b251ff8d44cdcb83eb3acec3fec6a788600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166318160ddd6040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b1580156138d357600080fd5b505af11580156138e7573d6000803e3d6000fd5b505050506040513d60208110156138fd57600080fd5b50516139088a61330f565b600186015460408051938452602084019290925263ffffffff1682820152519081900360600190a2509095945050505050565b600254604080517f70a0823100000000000000000000000000000000000000000000000000000000815233600482015290516000928392839283928392839273ffffffffffffffffffffffffffffffffffffffff909216916370a082319160248082019260209290919082900301818787803b1580156139ba57600080fd5b505af11580156139ce573d6000803e3d6000fd5b505050506040513d60208110156139e457600080fd5b50518811156139f257600080fd5b6139fc89896123b3565b94508415801590613a0d5750868510155b1515613a1857600080fd5b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166318160ddd6040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b158015613a9e57600080fd5b505af1158015613ab2573d6000803e3d6000fd5b505050506040513d6020811015613ac857600080fd5b50519350613ad58961330f565b925082851080613aee57508285148015613aee57508388145b1515613af657fe5b73ffffffffffffffffffffffffffffffffffffffff89166000908152600b602052604090206001810154909250640100000000900460ff1615613b42578154613b3f9086613deb565b82555b600254604080517fa24835d1000000000000000000000000000000000000000000000000000000008152336004820152602481018b9052905173ffffffffffffffffffffffffffffffffffffffff9092169163a24835d19160448082019260009290919082900301818387803b158015613bbb57600080fd5b505af1158015613bcf573d6000803e3d6000fd5b5050604080517fa9059cbb00000000000000000000000000000000000000000000000000000000815233600482015260248101899052905173ffffffffffffffffffffffffffffffffffffffff8d16935063a9059cbb925060448083019260209291908290030181600087803b158015613c4857600080fd5b505af1158015613c5c573d6000803e3d6000fd5b505050506040513d6020811015613c7257600080fd5b50511515613c7c57fe5b613c8b856116dd8760016119fb565b600254909150613cb49073ffffffffffffffffffffffffffffffffffffffff168a8a8885613dfd565b8873ffffffffffffffffffffffffffffffffffffffff167f8a6a7f53b3c8fa1dc4b83e3f1be668c1b251ff8d44cdcb83eb3acec3fec6a788600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166318160ddd6040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b158015613d7257600080fd5b505af1158015613d86573d6000803e3d6000fd5b505050506040513d6020811015613d9c57600080fd5b5051613da78c61330f565b600186015460408051938452602084019290925263ffffffff1682820152519081900360600190a25092979650505050505050565b600082820183811015610d0257fe5b600081831015613df757fe5b50900390565b7f8000000000000000000000000000000000000000000000000000000000000000811115613e2757fe5b60408051848152602081018490528082018390529051339173ffffffffffffffffffffffffffffffffffffffff87811692908916917f276856b36cbc45526a0ba64f44611557a2a8b68662c5388e9fe6d72e86e1c8cb919081900360600190a45050505050565b6000828202831580613eaa5750828482811515613ea757fe5b04145b1515610d0257fe5b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10613ef357805160ff1916838001178555613f20565b82800160010185558215613f20579182015b82811115613f20578251825591602001919060010190613f05565b50613f2c929150613fda565b5090565b8154818355818111156132ee576000838152602090206132ee918101908301613fda565b828054828255906000526020600020908101928215613fce579160200282015b82811115613fce57825182547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff909116178255602090920191600190910190613f74565b50613f2c929150613ff4565b6123b091905b80821115613f2c5760008155600101613fe0565b6123b091905b80821115613f2c5780547fffffffffffffffffffffffff0000000000000000000000000000000000000000168155600101613ffa5600a165627a7a72305820f208c02f65a305e81fc13557058bbae1c2d11508bd98131d017a8cb1b9c8f4350029";
let contract = new ethers.Contract("0xff5188F903Baf00cC045430084465dA99E497583", abi, provider);
let contractWithSigner = contract.connect(wallet);

// 1.部署智能代币；issue代币
// 2.部署BancorConvert；smartToken地址、ContractRegistry、_maxConversionFee、_connectorToken
// 3.给EtherToken充值，转给BancorConvert
// 5.将smartToken 权限转给BancorConvert
// 6.BancorConvert 确认获取权限

//0x5c58F5463264b41Fc9283856613e7eEb91855Cd9

// smart token-2
// 0xff5188F903Baf00cC045430084465dA99E497583
export async function Bcv_deploy() {
    let factory = new ethers.ContractFactory(abi, bytecode, wallet);
    let contract = await factory.deploy(
        "0x99Dc2458914d9a39B530995305F1425a99D095e8",
        "0x70F9a2F90CD7e44d303A0F1c960361137E231151",
        0,
        "0x7F3D1eA53612F293A77F54d1Bd26E70801d7e2A9",
        1000000
    );
    console.log("BancorConverter address：" + contract.address);
    console.log(contract.deployTransaction.hash);
    await contract.deployed().catch((e) => console.log(e))
    console.log("Bcv_deploy部署成功")
}

// 转换器接受权限
export async function Bcv_acceptTokenOwnership() {
    let tx = await contractWithSigner.acceptTokenOwnership();
    tx.wait().then(() => {
        console.log("end");
    }).catch(() => {
    });
}

// 转换器转移权限
export async function Bcv_transferTokenOwnership() {
    let tx = await contractWithSigner.transferTokenOwnership(wallet.address);
    tx.wait().catch((e) => {
        console.log(e);
    });
}

// 查询返回
export async function Bcv_getReturn() {
    contract.getReturn(
        "0xF85b1de7f129c678831B46c79a9052e68B6bE9b3",
        "0x7F3D1eA53612F293A77F54d1Bd26E70801d7e2A9",
        ethers.utils.parseEther('2.232246348067808868'),
    ).then((res) => console.log(res.toString()));
}
