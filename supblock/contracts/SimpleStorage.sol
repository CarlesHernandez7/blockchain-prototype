// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract SimpleStorage {
    uint256 private storedValue;

    event ValueSet(uint256 value);

    function setValue(uint256 value) public {
        storedValue = value;
        emit ValueSet(value);
    }

    function getValue() public view returns (uint256) {
        return storedValue;
    }
}
