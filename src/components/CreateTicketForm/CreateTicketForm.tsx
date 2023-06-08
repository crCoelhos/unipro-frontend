import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import useTicketController from '../../controllers/TicketController';
import styles from './CreateTicketForm.module.css'

interface Event {
  id: number;
  name: string;
  state: boolean;
  date: string;
  location: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

const CreateTicketForm = () => {
  const { ticketData, handleChange, createTicket } = useTicketController();
  const [eventList, setEventList] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const dataFromStorage = sessionStorage.getItem('user');
      let token = '';

      if (dataFromStorage) {
        const parsedData = JSON.parse(dataFromStorage);
        token = parsedData.token;
      }
      try {
        const response = await fetch('http://localhost:3003/admin/events', {
          headers: {
            authentication: token,
            Access: '123',
          },
        });
        const data = await response.json();
        setEventList(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createTicket();
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
          <Form.Label>Vincular ao evento:</Form.Label>
          <Form.Control
            as="select"
            name="eventId"
            value={ticketData.eventId}
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
