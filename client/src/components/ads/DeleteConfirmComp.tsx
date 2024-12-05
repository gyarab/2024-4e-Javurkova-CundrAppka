import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'

interface DeleteConfirmModal {
    show: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

function DeleteConfirmComp({ show, onClose, onConfirm, }: { show: boolean; onClose: () => void; onConfirm: () => void;}) {

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Potvrzení smazání</Modal.Title>
      </Modal.Header>
      <Modal.Body>Opravdu chcete smazat tento inzerát?</Modal.Body>
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
