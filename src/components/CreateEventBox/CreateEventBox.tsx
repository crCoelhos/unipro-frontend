import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import EventController from "../../controllers/EventController";
import styles from "./CreateEventBox.module.css"

interface CreateEventBoxProps {
  onSubmit: (eventData: any) => void;
}

const CreateEventBox: React.FC<CreateEventBoxProps> = ({ onSubmit }) => {
  const [eventData, setEventData] = useState({
    name: "",
    state: 0,
    date: "",
    location: "",
    description: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    EventController.createEvent(eventData)
      .then(() => {
        onSubmit(eventData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSwitchChange = () => {
    setEventData((prevData) => ({
      ...prevData,
      state: prevData.state === 0 ? 1 : 0
    }));
  };

  return (
    <Form onSubmit={handleSubmit} className={styles.CreateEventBoxContainer}>
      <Form.Group controlId="eventName">
        <Form.Label>Nome do evento</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={eventData.name}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="eventDate">
        <Form.Label>Data de início do evento</Form.Label>
        <Form.Control
          type="date"
          name="date"
          value={eventData.date}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="eventLocation">
        <Form.Label>Local do evento</Form.Label>
        <Form.Control
          type="text"
          name="location"
          value={eventData.location}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="eventDescription">
        <Form.Label>Descrição do evento</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          value={eventData.description}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="eventState">
        <Form.Label>Evento ativo?</Form.Label>
        <Form.Check
          type="switch"
          id="eventStateSwitch"
          label={eventData.state === 1 ? "Ativo" : "Inativo"}
          checked={eventData.state === 1}
          onChange={handleSwitchChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Criar evento
      </Button>
    </Form>
  );
};

export default CreateEventBox;
