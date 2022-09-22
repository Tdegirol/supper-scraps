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
        <h4>Use the food you're already purchased!</h4>
        <p>
          Not only does this help your wallet, but it also helps out society.  According to the USDA, in
          2010, $161 billion dollars of food wound up in the landfill - that was 10 years ago and pre-pandemic, which caused a surge in food spending and food waste. This
          isn’t even counting the cost of water, labor, energy, and other inputs
          used in producing, processing, transporting, preparing, storing, and
          disposing of discarded food. 
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function Economic() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button
        className="footer-button"
        variant="outline-light"
        size="llg"
        onClick={() => setModalShow(true)}
      >
        Economic
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default Economic;
