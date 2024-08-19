export const abi =  [
        {
            "type": "function",
            "name": "deposit",
            "inputs": [],
            "outputs": [],
            "stateMutability": "payable"
        },
        {
            "type": "function",
            "name": "getBalance",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "withdraw",
            "inputs": [
                {
                    "name": "_amount",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "outputs": [],
            "stateMutability": "payable"
        },
        {
            "type": "error",
            "name": "Bank__AmountExceedsBalance",
            "inputs": []
        },
        {
            "type": "error",
            "name": "Bank__AmountMustBeGreaterThanZero",
            "inputs": []
        },
        {
            "type": "error",
            "name": "Bank__WithdrawFailed",
            "inputs": []
        }
    ]
export const CONTRACT_ADDRESS = "0x728cdea0a4601c847D5d42D8C8F182E49233Ce4a";

