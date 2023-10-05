import React from "react";
import { Modal, Button } from "react-bootstrap";

function CustomModal({ show, onHide, onConfirm }) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Removal</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to remove this item?</Modal.Body>
      <Modal.Footer>
        <Button variant="warning" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="dark" onClick={onConfirm}>
          Remove
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CustomModal;
