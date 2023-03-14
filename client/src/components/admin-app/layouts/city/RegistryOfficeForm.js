import { Button } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Alert, Form, Toast } from 'react-bootstrap';
import { GlobalContext } from '../../../../context/GlobalContext';
import { getUsersContract } from '../../../../context/utils/ContractsRequests';
import cities from '../../../../data/citiesNames.json';
import LoaderSpinner from '../../../LoaderSpinner';
const MovieForm = ({closeModal}) => { 

    const { state, dispatch } = useContext(GlobalContext);
    const [validated, setValidated] = useState(false);
    const [rgPublicAddress, setRgPublicAddress] = useState('');
    const [citizenPublicAddress, setCitizenPublicAddress] = useState('');
    const [citiesList, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState([]);
    const [categorySelected, setCategorySelected] = useState('');

    // Error messages
    const [errorMessage, setErrorMessage] = useState('');
    const [error, setError] = useState(false);
    // Success messages
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleCategoryChange = (e) => {
        setCategorySelected(e.target.value);
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

    const handleSubmit = async(event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (!form.checkValidity()) {
            event.stopPropagation();
        } else {
            let res = await createNewRegistryOffice(rgPublicAddress, categorySelected, citizenPublicAddress);
            console.log(res);
            initFormData();
            setSuccess(true);
            setSuccessMessage("See transaction here : ")
            
            // closeModal();
            dispatch({type: 'ADD_NOTIFICATION', payload: {
              message: 'Transaction pending !',
              severity: 'success',
              title: 'Registry office creation',
            }});
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
        setCategorySelected('');
        setCitizenPublicAddress('');
    }

    useEffect(() => {
        getCities();
        setIsLoading(false);
    }, []);

    return (
        <>
        {
            isLoading ?
            <div className="app-content">
                <LoaderSpinner />
            </div>  :
            <Form className='movie-form' noValidate validated={validated} onSubmit={handleSubmit}>
                { success &&
                    <Toast bg='success'>
                        <Toast.Header>
                        <strong className="me-auto">Success !</strong>
                        </Toast.Header>
                        <Toast.Body>{successMessage} </Toast.Body>
                    </Toast>
                }
                { error &&
                    <Alert variant="danger">
                        {errorMessage}
                    </Alert>
                }   
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
                <Form.Select className="my-3" aria-label="Default select" onChange={(e) => handleCategoryChange(e)}>
                    <option>City to handle</option>
                    { citiesList.map((city,index) => {
                        return <option key={index} value={city.id}>{city.name}</option>
                    })}
                </Form.Select>
                <Form.Group className="my-3" controlId="citizenPublicAddressForm">
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
                </Form.Group>

                <Button color="buttonMain" onClick={(e) => {handleSubmit(e)}} variant="contained">Add a new registration officer</Button>
            
            </Form>

        }
        </>
    );
}

export default MovieForm;