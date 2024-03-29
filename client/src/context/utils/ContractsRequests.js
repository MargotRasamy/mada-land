import { ethers } from 'ethers';
import { usersContractABI, usersContractAddress } from '../ContractsData';
import { CustomError } from './CustomError';
import { UserType } from './UserType';
const { ethereum } = window;

// Get a smart-contract info READONLY
export const getEthereumContract_READONLY = (address, abi) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      address,
      abi,
      provider
    );
    console.log({
      address,
      abi,
      provider
    });
    return contract;
  } catch (error) {
    throw new CustomError(error, 'error');
  }
}

// Get a smart-contract info read/write
export const getEthereumContract_RW = (address, abi) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      address,
      abi,
      signer
    );
    console.log({
      address,
      abi,
      signer
    });
    return contract;
  } catch (error) {
    throw new CustomError(error, 'error');
  }
} 

// Get usersContract
export const getUsersContract = (readonly = true) => {
    return readonly === true ? getEthereumContract_READONLY(usersContractAddress, usersContractABI) : getEthereumContract_RW(usersContractAddress, usersContractABI);
}

export const connectWallet = async () => {
    try {
        checkWalletInstalled();
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        console.log('Connected account : ', accounts[0]);
        return accounts[0];
    } catch (error) {
      if (error.code === -32002) {
        throw new CustomError('We are already trying to process your account. Please open your metamask browser extension.', 'info');
      } else {
        throw new CustomError('Could not find your ethereum metamask account. Please try again or make sure to have metamask installed.', 'error');
      }
    }
}

export const checkWalletConnected = async () => {
  try {
      checkWalletInstalled();
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      return accounts;
  } catch (error) {
    if (error.code === -32002) {
      throw new CustomError('We are already trying to process your account. Please open your metamask browser extension.', 'warning');
    } else {
      throw new CustomError('Could not find your ethereum metamask account. Please try again or make sure to have metamask installed.', 'error');
    }
  }
}

export const getUser = async (accountConnected) => {
  try {
      const contract = await getUsersContract(false);
      const user = await contract.getUser(accountConnected);
      return user;
  } catch (e) {
    throw new CustomError(e, 'error');
  }
}

const checkWalletInstalled = () => {
    if (!ethereum) { throw new CustomError('Please install metamask', 'info'); };
}