import { GlobalContext } from '../../context/GlobalContext';
import { useContext, useEffect, useState } from 'react';
import LoaderSpinner from '../LoaderSpinner';

const CitizenApp = () => {

  const { state } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (state.userData.isConnected) {
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
      <div className="app-content registry-office-app">
        <h1 className='title'>Citizen app</h1>
        <h3>My City and district</h3>
        
        <div className="section">
        </div>
      </div>
    }
    </>
  );
}

export default CitizenApp;