import Table from 'react-bootstrap/Table';

function TableRegistryOfficers() {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Public Addresses</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Public Addresses</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>OxOfezfze4343242FEDEFEZ</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>OxOfezfze4343242FEDEFEZ</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>OxOfezfze4343242FEDEFEZ</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default TableRegistryOfficers;