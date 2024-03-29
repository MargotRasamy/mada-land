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
        // address margotAddress = address(0x59C8261e1af50CB768d4bD2E33bB04EA5550449D);
        // address krishnaAddress = address(0xB55E3856A42286370d4B863D9B3800c82d6f903b);
        // address papaAddress = address(0x7d90737dA9C8674e8B05B1aa003ecD864bD4391b);
        // address faddress = address(0xDCE504d66F4F99e755Cd12FE873c802Ec10d49F5);
        // address fiaddress = address(0xEE6F043e2817cd12eFfe9CF31cDafAA60ddD927d);
        // address mairieTana = address(0xDb08B146f6C7c76108a68911e482Dde78763eb3D);
        // address mairieMoramanga = address(0x47f4B066566DDe1040C2e91A35D5f2Da6751c6b9);
        // addCitizen(margotAddress, 'Margot', 'Rasamy');
        // addCitizen(krishnaAddress, 'Andrea', 'Rakoto');
        // addCitizen(papaAddress, 'Tiana', 'Rasalama');
        // addCitizen(faddress, 'Tahina', 'Ramakaveo');
        // addCitizen(fiaddress, 'Tsiky', 'Rasalama');
        // addCityRepresentative(mairieTana, "101", margotAddress);
        // addCityRepresentative(mairieMoramanga, "514", krishnaAddress);
        // addCityRepresentative(mairieMoramanga, "514", papaAddress);
    }

    address owner;

    enum UserType { Citizen, CityRepresentative, Admin }

    event userCreated(address _sender, UserType _type);

    struct User {
        bool exists;
        UserType userType;
    }

    //GET EACH TYPE OF USER INFORMATIONS

    // can add new city representatives and new citizens
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
    struct CityRepresentative {
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
    CityRepresentative[] cityRepresentativesList;
    // List of admins
    Admin[] adminsList;

    string[] citiesList;

    //--- CHECK which type of user is the given
    mapping (address => User) allUsers;
    //-----

    mapping (address => CityRepresentative) public cityRepresentatives;
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

    function getCityRepresentatives() public view returns (CityRepresentative[] memory) {
        return cityRepresentativesList;
    }

    function getCities() public view returns (string[] memory) {
        return citiesList;
    }

    function addCity(string memory _cityID) public returns (string memory) {
        require(allUsers[msg.sender].userType == UserType.Admin, "Only admin can add new cities.");  
        citiesList.push(_cityID);
        return _cityID;
    }

    function addCityRepresentative(address _cityRepAddress, string memory _cityID, address _citizenAddress) public returns (CityRepresentative memory) {
        require(allUsers[msg.sender].userType == UserType.Admin, "City representatives can only be created by admin.");
        // check the address validity
        require(address(_cityRepAddress) != address(0), 'Must enter a city representative address');
        // check the citizen address validity
        require(address(_citizenAddress) != address(0), 'Must enter a valid citizen address');
        require(allUsers[_citizenAddress].userType == UserType.Citizen, 'Must enter a valid citizen address');
        // Get the linked citizen
        Citizen memory citizenInCharge = getCitizen(_citizenAddress);
        // Create new city representative
        CityRepresentative memory newCityRep = CityRepresentative(_cityRepAddress, _cityID, citizenInCharge);
        // Add to city representatives list
        cityRepresentativesList.push(newCityRep);
        // Add to address mapping
        cityRepresentatives[_cityRepAddress] = newCityRep;
        // Add to general user's list
        // User memory newUser = User(true, UserType.Admin);
        // allUsers[_cityRepAddress] = newUser;
        createUser(UserType.CityRepresentative, _cityRepAddress);
        return newCityRep;
    }

    function createUser(UserType userType, address userAddress) public {
        User memory newUser = User(true, userType);
        allUsers[userAddress] = newUser;
        emit userCreated(msg.sender, userType); 
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

    function getCityRepresentative(address _address) public view returns (CityRepresentative memory) {
        require(address(_address) != address(0));
        return cityRepresentatives[_address];
    }

    //check if user exists and get user's type
    function getUser(address userAdd) public view returns (User memory) {
        require(address(userAdd) != address(0));
        return allUsers[userAdd];
    }

    function deleteUser(address userAdd) public view returns (User memory) {
        require(address(userAdd) != address(0));
        return allUsers[userAdd];
    }

}
