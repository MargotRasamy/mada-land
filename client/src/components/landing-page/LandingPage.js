import '../../styles/landing-page.scss';
import RegistrationRecap from './RegistrationRecap';
import Button from '@mui/material/Button';

const LandingPage = () => {

  return (
    <div className="app-content landing-page">
      <h1 className='title'>Land registration administration</h1>
      <h3>City hall : Moramanga District</h3>
      <RegistrationRecap />
      
      <div className="section">
        <Button color="buttonMain" variant="contained">Create a new transaction manually</Button>
        <Button color="buttonMain" variant="contained">Add a citizen manually</Button>
        <h4>See latest transactions</h4>
      </div>
    </div>
  );
}

export default LandingPage;