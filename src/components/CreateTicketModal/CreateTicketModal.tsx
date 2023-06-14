import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import useTicketController from "../../controllers/TicketController";
import EventController from "../../controllers/EventController";
import { Event } from "../../types";
import styles from "./CreateTicketModal.module.css";

const url: string = "http://localhost:3003";

const CreateTicketModal = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [eventCreated, setEventCreated] = useState(false);

  const { ticketData, handleChange, createTicket } = useTicketController();
  const [eventList, setEventList] = useState<Event[]>([]);
  const { eventId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      const dataFromStorage = sessionStorage.getItem("user");
      let token = "";

      if (dataFromStorage) {
        const parsedData = JSON.parse(dataFromStorage);
        token = parsedData.token;
      }
      try {
        const response = await fetch(url + "/admin/events", {
          headers: {
            authentication: token,
            Access: "123",
          },
        });
        const data = await response.json();
        setEventList(data);
        console.log("jorge ",data)
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();

    if (eventCreated) {
      window.location.reload();
      setEventCreated(false);
    }
  }, [eventCreated]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createTicket();
    navigate(`/sport-events/${eventId}`);
  };

  return (
    <div className={styles.CreateEventModal}>
      <Button
        variant="primary"
        onClick={handleShow}
        style={{ fontSize: "18px", width:"256px"}}
      >
        CRIAR EVENTO
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>CRIAR INGRESSO</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Nome:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={ticketData.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formPrice">
              <Form.Label>Preço:</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={ticketData.price}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formQuantity">
              <Form.Label>Quantidade de ingressos:</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={ticketData.quantity}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formStartDate">
              <Form.Label>Data de Início:</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={ticketData.startDate}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formFinishDate">
              <Form.Label>Data de Término:</Form.Label>
              <Form.Control
                type="date"
                name="finishDate"
                value={ticketData.finishDate}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formEventId">
              <Form.Label>Evento vinculado:</Form.Label>
              <Form.Control
                as="select"
                name="eventId"
                value={eventId}
                onChange={handleChange}
                
              >
                {eventList.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.name} ({event.id}) - ({event.date})
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
              Criar Ticket
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateTicketModal;
