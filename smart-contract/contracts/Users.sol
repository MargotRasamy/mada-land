// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract Users {

    constructor() {
        owner = msg.sender;
        addAdmin(owner, "mg");
        addCity("101");
        addCity("514");
        addCity("205");
        addCity("602");
        addCity("203");
        addCity("204");
        addCity("617");
        addCity("404");    
        addCity("503"); 
        addCity("603");     
        addCity("604"); 
        addCity("515");    
        addCity("207");
        address margotAddress = address(0x59C8261e1af50CB768d4bD2E33bB04EA5550449D);
        address krishnaAddress = address(0xB55E3856A42286370d4B863D9B3800c82d6f903b);
        address papaAddress = address(0x7d90737dA9C8674e8B05B1aa003ecD864bD4391b);
        address mairieTana = address(0xDb08B146f6C7c76108a68911e482Dde78763eb3D);
        address mairieMoramanga = address(0x47f4B066566DDe1040C2e91A35D5f2Da6751c6b9);
        addCitizen(margotAddress, 'Margot', 'Rasamy');
        addCitizen(krishnaAddress, 'Krishna', 'Rasamy');
        addCitizen(papaAddress, 'Papa', 'Rasamy');
        addRegistryOfficers(mairieTana, "101", margotAddress);
        addRegistryOfficers(mairieMoramanga, "514", krishnaAddress);
        addRegistryOfficers(mairieMoramanga, "514", papaAddress);
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
        string countryCode;
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
        string cityID;
        Citizen citizenship;
    }

    struct Land {
        string landID;
        string cityID;
        uint256 price;
    }

    struct Country {
        string isoCode;
    }

    // ALL LISTS
    // List of lands
    Land[] landsList;
    // List of citizens
    Citizen[] citizensList;
    // List of Registry Offices
    RegistryOffice[] registryOfficesList;
    // List of admins
    Admin[] adminsList;

    string[] citiesList;

    //--- CHECK which type of user is the given
    mapping (address => User) allUsers;
    //-----

    mapping (address => RegistryOffice) public registryOffices;
    mapping (address => Citizen) public citizens;
    mapping (address => Admin) public admins;

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

    function getCities() public view returns (string[] memory) {
        return citiesList;
    }

    function addCity(string memory _cityID) public returns (string memory) {
        require(allUsers[msg.sender].userType == UserType.Admin, "Only admin can add new cities.");  
        citiesList.push(_cityID);
        return _cityID;
    }

    function addRegistryOfficers(address _registryOfficeAddress, string memory _cityID, address _citizenAddress) public returns (RegistryOffice memory) {
        require(allUsers[msg.sender].userType == UserType.Admin, "Registry officers can only be created by admin.");
        // check the address validity
        require(address(_registryOfficeAddress) != address(0), 'Must enter a registry office address');
        // check the citizen address validity
        require(address(_citizenAddress) != address(0), 'Must enter a valid citizen address');
        require(allUsers[_citizenAddress].userType == UserType.Citizen, 'Must enter a valid citizen address');
        // Get the linked citizen
        Citizen memory citizenInCharge = getCitizen(_citizenAddress);
        // Create new registry office
        RegistryOffice memory newRegistryOffice = RegistryOffice(_registryOfficeAddress, _cityID, citizenInCharge);
        // Add to registry office list
        registryOfficesList.push(newRegistryOffice);
        // Add to address mapping
        registryOffices[_registryOfficeAddress] = newRegistryOffice;
        // Add to general user's list
        User memory newUser = User(true, UserType.Admin);
        allUsers[_registryOfficeAddress] = newUser;
        return newRegistryOffice;
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

    function getAdmin(address _address) public view returns (Admin memory) {
        require(address(_address) != address(0));
        return admins[_address];
    }

    function addAdmin(address _address, string memory _countryCode) public returns (address) {
        // check the address validity
        require(address(_address) != address(0));
        // Create new admin
        Admin memory newAdmin = Admin(_address, _countryCode);
        // Add to citizen list
        adminsList.push(newAdmin);
        // Add to address mapping
        admins[_address] = newAdmin;
        // Add to general user's list
        User memory newUser = User(true, UserType.Admin);
        allUsers[_address] = newUser;
        return _address;
    }

    function getRegistryOfficeByAddress(address _officeAddress) public view returns (RegistryOffice memory) {
        require(address(_officeAddress) != address(0));
        return registryOffices[_officeAddress];
    }

    //check if user exists and get user's type
    function getUser(address userAdd) public view returns (User memory) {
        require(address(userAdd) != address(0));
        return allUsers[userAdd];
    }

}
