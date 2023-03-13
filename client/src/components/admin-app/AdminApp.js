import { GlobalContext } from '../../context/GlobalContext';
import { useContext, useEffect, useState } from 'react';
import LoaderSpinner from '../LoaderSpinner';
import Button from '@mui/material/Button';
import '../../styles/apps/admin-app/admin-app.scss';
import { getUsersContract } from '../../context/utils/ContractsRequests';
import axios from "axios";
import Search from './Search';
import cities from '../../data/citiesNames.json';
import countryBanner from '../../assets/madagascar.jpeg';
import { useNavigate } from 'react-router-dom';
// import cityImg from '../../assets/cities';

const AdminApp = () => {

  const { state, dispatch } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(true);
  const [citiesList, setCities] = useState([]);
  const [country, setCountry] = useState('');
  const navigateTo = useNavigate();

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

  const getCountryName = async () => {
    if (state.userData.data.countryCode === 'mg')
    setCountry('Madagascar');
  }

  const getCities = async () => {
    try {
      const contract = await getUsersContract();
      const citiesResult = await contract.getCities();
      if (citiesResult.length > 0) {
        let allCities = citiesResult.map((cityCode) => {
          return {
            "id": cityCode,
            "name": cities[cityCode]
          }
        });
        setCities(allCities);
      }
    } catch (e) {
      console.log(e)
    }
  }

  const getCity = (_cityName) => {
    navigateTo(`/admin/city/${_cityName}`);
  }


  useEffect(() => {
    if (state.userData.isConnected) {
      getCountryName();
      getRegistryOffices();
      getCities();
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
        <div className='banner-container'>
          <img src={countryBanner} alt="country-banner" />
        </div>
        <h1 className='title'>Welcome <strong>{country}</strong> lands administrator !</h1>
        
        <div className="section">
          <Button color="buttonMain" onClick={()=> {}} variant="contained">Add a new registration officer</Button>
          <Search />
          {/* <div className='element cards-city'>
            {state.registryOffices.length > 0 && 
            state.registryOffices.map((registryOffice, i) => (
                <div className='cards-city--item' key={i}>
                    <h6 className='title'>City : {getCityName(registryOffice.cityID)}</h6>
                    <p className='address text-clip text-clip--fit-content'>{registryOffice.publicAddress}</p>
                </div>
            ))
            }  
          </div> */}
          <div className='element cards-city'>
            {citiesList.length > 0 ? 
              citiesList.map((city, i) => (
                  <div className='cards-city--item' key={i} onClick={() => {getCity(city.id)}}>
                    <div className="img-container">
                      <div className='overlay-img'></div>
                      <img 
                          src={`/cities/${city.id}.jpg`} 
                          alt={city.id}></img>
                    </div>
                    
                    <div className='content'> 
                      <h6 className='title'>City : {city.name}</h6>
                    </div>
                  </div>
              )) : <p>No cities.</p>
            }  

          </div>
        </div>
      </div>
    }
    </>
  );
}

export default AdminApp;