import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import useLoginController from "../../controllers/LoginController";
import Menu from "../../components/Menu/Menu";
import styles from "./EventDetails.module.css";
import HomeComposedFooter from "../../components/homeComposedFooter/homeComposedFooter";
import { EventDetails } from "../../types";

const url = "http://localhost:3003/";
const dataFromStorage = sessionStorage.getItem("user");
let token = "";
if (dataFromStorage) {
  const parsedData = JSON.parse(dataFromStorage);
  token = parsedData.token;
}

const SportEventDetails = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState<EventDetails | null>(null);
  const [eventTickets, setEventTickets] = useState<any[]>([]);

  const { getSessionUser } = useLoginController();
  const user = getSessionUser();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get<EventDetails>(
          `${url}admin/event/${eventId}`,
          {
            headers: { Authorization: token, Access: "123" },
          }
        );
        const eventData = response.data;
        setEventDetails(eventData);
        const categoryList = eventData.event.category;
        setEventTickets(categoryList);
        console.log("categories: ", categoryList);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEventDetails();
  }, [eventId, token]);

  const handleDelete = async () => {
    let confirmation = window.confirm("Deletar evento?");

    if (confirmation === true) {
      try {
        await axios.delete(`${url}admin/event/${eventId}`, {
          headers: { Authorization: token, Access: "123" },
        });
        navigate("/admin-area/events");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleBuy = (ticketId: string) => (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    navigate(`/sport-events/${eventId}/bookticket/${ticketId}`);
  };

  function handleCreateTicket() {
    navigate(`/admin-area/create-tickets/${eventId}`);
  }

  return (
    <>
      <Menu />
      <Row className={styles.EventDetailsContainer}>
        <Col xl={6} md={12} sm={12}>
          {eventDetails && (
            <Card>
              <Card.Body>
                <h2>Lote: {eventDetails.event.name}</h2>
                <h1>Título: {eventDetails.event.name}</h1>
                <hr />
                <br />
                <Card.Img src={eventDetails.event.bannerEvent || ""} />
                <hr />
                <p>Descrição: {eventDetails.event.description}</p>
                <p>Local do evento: {eventDetails.event.location}</p>
                <hr />
                <p>Criado em {eventDetails.event.createdAt}</p>
              </Card.Body>
            </Card>
          )}
        </Col>
        <Col xl={6} md={12} sm={12}>
          <Card>
            <Card.Body className={styles.LocationCardBox}>
              <div className="d-grid gap-2">
                {eventTickets &&
                  eventTickets.map((ticket) => (
                    <Card key={ticket.id}>
                      <Card.Body>
                        <Card.Title>{ticket.name}</Card.Title>
                        <Card.Text> teste: {ticket.id}</Card.Text>
                        <Card.Text>Preço: R$ {ticket.price}</Card.Text>
                        <Card.Text>Data de início: {ticket.startDate}</Card.Text>
                        <Card.Text>Data de término: {ticket.finishDate}</Card.Text>
                        <div className="d-grid gap-2">
                          <Button
                            size="lg"
                            onClick={(event) => handleBuy(ticket.id)(event)}
                          >
                            Comprar
                          </Button>
                          {/* ADICIONAR STATE BASEADO EM STATUS DO TI */}
                          <Button variant="warning" size="lg">
                            Desativar
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  ))}
              </div>
            </Card.Body>
          </Card>
          <Row className={styles.ButtonOptionsRow}>
            <Col xl={5} md={12} sm={12}></Col>
            <Col></Col>
            <Col xl={5} md={12} sm={12}>
              {user.role === "ADMIN" && (
                <div className="d-grid gap-2">
                  <Button
                    onClick={handleDelete}
                    variant="danger"
                    size="lg"
                    className={styles.ExcludeEventButton}
                  >
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
