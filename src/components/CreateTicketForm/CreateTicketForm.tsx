import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import useTicketController from "../../controllers/CategoryController";
import styles from "./CreateTicketForm.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { Event } from "../../types";
import CategoryController from "../../controllers/CategoryController";


//padronizar todos as interfaces num types


const url: string = "http://localhost:3003";

const CreateTicketForm = () => {
  const navigate = useNavigate();
  const [eventList, setEventList] = useState<Event[]>([]);
  const { eventId } = useParams();
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [startDate, setStartDate] = useState("")
  const [finishDate, setFinishDate] = useState("")
  const [quantity, setQuantity] = useState("")

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
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const categoryData = {
      name,
      price: Number(price),
      startDate,
      finishDate,
      eventId: Number(eventId),
      quantity: Number(quantity),
    };

    await CategoryController.createCategory(categoryData);
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
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPrice">
          <Form.Label>Preço:</Form.Label>
          <Form.Control
            type="number"
            name="price"
            onChange={(e) => setPrice(e.target.value)}

          />
        </Form.Group>

        <Form.Group controlId="formQuantity">
          <Form.Label>Quantidade de ingressos:</Form.Label>
          <Form.Control
            type="number"
            name="quantity"
            onChange={(e) => setQuantity(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formStartDate">
          <Form.Label>Data de Início:</Form.Label>
          <Form.Control
            type="date"
            name="startDate"
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formFinishDate">
          <Form.Label>Data de Término:</Form.Label>
          <Form.Control
            type="date"
            name="finishDate"
            onChange={(e) => setFinishDate(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formEventId">
          <Form.Label>Evento vinculado: </Form.Label>

        </Form.Group>

        <Button variant="primary" type="submit">
          Criar Ticket
        </Button>
      </Form>
    </div>
  );
};

export default CreateTicketForm;
