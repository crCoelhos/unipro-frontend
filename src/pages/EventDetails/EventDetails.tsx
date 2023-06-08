import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import useLoginController from "../../controllers/LoginController";
import Menu from "../../components/Menu/Menu";
import styles from "./EventDetails.module.css";
import HomeComposedFooter from "../../components/homeComposedFooter/homeComposedFooter";

const mockEventData = {
  batch: {
    id: 1,
    name: "Batch 1",
    startDate: "2023-06-10",
    finishDate: "2023-06-12",
    createdAt: "2023-05-30T09:00:00Z",
    updatedAt: "2023-05-31T15:30:00Z",
    event: {
      id: 1,
      name: "Event 1",
      state: true,
      date: "2023-06-10",
      location: "Example Venue",
      policy:"Policy Placeholder",
      description: "This is a sample event",
      bannerEvent:"https://www.bellingcat.com/app/uploads/2019/11/1-1.jpg",
      createdAt: "2023-05-29T14:20:00Z",
      updatedAt: "2023-05-30T11:45:00Z",
    },
  },
  ticketsTotal: 100,
  ticketsOpen: 75,
};

const url = "http://localhost:3003/";

const SportEventDetails = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const { getSessionUser } = useLoginController();
  const user = getSessionUser();



  const handleDelete = async () => {
    const dataFromStorage = sessionStorage.getItem("user");
    let token = "";

    let confirmation = window.confirm("Deletar evento?");

    if (confirmation === true) {
      try {
        if (dataFromStorage) {
          const parsedData = JSON.parse(dataFromStorage);
          token = parsedData.token;
          console.log("token? ", token);
        }

        await axios.delete(`${url}admin/event/${eventId}`, {
          headers: { Authorization: token, Access : 123 },
        });
        console.log("Evento deletado");
        navigate("/admin-area/events");
      } catch (error) {
        console.error(error);
        console.log("resta: ", `${url}admin/event:${eventId}`);
      }
    }
  };

  const handleBuy = () => {
    navigate(`/sport-events/${eventId}/payment/${eventId}`);
  };

  function handleCreateTicket() {
    navigate(`/admin-area/create-tickets/${eventId}`)
  }

  return (
    <>
      <Menu />
      <Row className={styles.EventDetailsContainer}>
        <Col xl={6} md={12} sm={12}>
          {mockEventData && (
            <Card>
              <Card.Body>
                <h2>Lote: {mockEventData.batch.name}</h2>
                <h1>Título: {mockEventData.batch.event.name}</h1>
                <hr />
                <br />
                <Card.Img src="https://media.geeksforgeeks.org/wp-content/uploads/20220106105832/gfg200X2001.png" />
                <hr />
                <p>Descrição: {mockEventData.batch.event.description}</p>
                <p>Local do evento: {mockEventData.batch.event.location}</p>
                <hr />
                <p>Criado em {mockEventData.batch.event.createdAt}</p>
              </Card.Body>
            </Card>
          )}
        </Col>
        <Col xl={6} md={12} sm={12}>
          <Card>
            <Card.Body className={styles.LocationCardBox}>
              <div className="d-grid gap-2">
                <div className={styles.LocationBox}>placeholder</div>
              </div>
            </Card.Body>
          </Card>
          <Row className={styles.ButtonOptionsRow}>
            <Col xl={5} md={12} sm={12}>
              <div className="d-grid gap-2">
                <Button size="lg" onClick={handleBuy}>
                  Comprar
                </Button>
              </div>
            </Col>
            <Col></Col>
            <Col xl={5} md={12} sm={12}>
              {user.role === "ADMIN" && (
                <div className="d-grid gap-2">
                  <Button onClick={handleDelete} variant="danger" size="lg" className={styles.ExcludeEventButton}>
                    Deletar
                  </Button>

                  <Button onClick={handleCreateTicket} variant="info" size="lg">
                    Criar ingresso
                  </Button>
                </div>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
      <HomeComposedFooter />
    </>
  );
};

export default SportEventDetails;
