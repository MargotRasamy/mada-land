import CreateForm from './RegistryOfficeForm';
import '../../../../styles/apps/admin-app/create-modal.scss';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';

function CreateModal({onHide, show, cityId}) {

  return (
    <Modal className='create-modal'
      onHide={onHide}
      show={show}
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
        <CreateForm cityId={cityId} closeModal={onHide} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateModal;