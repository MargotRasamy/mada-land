import '../../styles/landing-page.scss';
import Button from '@mui/material/Button';
import { GlobalContext } from '../../context/GlobalContext';
import React, { useContext, useEffect, useState } from 'react';
import { connectWallet, getUsersContract } from '../../context/utils/ContractsRequests';
import { useNavigate } from "react-router-dom";
import { UserType } from '../../context/utils/UserType';
import LoaderSpinner from '../LoaderSpinner';
import countryBanner from '../../assets/madaland.jpeg';

const LandingPage = () => {

    const { ethereum } = window;
    const navigateTo = useNavigate();
    const { state, dispatch } = useContext(GlobalContext);
    const [isLoading, setIsLoading] = useState(true);

    const setNewAccount = async (accountPublicAddress) => {
      try {
        const contract = await getUsersContract();
        const user = await contract.getUser(accountPublicAddress);
        let data;
        let userCategory;
        let redirectLink;
        console.log(user);
        if (user.exists) {
          switch (user.userType) {
            case UserType.RegistryOffice:
              data = await contract.getCityRepresentative(accountPublicAddress);
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
          dispatch({type: 'SET_USER_DATA', payload: {isConnected: user.exists, userType: userCategory, publicAddress: accountPublicAddress, data: data}});
          setIsLoading(false);
          navigateTo(redirectLink);
          if (user.exists) {
            dispatch({type: 'ADD_NOTIFICATION', payload: {
                message: 'Successfully connected to wallet',
                severity: 'success',
                title: 'Wallet connection success',
            }});
          } else {
            dispatch({type: 'ADD_NOTIFICATION', payload: {
              message: 'Current user is not enrolled',
              severity: 'info',
              title: 'User not enrolled',
            }});
          }
        
      } catch (e) {
        console.log(e);
        setIsLoading(false);
      }
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
            console.log("here ", accounts);
    
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
                    <div className='banner'>
                      <div className='banner-container'>
                        <img src={countryBanner} alt="country-banner" />
                      </div>
                      <div className='banner-caption'>
                        <h1 className='title'>Mada Land</h1>
                        <p>Mada Land helps communes and regional domains to register landholdings in Madagascar.</p>
                      </div>

                    </div>

                    <div className="section choice-menu">
                      <div className='choice'>
                        <span className='choice-container'>
                          <p className='title'>Manage municipal representatives, lands and citizens</p>
                          <p className='caption'>MadaLand gives you better visibility of the status of land ownership and registration applications in each commune.</p>
                        </span>
                        <Button sx={{ mr: 2 }} color="buttonMain" onClick={() => {connectUserWallet()}} variant="contained">Administrator</Button>
                      </div>
                      <div className='choice'>
                        <span className='choice-container'>
                          <p className='title'>Manage registration requests</p>
                          <p className='caption'>Validate or reject property registration applications following local land recognitions</p>
                        </span>
                        <Button sx={{ mr: 2 }} color="buttonMain" onClick={() => {connectUserWallet()}} variant="contained">Communal representative</Button>
                      </div>
                      <div className='choice'>
                        <span className='choice-container'>
                          <p className='title'>Secure your lands and certificates proofs</p>
                          <p className='caption'>Send registration requests and manage your land certificates</p>
                        </span>
                        <Button sx={{ mr: 2 }} color="buttonMain" onClick={() => {connectUserWallet()}} variant="contained">Citizen</Button>
                      </div>
                    </div>
                </div>
            }    
        </>
    );
}

export default LandingPage;