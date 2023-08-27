import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import EventController from "../../controllers/EventController";
import styles from "./CreateEventModal.module.css";

function CreateEventModal() {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [name, setName] = useState("");
  const [status, setStatus] = useState(1);
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [policy, setPolicy] = useState("");
  const [description, setDescription] = useState("");
  const [bannerEvent, setBannerEvent] = useState("");
  const navigate = useNavigate();

  const [eventCreated, setEventCreated] = useState(false);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const eventData = {
      name,
      status,
      date,
      location,
      policy,
      description,
      bannerEvent,
    };

    await EventController.createEvent(eventData);
    setEventCreated(true);
    handleClose();
  };

  useEffect(() => {
    if (eventCreated) {
      window.location.reload();
      setEventCreated(false);
    }
  }, [eventCreated]);

  return (
    <div className={styles.CreateEventModal}>
      <Button
        variant="primary"
        onClick={handleShow}
        style={{ marginLeft: "50vw", fontSize: "18px" }}
      >
        CRIAR EVENTO
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>CRIAR EVENTO</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={handleSubmit}
            id="form"
            className={styles.CreateEventBoxContainer}
          >
            <Form.Group controlId="eventName">
              <Form.Label>Nome do Evento</Form.Label>
              <Form.Control
                type="text"
                // value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="eventState">
              <Form.Label>Evento ativo?</Form.Label>
              <Form.Check
                type="switch"
                id="stateSwitch"
                label={status === 1 ? "Ativo" : "Inativo"}
                checked={status === 1}
                onChange={() => setStatus(status === 1 ? 0 : 1)}
                required
              />
            </Form.Group>

            <Form.Group controlId="eventDate">
              <Form.Label>Data do Evento</Form.Label>
              <Form.Control
                type="date"
                // value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="eventLocation">
              <Form.Label>Localização do Evento</Form.Label>
              <Form.Control
                type="text"
                // value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="eventPolicy">
              <Form.Label>Termos de compra</Form.Label>
              <Form.Control
                type="text"
                // value={policy}
                onChange={(e) => setPolicy(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="eventDescription">
              <Form.Label>Descrição do Evento</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                // value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="eventBannerImage">
              <Form.Label>Banner do evento</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                // value={bannerEvent}
                onChange={(e) => setBannerEvent(e.target.value)}
                required
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
      </Modal>
    </div >
  );
}

export default CreateEventModal;
