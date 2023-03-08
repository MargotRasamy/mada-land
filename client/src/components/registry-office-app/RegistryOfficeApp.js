import '../../styles/apps/registry-office/registry-office-app.scss';
import RegistrationRecap from './RegistrationRecap';
import Button from '@mui/material/Button';
import { GlobalContext } from '../../context/GlobalContext';
import { useContext } from 'react';

const RegistryOfficeApp = () => {

  const { state, dispatch } = useContext(GlobalContext);
  
  //Exemple use of context
  const changeName = () => {
   
  }

  return (
    <div className="app-content registry-office-app">
      <h1 className='title'>Land registration administration</h1>
      <h3>City hall : {state.userData.data.district}</h3>
      <RegistrationRecap />
      
      <div className="section">
        <Button color="buttonMain" onClick={changeName} variant="contained">Create a new transaction</Button>
        <Button color="buttonMain" onClick={changeName} variant="contained">Add a citizen</Button>
        <h4>See latest transactions : {state.userData['publicAddress']}</h4>
      </div>
    </div>
  );
}

export default RegistryOfficeApp;