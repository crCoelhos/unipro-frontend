import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import CategoryController from "../../controllers/CategoryController";
import styles from "./CreateCategoryModal.module.css";

function CreateCategoryModal() {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [name, setName] = useState("");
  const [eventId, setEventId] = useState("");
  const [price, setPrice] = useState("");
  const [startDate, setStartDate] = useState("");
  const [finishDate, setFinishDate] = useState("");
  const [quantity, setQuantity] = useState("");
  const navigate = useNavigate();

  const [categoryCreated, setCategoryCreated] = useState(false);

  // const { event_id } = useParams(); //não ta funcionando, checkar.
  // console.log("sergio ",event_id)

  const path = window.location.pathname;
  const code = path.split("/sport-events/")[1];
  console.log(code)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const categoryData = {
      name,
      price: parseFloat(price),
      startDate,
      finishDate,
      eventId: parseInt(code),
      quantity: parseInt(quantity),
    };

    await CategoryController.createCategory(categoryData);
    setCategoryCreated(true);
    handleClose();
  };

  useEffect(() => {
    if (categoryCreated) {
      window.location.reload();
      setCategoryCreated(false);
    }
  }, [categoryCreated]);

  return (
    <div className={styles.CreateEventModal}>
      <Button
        variant="primary"
        onClick={handleShow}
        style={{ fontSize: "18px", width:"205px"}}
      >
        CRIAR INGRESSO
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title> CRIAR INGRESSO</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formPrice">
                <Form.Label>Preço</Form.Label>
                <Form.Control
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formStartDate">
                <Form.Label>Data de Início</Form.Label>
                <Form.Control
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formFinishDate">
                <Form.Label>Data de Término</Form.Label>
                <Form.Control
                  type="date"
                  value={finishDate}
                  onChange={(e) => setFinishDate(e.target.value)}
                />
              </Form.Group>

              {/* <Form.Group controlId="formEventId">
                <Form.Label>Evento</Form.Label>
                <Form.Control
                  type="number"
                  value={code}
                  disabled
                />
              </Form.Group> */}

              <Form.Group controlId="formQuantity">
                <Form.Label>Quantidade</Form.Label>
                <Form.Control
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </Form.Group>

              <Modal.Footer>
                <Button
                  variant="primary"
                  type="submit"
                  className={styles.CreateEventButton}
                >
                  Enviar Evento
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                  Fechar
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CreateCategoryModal;
