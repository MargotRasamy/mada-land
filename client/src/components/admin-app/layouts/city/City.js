import { GlobalContext } from '../../../../context/GlobalContext';
import { useContext, useEffect, useState } from 'react';
import LoaderSpinner from '../../../LoaderSpinner';
import Button from '@mui/material/Button';
import '../../../../styles/apps/admin-app/city.scss';
import { getUsersContract } from '../../../../context/utils/ContractsRequests';
import Search from '../../Search';
import { useParams } from 'react-router-dom';
// import cityImg from '../../assets/cities';
import cities from '../../../../data/citiesNames.json';
import TableRegistryOfficers from './TableRegistryOfficers';
import BackLink from '../../../BackLink';
import CreateModal from './CreateModal';
import CityFrame from '../../../CityFrame';

const City = () => {
  const { cityId } = useParams();
  const { state, dispatch } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(true);
  const [registryOfficesByCity, setRegistryOfficesByCity] = useState([]);
  const [registryOfficesByCityFiltered, setRegistryOfficesByCityFiltered] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  const handleSearchInput = (e) => {
    let data = registryOfficesByCity.filter((registryOffice) => {
      let regAddress = registryOffice.publicAddress.toLowerCase();
      let citAddress = registryOffice.citizenship.publicAddress.toLowerCase();
      let firstname = registryOffice.citizenship.firstname.toLowerCase();
      let lastname = registryOffice.citizenship.lastname.toLowerCase();

      return firstname.includes(e.target.value.toLowerCase()) || lastname.includes(e.target.value.toLowerCase()) || regAddress.includes(e.target.value.toLowerCase()) || citAddress.includes(e.target.value.toLowerCase()) ;
    });
    setRegistryOfficesByCityFiltered(data);
  }

  const getCityRepresentatives = async () => {
      try {
        const contract = await getUsersContract();
        const res = await contract.getCityRepresentatives();
        dispatch({type: 'SET_REGISTRY_OFFICE', payload: res});
        if (res.length > 0) {
          let registryOfficeCity = res.filter((registryOffice)=> {return registryOffice.cityID === cityId});
          console.log(res);
          console.log(cityId);
          console.log(registryOfficeCity);
          setRegistryOfficesByCity(registryOfficeCity);
          setRegistryOfficesByCityFiltered(registryOfficeCity);
        }
      } catch (e) {
          dispatch({type: 'ADD_NOTIFICATION', payload: {
              message: e.message,
              severity: e.type,
              title: 'Communal representative display fail',
          }});
      }
  }


  const getCityName = (cityId) => {
    return cities[cityId];
  }

  const openModal = () =>{ 
    setModalShow(true);
  }
  
  const closeModal = () =>{ 
    setModalShow(false);
  }

  useEffect(() => {
    if (state.userData.isConnected) {
      getCityRepresentatives(); 
      setIsLoading(false);
    }

    (async function() {

      const contract = await getUsersContract();
      contract.on("userCreated", (sender, userType) => {
        setIsLoading(true);
        console.log(sender, userType);
        getCityRepresentatives();
        setIsLoading(false);
      })
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
      <div className="app-content city">
        <BackLink link="/admin" />
        <h1 className='title'>City of : {getCityName(cityId)}</h1>
        <CityFrame cityId={cityId} />

        <CreateModal
          show={modalShow}
          cityId={cityId}
          onHide={() => setModalShow(false)}
        />
        
        <div className="section">
          <div className='element'>
            <Button color="buttonMain" onClick={()=> {openModal()}} variant="contained">Add a new communal representative</Button>
            <Search placeholder="Search for a communal representative..." handleChange={handleSearchInput} />
            <TableRegistryOfficers registryOffices={registryOfficesByCityFiltered} />
          </div>
        </div>
      </div>
    }
    </>
  );
}

export default City;