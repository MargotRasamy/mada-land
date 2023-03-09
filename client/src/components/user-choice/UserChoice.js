import '../../styles/landing-page.scss';
import Button from '@mui/material/Button';
import { GlobalContext } from '../../context/GlobalContext';
import React, { useContext, useEffect, useState } from 'react';
import { checkUserConnected, connectWallet, getUserRegistryOffice, getUsersContract } from '../../context/utils/ContractsRequests';
import { useNavigate } from "react-router-dom";
import { UserType } from '../../context/utils/UserType';
import LoaderSpinner from '../LoaderSpinner';

const UserChoice = () => {

    const { ethereum } = window;
    const navigateTo = useNavigate();
    const { state, dispatch } = useContext(GlobalContext);
    const [isLoading, setIsLoading] = useState(true);
    const connectUserCitizen = () => {
    }

    const connectUserRegistryOffice = async () => {
        try {
            const accountConnected = await connectWallet();
            const contract = await getUsersContract(false);
            const office = await contract.getRegistryOffice(accountConnected);
            console.log(office)
            dispatch({type: 'SET_USER_DATA', payload: {isConnected: true, userType: UserType.RegistryOffice, publicAddress: accountConnected, data: office}});
            dispatch({type: 'ADD_NOTIFICATION', payload: {
                message: 'Successfully connected to wallet',
                severity: 'success',
                title: 'Wallet connection success',
            }});
            navigateTo('/registry-office');
        } catch (e) {
            dispatch({type: 'ADD_NOTIFICATION', payload: {
                message: e.message,
                severity: e.type,
                title: 'Wallet connection pending',
            }});
        }
    }

    const getRegistryOffices = async () => {
        try {
          const contract = await getUsersContract();
          const res = await contract.getRegistryOffices();
          dispatch({type: 'SET_REGISTRY_OFFICE', payload: res});
        } catch (e) {
            dispatch({type: 'ADD_NOTIFICATION', payload: {
                message: e.message,
                severity: e.type,
                title: 'Unknown error',
            }});
        }
    }

    useEffect(() => {
        
        getRegistryOffices();
    }, []);

    useEffect(() => {
        if (state.userData.isConnected) {
            dispatch({type: 'ADD_NOTIFICATION', payload: {
                message: 'Successfully connected to wallet',
                severity: 'success',
                title: 'Wallet connection success',
            }});
            
            switch (state.userData.userType) {
                case UserType.RegistryOffice:
                    navigateTo('/registry-office');
                    break;
                case UserType.Citizen:
                    navigateTo('/error404');
                    break;
                default:
                    break;
            }
        }
    }, [state.userData.isConnected, state.userData.userType, navigateTo, dispatch]);

    useEffect(() => {
        // CHECK if user is connected
        (async function () {
          const userConnected = await checkUserConnected();
          if (userConnected.isConnected) {
            dispatch({type: 'SET_USER_DATA', payload: {isConnected: userConnected.isConnected, userType: UserType.RegistryOffice, publicAddress: userConnected.publicAddress, data: userConnected.data}});
            setIsLoading(false);
          } else {
            setIsLoading(false);
          }
          
          ethereum.on('connect', async (accounts) => {
            setIsLoading(true);
            let currentAccount = accounts[0];
            let office = await getUserRegistryOffice(currentAccount);
            let userConnected = {      
              isConnected: true,
              publicAddress: currentAccount,
              data: {
                district: office.district,
                publicAddress: office.publicAddress
              }
            }
    
            dispatch({type: 'SET_USER_DATA', payload: {isConnected: userConnected.isConnected, userType: UserType.RegistryOffice, publicAddress: userConnected.publicAddress, data: userConnected.data}});
            setIsLoading(false);
          });
      
          ethereum.on('accountsChanged', async (accounts) => {
            console.log('accountsChanged', accounts);
            setIsLoading(true);
    
            if (accounts.length > 0) {
              let currentAccount = accounts[0];
              let office = await getUserRegistryOffice(currentAccount);
              let userConnected = {      
                isConnected: true,
                publicAddress: currentAccount,
                data: {
                  district: office.district,
                  publicAddress: office.publicAddress
                }
              }
              dispatch({type: 'SET_USER_DATA', payload: {isConnected: userConnected.isConnected, userType: UserType.RegistryOffice, publicAddress: userConnected.publicAddress, data: userConnected.data}});
            } else {
              console.log('disconnected');
              dispatch({type: 'SET_USER_DATA', payload: {isConnected: false, userType: '0', publicAddress: '', data: { publicAddress: '', district: '' }}});
            }
            setIsLoading(false);
            navigateTo('/');
          });
    
        })();
      }, []);

    return (
        <>
            {
                isLoading ?  
                <div className="app-content">
                    <LoaderSpinner />
                </div> 
                :
                <div className="app-content user-choice">
                    <h1 className='title'>Choose your platform</h1>
                    
                    <div className="section choice-menu">
                        <Button sx={{ mr: 2 }} color="buttonMain" onClick={connectUserRegistryOffice} variant="contained">Registry office</Button>
                        <Button sx={{ mr: 2 }} color="buttonMain" onClick={connectUserCitizen} variant="contained">Citizen</Button>
                    </div>
        
                    <div className="section">
                    {state.registryOffices.length > 0 && 
                    state.registryOffices.map((registryOffice, i) => (
                        <div key={i}>
                            {registryOffice.district}
                        </div>
                    ))
                    }  
                    </div>
                </div>
            }    
        </>
    );
}

export default UserChoice;