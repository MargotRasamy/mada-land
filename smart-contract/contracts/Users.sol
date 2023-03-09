// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract Users {

    constructor() {
        owner = msg.sender;
        addRegistryOfficers(owner, "Ivandry");
    }

    address owner;

    enum UserType { Citizen, RegistryOffice, Admin }

    struct User {
        bool exists;
        UserType userType;
    }

    //GET EACH TYPE OF USER INFORMATIONS

    // can add new registry office and new citizens
    struct Admin {
        address publicAddress;
        // City city;
    }

    // can buy or sell property and ask for declaration
    struct Citizen {
        address publicAddress;
        string firstname;
        string lastname;
    }

    // can add new citizens
    struct RegistryOffice {
        address publicAddress;
        string district;
    }

    struct Land {
        string landID;
        uint256 cityID;
        uint256 price;
    }

    struct City {
        uint256 cityID;
        string cityName;
    }

    struct District {
        uint256 districtID;
        string districtName;
    }

    // ALL LISTS
    // List of lands
    Land[] landsList;
    // List of citizens
    Citizen[] citizensList;
    // List of Registry Offices
    RegistryOffice[] registryOfficesList;

    City[] citiesList;

    //--- CHECK which type of user is the given
    mapping (address => User) allUsers;
    //-----
    mapping (uint256 => District[]) citiesHandled;

    mapping (address => RegistryOffice) public registryOffices;
    mapping (address => Citizen) public citizens;

    mapping (string => bool) public lands;

    // Identify lands with google maps unique land ID and in value, give the citizen owner's public address
    mapping (string => address) landOwned;

    
    function getLands() public view returns (Land[] memory) {
        return landsList;
    }

    function getCitizens() public view returns (Citizen[] memory) {
        return citizensList;
    }

    function getRegistryOffices() public view returns (RegistryOffice[] memory) {
        return registryOfficesList;
    }

    // function assignLandOwner(address landOwnerAddress, string memory addressID) public {
    //     require(registryOffices[msg.sender].publicAddress == msg.sender);
    //     require(citizens[landOwnerAddress].publicAddress == landOwnerAddress);

    //     landOwned[addressID] = landOwnerAddress;
    // }

    function addRegistryOfficers(address _registryOfficeAddress, string memory district) public returns (address) {
        // check the address validity
        require(address(_registryOfficeAddress) != address(0));
        // Create new registry office
        RegistryOffice memory newRegistryOffice = RegistryOffice(_registryOfficeAddress, district);
        // Add to registry office list
        registryOfficesList.push(newRegistryOffice);
        // Add to address mapping
        registryOffices[_registryOfficeAddress] = newRegistryOffice;
        // Add to general user's list
        User memory newUser = User(true, UserType.Admin);
        allUsers[_registryOfficeAddress] = newUser;
        return _registryOfficeAddress;
    }


    function getCitizen(address _address) public view returns (Citizen memory) {
        require(address(_address) != address(0));
        return citizens[_address];
    }

    function addCitizen(address _address, string memory _firstname, string memory _lastname) public returns (address) {
        // check the address validity
        require(address(_address) != address(0));
        // Create new citizen
        Citizen memory newCitizen = Citizen(_address, _firstname, _lastname);
        // Add to citizen list
        citizensList.push(newCitizen);
        // Add to address mapping
        citizens[_address] = newCitizen;
        // Add to general user's list
        User memory newUser = User(true, UserType.Citizen);
        allUsers[_address] = newUser;
        return _address;
    }

    function getCitizen(address _address) public view returns (Citizen memory) {
        require(address(_address) != address(0));
        return citizens[_address];
    }

    function addCitizen(address _address, string memory _firstname, string memory _lastname) public returns (address) {
        // check the address validity
        require(address(_address) != address(0));
        // Create new citizen
        Citizen memory newCitizen = Citizen(_address, _firstname, _lastname);
        // Add to citizen list
        citizensList.push(newCitizen);
        // Add to address mapping
        citizens[_address] = newCitizen;
        // Add to general user's list
        User memory newUser = User(true, UserType.Citizen);
        allUsers[_address] = newUser;
        return _address;
    }

    function getRegistryOffice(address _officeAddress) public view returns (RegistryOffice memory) {
        require(address(_officeAddress) != address(0));
        return registryOffices[_officeAddress];
    }

    //check if user exists and get user's type
    function getUser(address userAdd) public view returns (User memory) {
        require(address(userAdd) != address(0));
        return allUsers[userAdd];
    }

}
