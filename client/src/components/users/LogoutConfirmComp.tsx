import { Modal, Button } from 'react-bootstrap'

function DeleteConfirmComp({ message, show, onClose, onConfirm, }: { message:string, show: boolean; onClose: () => void; onConfirm: () => void;}) {

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Potvrďte Odhlaseni</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={onClose}>
          Zustat prihlasena
        </Button>
        <Button variant="dark" onClick={onConfirm}>
          Odhlasit
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteConfirmComp
