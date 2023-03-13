import { GlobalContext } from '../../../../context/GlobalContext';
import { useContext, useEffect, useState } from 'react';
import LoaderSpinner from '../../../LoaderSpinner';
import Button from '@mui/material/Button';
import '../../../../styles/apps/admin-app/city.scss';
import { getUsersContract } from '../../../../context/utils/ContractsRequests';
import axios from "axios";
import Search from '../../Search';
import countryBanner from '../../../../assets/madagascar.jpeg';
import { useParams } from 'react-router-dom';
// import cityImg from '../../assets/cities';
import cities from '../../../../data/citiesNames.json';
import TableRegistryOfficers from './TableRegistryOfficers';
import BackLink from '../../../BackLink';

const City = () => {
  const { cityId } = useParams();
  const { state, dispatch } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(true);
  const [registryOfficesByCity, setRegistryOfficesByCity] = useState([]);

  const getRegistryOffices = async () => {
      try {
        const contract = await getUsersContract();
        const res = await contract.getRegistryOffices();
        dispatch({type: 'SET_REGISTRY_OFFICE', payload: res});
        if (res.length > 0) {
          let registryOfficeCity = res.filter((registryOffice)=> {return registryOffice.cityID === cityId});
          console.log(res);
          console.log(cityId);
          console.log(registryOfficeCity);
          setRegistryOfficesByCity(registryOfficeCity);
        }
      } catch (e) {
          dispatch({type: 'ADD_NOTIFICATION', payload: {
              message: e.message,
              severity: e.type,
              title: 'Registry office display fail',
          }});
      }
  }

  const getCityName = (cityId) => {
    return cities[cityId];
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
      <div className="app-content city">
        <BackLink link="/admin" />
        <h1 className='title'>City of : {getCityName(cityId)}</h1>
        <div className='frame'>
            <div className='banner-container'>
            <img src={`/cities/${cityId}.jpg`}  alt="city-banner" />
            </div>
        </div>
        
        <div className="section">
          <Button color="buttonMain" onClick={()=> {}} variant="contained">Add a new registration officer</Button>
          <Search />

          <div className='element cards-city'>
            <TableRegistryOfficers registryOffices={registryOfficesByCity} />
          </div>
        </div>
      </div>
    }
    </>
  );
}

export default City;