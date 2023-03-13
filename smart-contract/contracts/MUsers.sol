// // SPDX-License-Identifier: UNLICENSED
// pragma solidity ^0.8.9;

// // Uncomment this line to use console.log
// import "hardhat/console.sol";

// contract Users {

//     constructor() {
//         owner = msg.sender;
//         addAdmin(owner, "mg");
//     }

//     address owner;

//     enum UserAuthority { RegistryOffice, Admin }

//     struct Citizen {
//         uint id;
//         bool exists;
//         UserAuthority[] userAuthority;
//         address publicAddress;
//         string firstname;
//         string lastname;
//     }

//     //GET EACH TYPE OF USER INFORMATIONS

//     // can add new registry office and new citizens
//     struct Admin {
//         uint id;
//         Country country;
//     }

//     struct Country {
//         uint countryCode;
//     }

//     // can add new citizens
//     struct RegistryOffice {
//         uint id;
//         City city;
//     }


//     struct City {
//         uint cityCode;
//         Country country;
//     }

//     //--- CHECK which type of user is the given
//     mapping (address => Citizen) allUsers;

//     // Lands owned
//     mapping (address => string) landOwned;
//     mapping (string => address) landOwned;

// }
