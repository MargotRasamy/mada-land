import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

function TableRegistryOfficers() {
  return (
    <Table responsive="sm md" className='table-registry-officers' striped bordered hover>
      <thead>
        <tr>
          <th>Public Addresses</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>OxOfezfze4343242FEDEFEZ</td>
          <td>Tiavina</td>
          <td>Ratovo</td>
          <td className='actions-col'>
            <Button type="button" variant='success'><EditIcon /></Button>
            <Button type="button" variant="danger"><DeleteSweepIcon /></Button>
          </td>
        </tr>
        <tr>
          <td>OxOfezfze4343242FEDEFEZ</td>
          <td>Aina</td>
          <td>Fenitra</td>
          <td className='actions-col'>
            <Button type="button" variant='success'><EditIcon /></Button>
            <Button type="button" variant="danger"><DeleteSweepIcon /></Button>
          </td>
        </tr>
        <tr>
          <td>OxOfezfze4343242FEDEFEZ</td>
          <td>Nirina</td>
          <td>Ravoahangy</td>
          <td className='actions-col'>
            <Button type="button" variant='success'><EditIcon /></Button>
            <Button type="button" variant="danger"><DeleteSweepIcon /></Button>
          </td>
        </tr>
      </tbody>
    </Table>
  );
}

export default TableRegistryOfficers;