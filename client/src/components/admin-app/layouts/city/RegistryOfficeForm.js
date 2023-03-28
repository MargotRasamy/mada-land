import { Button } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Alert, Form, Toast } from 'react-bootstrap';
import { GlobalContext } from '../../../../context/GlobalContext';
import { getUsersContract } from '../../../../context/utils/ContractsRequests';
import cities from '../../../../data/citiesNames.json';
import LoaderSpinner from '../../../LoaderSpinner';
const MovieForm = ({closeModal, cityId}) => { 

    const { dispatch } = useContext(GlobalContext);
    const [validated, setValidated] = useState(false);
    const [rgPublicAddress, setRgPublicAddress] = useState('');
    const [citizenPublicAddress, setCitizenPublicAddress] = useState('');
    const [citizensList, setCitizens] = useState([]);
    const [isLoading, setIsLoading] = useState([]);

    // Error messages
    const [errorMessage, setErrorMessage] = useState('');
    // Success messages
    const [successMessage, setSuccessMessage] = useState('');
    const [successLink, setSuccessLink] = useState('');

    const handleCategoryChange = (e) => {
        setCitizenPublicAddress(e.target.value);
    }

    const getCityName = () => {
        return cities[cityId];
    }

    const formatAddress = (address, substringLength) => {
        return `${address.substring(0, substringLength)}...${address.substring(address.length - substringLength, address.length)}`
    }

    const getCitizens = async () => {
        try {
          const contract = await getUsersContract();
          const citizensRes = await contract.getCitizens();
          if (citizensRes.length > 0) {
            let allCities = citizensRes.map((citizen) => {
              return {
                "id": citizen.publicAddress,
                "name": `${formatAddress(citizen.publicAddress, 5)} ${citizen.firstname} ${citizen.lastname}`
              }
            });
            setCitizens(allCities);
          }
        } catch (e) {
          console.log(e)
        }
      }

    const handleSubmit = async(event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (!form.checkValidity()) {
            event.stopPropagation();
        } else {
            try {
                let res = await createNewRegistryOffice(rgPublicAddress, cityId, citizenPublicAddress);
                console.log(res);
                initFormData();
                setSuccessLink(`https://sepolia.etherscan.io/tx/${res.hash}`);
                setSuccessMessage("See transaction here : ");
                // closeModal();
                dispatch({type: 'ADD_NOTIFICATION', payload: {
                  message: 'Transaction pending !',
                  severity: 'success',
                  title: 'Registry office creation',
                }});
            } catch (e) {
                setErrorMessage(e);
            }
        }
        setValidated(true);
    }

    const createNewRegistryOffice = async (_rgPublicAddress, _cityCode, _citizenAddress) => {
        try {
          const contract = await getUsersContract(false);
          const result = await contract.addRegistryOfficers(_rgPublicAddress, _cityCode, _citizenAddress);
          return result;
        } catch (e) {
          console.log(e);
        }
      }

    const initFormData = () => {
        setRgPublicAddress('');
        setCitizenPublicAddress('');
    }

    useEffect(() => {
        getCitizens();
        setIsLoading(false);
    }, []);

    return (
        <>
        {
            isLoading ?
            <div className="app-content">
                <LoaderSpinner />
            </div>  :
            <Form className='movie-form' noValidate validated={validated} onSubmit={(e) => {handleSubmit(e)}}>
                { successMessage.length > 0 &&
                    <Alert variant="success">
                        {successMessage} 
                        {
                            successLink.length > 0 && 
                            <a href={successLink} target="_blank" rel="noreferrer">{formatAddress(successLink, 20)}</a>
                        }
                    </Alert>
                }
                { errorMessage.length > 0 &&
                    <Alert variant="danger">
                        {errorMessage}
                    </Alert>
                }   
                <h5>New registry officer for the city of <strong>{getCityName()}</strong></h5>
                <p>Create a new professionnal address for the registry officer and select the citizen in charge of the registration.</p>
                <Form.Group className="my-3" controlId="rgPublicAddressForm">
                    <Form.Label className='label'>Registration office public address</Form.Label>
                    <Form.Control 
                        required={true}
                        type='text'
                        name='rgPublicAddress'
                        placeholder='Enter a registration office public address'
                        onChange={event => setRgPublicAddress(event.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter a public address for the registry office
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="my-3" controlId="citizenPublicAddressForm">
                    <Form.Label className='label'>Citizen public address</Form.Label>
                    <Form.Select required name="citizen_public_address" onChange={(e) => handleCategoryChange(e)}>
                        <option value=''>Citizen in charge</option>
                        { citizensList.map((citizen,index) => {
                            return <option key={index} value={citizen.id}>{citizen.name}</option>
                        })}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        Please enter a public address for the registry office
                    </Form.Control.Feedback>
                </Form.Group>
                {/* <Form.Group className="my-3" controlId="citizenPublicAddressForm">
                    <Form.Label className='label'>Citizen public address</Form.Label>
                    <Form.Control 
                        required={true}
                        type='text'
                        name='citizenPublicAddress'
                        placeholder='Enter a citizen public address'
                        onChange={event => setCitizenPublicAddress(event.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter a public address for the registry office
                    </Form.Control.Feedback>       
                </Form.Group> */}

                <Button type="submit" color="buttonMain" variant="contained">Add a new registration officer</Button>
            
            </Form>

        }
        </>
    );
}

export default MovieForm;