import Button from '@mui/material/Button';
import TableCitizens from './TableCitizens';
import Search from './admin-app/Search';
import { useEffect, useState } from 'react';
import LoaderSpinner from "./LoaderSpinner";

function TableLookUp({addAction, addText, searchText, rawData}) {
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const searchAction = (e) => {
    let allData = rawData.filter((dataRow) => {
      // const allValues = Object.values(dataRow);
      // const lowerCasedValues = allValues.map((value) => {
      //   return value.toLowerCase();
      // })
      // console.log(lowerCasedValues);
      // return lowerCasedValues.includes(e.target.value.toLowerCase());
      let regAddress = dataRow.publicAddress.toLowerCase();
      let citAddress = dataRow.publicAddress.toLowerCase();
      let firstname = dataRow.firstname.toLowerCase();
      let lastname = dataRow.lastname.toLowerCase();

      return firstname.includes(e.target.value.toLowerCase()) || lastname.includes(e.target.value.toLowerCase()) || regAddress.includes(e.target.value.toLowerCase()) || citAddress.includes(e.target.value.toLowerCase()) ;
    });
    setFilteredData(allData);
  }

  useEffect(() => {
    console.log("yes ", rawData);    
    (async () => {
        await setFilteredData(rawData);
    })();
    setIsLoading(false);
  }, []);

  return (
    <div className="table-look-up">
      { isLoading ?
        <LoaderSpinner />
        :
        <>
          <Button color="buttonMain" onClick={()=> {addAction()}} variant="contained">{addText}</Button>
          <Search placeholder={searchText} handleChange={(e) => {searchAction(e)}} />
          <TableCitizens data={filteredData} />
        </>
      }
    </div>
  );
}

export default TableLookUp;