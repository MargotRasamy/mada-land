// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract Users {

    constructor() {
        owner = msg.sender;
        addRegistryOfficers(owner, "Moramanga");
    }

    struct Citizen {
        address publicAddress;
        string firstname;
        string lastname;
    }

    struct RegistryOffice {
        address publicAddress;
        string district;
    }

    struct Land {
        string landID;
    }

    address owner;

    // List of lands
    Land[] landsList;
    // List of citizens
    Citizen[] citizensList;
    // List of Registry Offices
    RegistryOffice[] registryOfficesList;


    mapping (address => RegistryOffice) public registryOffices;
    mapping (address => Citizen) public citizens;

    mapping (string => bool) public lands;
    // Identify lands with google maps unique land ID and in value, give the citizen owner's public address
    mapping (string => address) landOwned;

    function addLand(string memory landAddress) public returns (string memory) {
        require(registryOffices[msg.sender].publicAddress == msg.sender);
        lands[landAddress] = true;
        return landAddress;
    }

    function addRegistryOfficers(address _registryOfficeAddress, string memory district) public returns (address) {
        // check the address validity
        require(address(_registryOfficeAddress) != address(0));
        RegistryOffice memory newRegistryOffice = RegistryOffice(_registryOfficeAddress, district);
        registryOfficesList.push(newRegistryOffice);
        registryOffices[_registryOfficeAddress] = newRegistryOffice;
        return _registryOfficeAddress;
    }

    function assignLandOwner(address landOwnerAddress, string memory addressID) public {
        require(registryOffices[msg.sender].publicAddress == msg.sender);
        require(citizens[landOwnerAddress].publicAddress == landOwnerAddress);

        landOwned[addressID] = landOwnerAddress;
    }

    function getLands() public view returns (Land[] memory) {
        return landsList;
    }

    function getCitizens() public view returns (Citizen[] memory) {
        return citizensList;
    }

    function getRegistryOffices() public view returns (RegistryOffice[] memory) {
        return registryOfficesList;
    }

    function getRegistryOffice(address _officeAddress) public view returns (RegistryOffice memory) {
        require(address(_officeAddress) != address(0));
        return registryOffices[_officeAddress];
    }
}
