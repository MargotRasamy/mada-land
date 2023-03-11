import '../../styles/landing-page.scss';
import Button from '@mui/material/Button';
import { GlobalContext } from '../../context/GlobalContext';
import React, { useContext, useEffect, useState } from 'react';
import { connectWallet, getUserRegistryOffice, getUsersContract } from '../../context/utils/ContractsRequests';
import { useNavigate } from "react-router-dom";
import { UserType } from '../../context/utils/UserType';
import LoaderSpinner from '../LoaderSpinner';

const LandingPage = () => {

    const { ethereum } = window;
    const navigateTo = useNavigate();
    const { state, dispatch } = useContext(GlobalContext);
    const [isLoading, setIsLoading] = useState(true);

    const setNewAccount = async (accountPublicAddress) => {
      const contract = await getUsersContract();
      const user = await contract.getUser(accountPublicAddress);
      let data;
      let userCategory;
      let redirectLink;
      console.log(user);
      if (user.exists) {
        switch (user.userType) {
          case UserType.RegistryOffice:
            data = await contract.getRegistryOffice(accountPublicAddress);
            userCategory = user.userType;
            redirectLink = '/registry-office';
            break;
          case UserType.Citizen:
            data = await contract.getCitizen(accountPublicAddress);
            userCategory = user.userType;
            redirectLink = '/citizen';
            break;
          case UserType.Admin:
            data = await contract.getAdmin(accountPublicAddress);
            userCategory = user.userType;
            redirectLink = '/admin';
            break;
          default:
            break;
        }
      }

      console.log(data);
      dispatch({type: 'SET_USER_DATA', payload: {isConnected: true, userType: userCategory, publicAddress: accountPublicAddress, data: data}});
      setIsLoading(false);
      navigateTo(redirectLink);
      dispatch({type: 'ADD_NOTIFICATION', payload: {
          message: 'Successfully connected to wallet',
          severity: 'success',
          title: 'Wallet connection success',
      }});
    }

    // General method
    const connectUserWallet = async () => {
        try {
            const accountPublicAddress = await connectWallet();
            setNewAccount(accountPublicAddress);
        } catch (e) {
            dispatch({type: 'ADD_NOTIFICATION', payload: {
                message: e.message,
                severity: e.type,
                title: 'Wallet connection pending',
            }});
        }
    }

    useEffect(() => {
        // CHECK if user is connected 
        (async function () {
          // If new connection has occurred
          ethereum.on('connect', async (accounts) => {
            setIsLoading(true);
            console.log('connect');
            let accountPublicAddress = accounts[0];
            setNewAccount(accountPublicAddress);
          });
      
          // If new account change or disconnection has occurred
          ethereum.on('accountsChanged', async (accounts) => {
            console.log('accountsChanged', accounts);
            setIsLoading(true);
    
            if (accounts.length > 0) {
              let accountPublicAddress = accounts[0];
              setNewAccount(accountPublicAddress);
            } else {
              console.log('disconnected');
              dispatch({type: 'SET_USER_DATA', payload: {isConnected: false, userType: 0, publicAddress: '', data: {}}});
              setIsLoading(false);
              navigateTo('/');
            }
          });
        })();

        setIsLoading(false);
      }, []);

    return (
        <>
            {
                isLoading ?  
                <div className="app-content">
                    <LoaderSpinner />
                </div> 
                :
                <div className="app-content landing-page">
                    <h1 className='title'>Choose your platform</h1>
                    <p>Which type of user are you ?</p>

                    <div className="section choice-menu">
                        <Button sx={{ mr: 2 }} color="buttonMain" onClick={() => {connectUserWallet()}} variant="contained">Registry office</Button>
                        <Button sx={{ mr: 2 }} color="buttonMain" onClick={() => {connectUserWallet()}} variant="contained">Citizen</Button>
                        <Button sx={{ mr: 2 }} color="buttonMain" onClick={() => {connectUserWallet()}} variant="contained">Admin</Button>
                    </div>
                </div>
            }    
        </>
    );
}

export default LandingPage;