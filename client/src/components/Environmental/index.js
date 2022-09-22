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
        <h4>Decrease Greenhouse Gases and Production Energy</h4>
        <p>
          In the US, over one third of our food winds up in the landfill.
          According to the EPA, That's nearly 30 million tons per year. That's a
          lot of food!!! An enormous amount of resources go to waste, including
          the energy to grow, process, transport, and discard all that wasted
          food. That’s not to mention the amount of methane food lets off when
          it winds up in landfills.
        </p>
        <p>
          Food waste is getting to be such a problem that states and cities are
          starting to restrict the amount of food waste going into the landfill.
          Get ahead of the game (and the compost) and create a delicious
          culinary creation from your random ingredients!
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function Environmental() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button
        className="footer-button"
        variant="outline-light"
        size="llg"
        onClick={() => setModalShow(true)}
      >
        Environmental
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default Environmental;
