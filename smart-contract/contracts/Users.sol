// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract Users {
    struct Citizen {
        address publicAddress,
        string firstname,
        string lastname
    }

    struct RegistryOffice {
        address publicAddress,
        string district
    }

    struct Land {
        string landID
    }

    constructor() public {
        address owner = msg.sender;
        registryOffices[owner].address;
    }

    mapping (RegistryOffice.address => RegistryOffice) public registryOffices;
    mapping (Citizen.publicAddress => Citizen) public citizens;
    mapping (Land.landID => bool) public lands;
    // Identify lands with google maps unique land ID and in value, give the citizen owner's public address
    mapping (Land.landID => Citizen.address) landOwners;

    function addLand(string landAddress) public returns (string) {
        require(registryOffices[msg.sender].address == msg.sender);
        lands[landAddress] = true;
        returns landAddress;
    }

    function addLand(string landAddress) public {
        lands[landAddress] = true;
    }

    function assignLandOwner(Citizen.address landOwnerAddress, Land.landID addressID) public returns (uint256) {
        require(registryOffices[msg.sender].address == msg.sender);
        require(citizens[landOwnerAddress].publicAddress == landOwnerAddress);

        landOwners[addressID] = landOwnerAddress;
    }
}
