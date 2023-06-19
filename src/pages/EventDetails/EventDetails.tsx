import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import useLoginController from "../../controllers/LoginController";
import Menu from "../../components/Menu/Menu";
import styles from "./EventDetails.module.css";
import HomeComposedFooter from "../../components/homeComposedFooter/homeComposedFooter";
import { EventDetails } from "../../types";
import CreateCategoryModal from "../../components/CreateCategoryModal/CreateCategoryModal";



const url = process.env.REACT_APP_SERVER_URL;

const serverSideAccessToken = process.env.REACT_APP_ACCESS_TOKEN;

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
            headers: { Authorization: token, Access: serverSideAccessToken },
          }
        );
        const eventData = response.data;
        setEventDetails(eventData);
        const categoryList = eventData.event.category;
        setEventTickets(categoryList);
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
          headers: { Authorization: token, Access: serverSideAccessToken },
        });
        navigate("/admin-area/events");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleBuy =
    (category: any) => (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      navigate(`/sport-events/${eventId}/bookticket/${category.id}`, {
        state: { category },
      });
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
                  eventTickets.map((category) => (
                    <Card key={category.id}>
                      <Card.Body>
                        <Card.Title>{category.name}</Card.Title>
                        <Card.Text>
                          {" "}
                          teste: {category.typeTicket.name}
                        </Card.Text>
                        <Card.Text>Preço: R$ {category.price}</Card.Text>
                        <Card.Text>
                          Data de início: {category.startDate}
                        </Card.Text>
                        <Card.Text>
                          Data de término: {category.finishDate}
                        </Card.Text>
                        <div className="d-grid gap-2">
                          <Button
                            size="lg"
                            onClick={(event) => handleBuy(category)(event)}
                          >
                            Comprar
                          </Button>
                          {/* ADICIONAR STATE BASEADO EM STATUS DO TI */}
                          {user.role === "ADMIN" && (
                            <Button variant="warning" size="lg">
                              Desativar
                            </Button>
                          )}
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
                <Row>
                  <Col>
                    <Button
                      onClick={handleDelete}
                      variant="danger"
                      size="lg"
                      className={styles.ExcludeEventButton}
                    >
                      DESATIVAR EVENTO
                    </Button>
                  </Col>
                  <Col>
                    <CreateCategoryModal
                      event={{ event: eventDetails, token: token }}
                    />
                  </Col>
                </Row>
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
