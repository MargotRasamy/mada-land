import { ethers } from 'ethers';
import { usersContractABI, usersContractAddress } from '../ContractsData';
const { ethereum } = window;


// Get a smart-contract info
export const getEthereumContract = (address, abi) => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    // Address of the wallet of deployed the contract
    const signer = provider.getSigner();
    // get the transaction contract
    const smartContract = new ethers.Contract(address, abi, signer);

    console.log({
        provider,
        signer,
        smartContract
    })
    return smartContract;
}
// Get usersContract
export const getUsersContract = () => {
    return getEthereumContract(usersContractAddress, usersContractABI)
}

export const connectWallet = async () => {
    try {
        checkWalletInstalled();
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        console.log('Connected account : ', accounts[0]);
        return accounts[0];
    } catch (error) {
        console.log('No ethereum object.');
        throw new Error('No ethereum object.');
    }
}

const checkWalletInstalled = () => {
    if (!ethereum) { alert('Please install metamask') };
}