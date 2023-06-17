import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import EventController from "../../controllers/EventController";
import styles from "./CreateEventBox.module.css";
import { useNavigate } from "react-router-dom";

function CreateEventBox() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState(1);
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [policy, setPolicy] = useState("");
  const [description, setDescription] = useState("");
  const [bannerEvent, setBannerEvent] = useState("");
  const navigate = useNavigate(); // Obter a função de navegação

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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

    await EventController.createEvent(eventData); // Chamar o método createEvent sem o parâmetro navigate
    navigate("/admin-area/events"); // Navegar para o endpoint após a requisição bem-sucedida
  };
  return (
    <Form onSubmit={handleSubmit} className={styles.CreateEventBoxContainer}>
      <Form.Group controlId="eventName">
        <Form.Label>Nome do Evento</Form.Label>
        <Form.Control
          type="text"
          value={name}
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
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="eventLocation">
        <Form.Label>Localização do Evento</Form.Label>
        <Form.Control
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="eventPolicy">
        <Form.Label>Termos de compra</Form.Label>
        <Form.Control
          type="text"
          value={policy}
          onChange={(e) => setPolicy(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="eventDescription">
        <Form.Label>Descrição do Evento</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="eventBannerImage">
        <Form.Label>Banner do evento</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={bannerEvent}
          onChange={(e) => setBannerEvent(e.target.value)}
          required
        />
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        className={styles.CreateEventButton}
      >
        Criar Evento
      </Button>
    </Form>
  );
}

export default CreateEventBox;
