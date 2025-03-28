import { Modal, Button } from 'react-bootstrap'

function DeleteConfirmComp({ message, show, onClose, onConfirm }: { message: string; show: boolean; onClose: () => void; onConfirm: () => void }) {

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Potvrď smazání</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Zrušit
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Smazat
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteConfirmComp
