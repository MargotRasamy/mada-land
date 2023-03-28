import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { getUsersContract } from "../../context/utils/ContractsRequests"; 
import LoaderSpinner from "../LoaderSpinner";
import TableLookUp from "../../components/TableLookUp";

const CitizensPage = () => {
    const { state, dispatch } = useContext(GlobalContext);
    const [isLoading, setIsLoading] = useState(true);
    const [citizensList, setCitizens] = useState([]);

    const getCitizens = async () => {
        try {
          const contract = await getUsersContract();
          const res = await contract.getCitizens();
          await setCitizens(res);
          console.log("hey ", res);
            setIsLoading(false);
        } catch (e) {
            dispatch({type: 'ADD_NOTIFICATION', payload: {
                message: e.message,
                severity: e.type,
                title: 'Citizens display fail',
            }});
            setIsLoading(false);
        }
    }

    const addCitizen = () => {
        alert("citizen added");
    }

    useEffect(() => {
        getCitizens();
        
    }, []);

    return (
      <div className="citizens-page">
        { isLoading ?
        <div><LoaderSpinner /></div> :
        <TableLookUp addAction={addCitizen} addText="Add a new citizen" searchText="Search for a citizen..."
        rawData={citizensList} />}
      </div>
    );
  }
  
  export default CitizensPage;