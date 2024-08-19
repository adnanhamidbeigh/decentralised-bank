// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import {Test} from "forge-std/Test.sol";
import {Bank } from "src/Bank.sol";
import {DeployBank} from "script/DeployBank.s.sol";

contract TestBank is Test {
    DeployBank deployer;
    Bank bank;
    address USER = makeAddr("user");
    uint256 public constant STARTING_BALANCE = 100 ether;
    uint256 public constant AMOUNT = 10 ether;    
    function setUp() public {
        deployer = new DeployBank();
        bank = deployer.run();
        vm.deal(USER, STARTING_BALANCE);
    }

    function testBankDeposit() external{
        vm.startPrank(USER);
        bank.deposit{value: AMOUNT}();
        uint256 balance = bank.getBalance();
        vm.stopPrank();
        assert(balance == AMOUNT);
    }
    function testBankWithdraw() external{
        vm.startPrank(USER);
        bank.deposit{value: AMOUNT}();
        bank.withdraw(AMOUNT);        
        uint256 balance = bank.getBalance();
        vm.stopPrank();

        assert(balance == 0);
        assert(USER.balance == STARTING_BALANCE);
    }
    function testBankWithdrawWithExcessAmount() external{
        vm.prank(USER);        
        vm.expectRevert(Bank.Bank__AmountExceedsBalance.selector);
        bank.withdraw(AMOUNT);        
    }
}