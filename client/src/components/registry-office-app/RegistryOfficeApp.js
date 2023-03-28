import '../../styles/apps/registry-office/registry-office-app.scss';
import RegistrationRecap from './RegistrationRecap';
import Button from '@mui/material/Button';
import { GlobalContext } from '../../context/GlobalContext';
import { useContext, useEffect, useState } from 'react';
import LoaderSpinner from '../LoaderSpinner';
import cities from '../../data/citiesNames.json';
import CityFrame from '../CityFrame';
import CitizensPage from './CitizensPage';

const RegistryOfficeApp = () => {

  const { state, dispatch } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(true);

  const getCityName = (cityId) => {
    return cities[cityId];
  }

  useEffect(() => {
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
      <div className="app-content registry-office-app">
        <h1 className='title'>Land registration administration</h1>
        <h3>City : <strong>{getCityName(state.userData.data.cityID)}</strong></h3>
        <h5>Welcome registry officer <strong>{state.userData.data.citizenship.firstname} {state.userData.data.citizenship.lastname}</strong> !</h5>
        {/* <RegistrationRecap /> */}
        <CityFrame cityId={state.userData.data.cityID} />
        
        <div className="section">
          <h4>See all citizens</h4>
          <CitizensPage />
        </div>
      </div>
    }
    </>
  );
}

export default RegistryOfficeApp;