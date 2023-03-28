import { GlobalContext } from '../../context/GlobalContext';
import { useContext, useEffect, useState } from 'react';
import LoaderSpinner from '../LoaderSpinner';
import '../../styles/apps/admin-app/admin-app.scss';
import { getUsersContract } from '../../context/utils/ContractsRequests';
import Search from './Search';
import cities from '../../data/citiesNames.json';
import countryBanner from '../../assets/madagascar.jpeg';
import { useNavigate } from 'react-router-dom';
// import cityImg from '../../assets/cities';

const AdminApp = () => {

  const { state, dispatch } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(true);
  const [citiesList, setCities] = useState([]);
  const [citiesFiltered, setCitiesFiltered] = useState([]);
  const [country, setCountry] = useState('');
  const navigateTo = useNavigate();

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
        setCitiesFiltered(allCities);
        setCities(allCities);
      }
    } catch (e) {
      console.log(e)
    }
  }

  const getCity = (_cityName) => {
    navigateTo(`/admin/city/${_cityName}`);
  }

  const handleSearchInput = (e) => {
    let data = citiesList.filter((city) => {
      let cityName = city.name.toLowerCase();
      return cityName.includes(e.target.value.toLowerCase());
    });
    setCitiesFiltered(data);
  }

  useEffect(() => {
    if (state.userData.isConnected) {
      getCountryName();
      getCities();
      setIsLoading(false);
    }
  }, []);

  return (
    <>
    {
      isLoading && (!citiesFiltered.length > 0) ?  
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
          <Search placeholder="Search for a city..." handleChange={handleSearchInput} />
          <div className='element cards-city'>
            {citiesFiltered.length > 0 ? 
              citiesFiltered.map((city, i) => (
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
              )) : <p>No cities found.</p>
            }
          </div>
        </div>
      </div>
    }
    </>
  );
}

export default AdminApp;