import CreateForm from './RegistryOfficeForm';
import '../../../../styles/apps/admin-app/create-modal.scss';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function CreateModal(props) {
  return (
    <Modal className='create-modal'
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add a new registry officer
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CreateForm closeModal={props.onHide} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateModal;