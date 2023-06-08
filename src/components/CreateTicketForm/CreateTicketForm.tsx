import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import useTicketController from "../../controllers/TicketController";
import styles from "./CreateTicketForm.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { Event } from "../../types";

//padronizar todos as interfaces num types


const url:string = "http://localhost:3003";

const CreateTicketForm = () => {
  const navigate = useNavigate();

  const { ticketData, handleChange, createTicket } = useTicketController();
  const [eventList, setEventList] = useState<Event[]>([]);
  const { eventId } = useParams();

  console.log(eventId);

  useEffect(() => {


    const fetchEvents = async () => {
      const dataFromStorage = sessionStorage.getItem("user");
      let token = "";

      if (dataFromStorage) {
        const parsedData = JSON.parse(dataFromStorage);
        token = parsedData.token;
      }
      try {
        const response = await fetch(url+"/admin/events", {
          headers: {
            authentication: token,
            Access: "123",
          },
        });
        const data = await response.json();
        setEventList(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createTicket();
    navigate(`/sport-events/${eventId}`)
  };

  return (
    <div className={styles.CreateTIcketFormContainer}>
      <h2>Criar Ticket</h2>
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
    </div>
  );
};

export default CreateTicketForm;
