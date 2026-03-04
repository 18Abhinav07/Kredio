// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract TokenFlowTest {
    event Received(address from, uint256 amount);
    event Withdrawn(address to, uint256 amount);

    receive() external payable {
        emit Received(msg.sender, msg.value);
    }

    function deposit() external payable {
        emit Received(msg.sender, msg.value);
    }

    function withdraw(
        address payable to,
        uint256 amount
    ) external {
        require(address(this).balance >= amount, "insufficient");
        to.transfer(amount);
        emit Withdrawn(to, amount);
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
