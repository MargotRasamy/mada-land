import { GlobalContext } from '../../context/GlobalContext';
import { useContext, useEffect, useState } from 'react';
import LoaderSpinner from '../LoaderSpinner';
import Button from '@mui/material/Button';
import '../../styles/apps/admin-app/admin-app.scss';
import { getUsersContract } from '../../context/utils/ContractsRequests';

const AdminApp = () => {

  const { state, dispatch } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(true);

  const getRegistryOffices = async () => {
      try {
        const contract = await getUsersContract();
        const res = await contract.getRegistryOffices();
        dispatch({type: 'SET_REGISTRY_OFFICE', payload: res});
      } catch (e) {
          dispatch({type: 'ADD_NOTIFICATION', payload: {
              message: e.message,
              severity: e.type,
              title: 'Registry office display fail',
          }});
      }
  }

  useEffect(() => {
    if (state.userData.isConnected) {
      getRegistryOffices();
      setIsLoading(false);
    }
  }, []);

  return (
    <>
    {
      isLoading ?  
      <div className="app-content">
        <LoaderSpinner />
      </div> 
      :
      <div className="app-content admin-app">
        <h1 className='title'>Welcom lands administrator !</h1>
        
        <div className="section">
          <Button color="buttonMain" onClick={()=> {}} variant="contained">Add a new registration officer</Button>
          <div className='element cards-city'>
            {state.registryOffices.length > 0 && 
            state.registryOffices.map((registryOffice, i) => (
                <div className='cards-city--item' key={i}>
                    <h6 className='title'>City : {registryOffice.district}</h6>
                    <p className='address text-clip text-clip--fit-content'>{registryOffice.publicAddress}</p>
                </div>
            ))
            }  

          </div>
        </div>
      </div>
    }
    </>
  );
}

export default AdminApp;