// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Bank {
    error Bank__AmountMustBeGreaterThanZero(); 
    error Bank__AmountExceedsBalance(); 
    error Bank__WithdrawFailed();
    mapping(address => uint) private s_balance;

    function deposit() external payable {
        if(msg.value <=0) {
            revert Bank__AmountMustBeGreaterThanZero();
        }
        s_balance[msg.sender] += msg.value;
    }
    function withdraw(uint256 _amount) external payable {
        if(_amount > s_balance[msg.sender]) {
            revert Bank__AmountExceedsBalance();
        }
        (bool success, ) = msg.sender.call{value: _amount}("");
        if(!success){
            revert Bank__WithdrawFailed();
        }
        s_balance[msg.sender] -= _amount;
    }
    function getBalance() public view returns (uint) {
        return s_balance[msg.sender];
    }
}