import React from "react";
import { Modal, Button } from "react-bootstrap";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <h4>No grocery store!</h4>
        <p>
          You don't have to leave the comfort of your own home to create
          something delicious! While there are some people out there who love
          the grocery store, sometimes you just want to stay in.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function Convenient() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button
        className="footer-button"
        variant="outline-light"
        size="llg"
        onClick={() => setModalShow(true)}
      >
        Convenient
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default Convenient;
