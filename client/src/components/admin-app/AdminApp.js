import { GlobalContext } from '../../context/GlobalContext';
import { useContext, useEffect, useState } from 'react';
import LoaderSpinner from '../LoaderSpinner';
import Button from '@mui/material/Button';
import '../../styles/apps/admin-app/admin-app.scss';
import { getUsersContract } from '../../context/utils/ContractsRequests';
import axios from "axios";
import Search from './Search';
import cities from '../../data/cities.json';
import countryBanner from '../../assets/madagascar.jpeg';
import { useNavigate } from 'react-router-dom';
// import cityImg from '../../assets/cities';

const AdminApp = () => {

  const { state, dispatch } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(true);
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

  const getAllCountries = async () => {
    var config = {
      method: 'get',
      url: 'https://api.countrystatecity.in/v1/countries',
      headers: {
        'X-CSCAPI-KEY': 'API_KEY'
      }
    };

    try {
      let response = await axios(config);
      console.log(JSON.stringify(response.data));
    } catch (e) {
      console.log(e);
    }
    
  }

  const getCity = (_cityName) => {
    navigateTo(`/admin/city/${_cityName}`);
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
        <div className='banner-container'>
          <img src={countryBanner} alt="country-banner" />
        </div>
        <h1 className='title'>Welcome lands administrator !</h1>
        
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
            {cities["mg"].length > 0 ? 
              cities["mg"].map((city, i) => (
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