import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

function TableRegistryOfficers({registryOffices}) {

  return (
    <Table responsive="sm md" className='tables tables-registry-officers' striped bordered hover>
      <thead>
        <tr>
          <th>Public Addresses</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Citizen address</th>
          <th>Actions</th>
        </tr>
      </thead>


      <tbody>
        {
          registryOffices.length > 0 ?
          registryOffices.map((registryOffice, index) => {
            return (
              <tr key={index}>
                <td>{registryOffice.publicAddress}</td>
                <td>{registryOffice.citizenship.firstname}</td>
                <td>{registryOffice.citizenship.lastname}</td>
                <td>{registryOffice.citizenship.publicAddress}</td>
                <td className='actions-col'>
                  <Button type="button" variant='success'><EditIcon /></Button>
                  <Button type="button" variant="danger"><DeleteSweepIcon /></Button>
                </td>
              </tr>
            );
      
          }) : <tr>
              <td>No communal representative yet for this city.</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
        }
      </tbody>
    </Table>
  );
}

export default TableRegistryOfficers;