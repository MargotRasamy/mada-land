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
import cities from '../../../../data/cities.json';
import TableRegistryOfficers from './TableRegistryOfficers';

const City = () => {
    const { cityId } = useParams();
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



//   const getRegistryOffices = async () => {
//     try {
//       const contract = await getUsersContract();
//       const res = await contract.getRegistryOffices();
//       dispatch({type: 'SET_REGISTRY_OFFICE', payload: res});
//     } catch (e) {
//         dispatch({type: 'ADD_NOTIFICATION', payload: {
//             message: e.message,
//             severity: e.type,
//             title: 'Registry office display fail',
//         }});
//     }
// }

  const getCityName = (cityId) => {
    return cities["mg"].filter((city) => {return city.id === cityId})[0].name;
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
        <h1 className='title'>City of : {getCityName(cityId)}</h1>
        <div className='frame'>
            <div className='banner-container'>
            <img src={`/cities/${cityId}.jpg`}  alt="city-banner" />
            </div>
        </div>
        
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
            <TableRegistryOfficers />

          </div>
        </div>
      </div>
    }
    </>
  );
}

export default City;