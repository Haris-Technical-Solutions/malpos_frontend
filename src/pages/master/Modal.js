import React from "react";
import { Modal, Button } from "react-bootstrap";

function CustomModal({ show, onHide, onConfirm }) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header  closeButton>
        <Modal.Title >Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body  style={{borderBottom:"2px solid silver", fontSize:"1rem",marginTop:"1px"}}>Are you sure you want to remove this item?</Modal.Body>
      <Modal.Footer >
        <Button style={{padding:"10px", fontSize:"10px",border:"none",backgroundColor:"#f29b30"}}  onClick={onHide}>
          Cancel
        </Button>
        <Button style={{backgroundColor:"black",border:"none", padding:"10px", fontSize:"10px"}} onClick={onConfirm}>
          Remove
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CustomModal;
