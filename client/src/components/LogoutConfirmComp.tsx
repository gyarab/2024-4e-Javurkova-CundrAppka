import { Modal, Button } from 'react-bootstrap'

function DeleteConfirmComp({ message, show, onClose, onConfirm, }: { message:string, show: boolean; onClose: () => void; onConfirm: () => void;}) {

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Potvrď odhlášení</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer className="d-flex justify-content-end gap-2">
        <Button variant="light" onClick={onClose}>
          Zůstat přihlášený
        </Button>
        <Button variant="dark" onClick={onConfirm}>
          Odhlásit
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteConfirmComp
