import '../../styles/landing-page.scss';
import RegistrationRecap from './RegistrationRecap';
import Button from '@mui/material/Button';

const LandingPage = () => {

  return (
    <div className="app-content landing-page">
      <h2 className='title'>Land registration administration</h2>
      <h3>City hall : Moramanga District</h3>
      <RegistrationRecap />
      
      <div className="section">
        <Button variant="contained">Create a new transaction manually</Button>
        <Button variant="contained">Add a citizen manually</Button>
        <h4>See latest transactions</h4>
      </div>
    </div>
  );
}

export default LandingPage;