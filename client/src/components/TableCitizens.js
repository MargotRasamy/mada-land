import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

function TableCitizens({data}) {

  return (
    <Table responsive="sm md" className='tables tables-citizens' striped bordered hover>
      <thead>
        <tr>
          <th>Citizen public Address</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Actions</th>
        </tr>
      </thead>


      <tbody>
        {
          data.length > 0 ?
          data.map((citizen, index) => {
            return (
              <tr key={index}>
                <td>{citizen.publicAddress}</td>
                <td>{citizen.firstname}</td>
                <td>{citizen.lastname}</td>
                <td className='actions-col'>
                  <Button type="button" variant='success'><EditIcon /></Button>
                  <Button type="button" variant="danger"><DeleteSweepIcon /></Button>
                </td>
              </tr>
            );
      
          }) : <tr>
              <td>No citizen yet for this city.</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
        }
      </tbody>
    </Table>
  );
}

export default TableCitizens;