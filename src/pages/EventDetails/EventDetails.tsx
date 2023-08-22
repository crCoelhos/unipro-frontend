import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, FormGroup, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { MDBIcon } from "mdb-react-ui-kit";
import axios from "axios";
import useLoginController from "../../controllers/LoginController";
import Menu from "../../components/Menu/Menu";
import styles from "./EventDetails.module.css";
import HomeComposedFooter from "../../components/homeComposedFooter/homeComposedFooter";
import { EventDetails } from "../../types";
import CreateCategoryModal from "../../components/CreateCategoryModal/CreateCategoryModal";
import CreateModalityModal from "../../components/CreateModalityModal/CreateModalityModal";
import foto from "../../assets/images/BANNER_VINICIUS.png"


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
  const [localization, setLocalization] = useState("");
  const [athletics, setAthletics] = useState<any[]>([]);
  const [athletic, setAthletic] = useState<string>();

  const { getSessionUser } = useLoginController();
  const user = getSessionUser();

  useEffect(() => {
    console.log(athletic)
    async function getAthletics() {
      try {
        const response = await axios.get(`${url}athletics/`, {
          headers: { Access: serverSideAccessToken },
        });
        setAthletics(response.data.athletics)
      } catch (error) {
        console.error(error);
      }
    }
    getAthletics();

    const fetchEventDetails = async () => {
      try {
        const response = await axios.get<EventDetails>(
          `${url}admin/event/${eventId}`,
          {
            headers: { Access: serverSideAccessToken },
          }
        );

        console.log(response)
        const eventData = response.data;
        setEventDetails(eventData);

        const locationSplit = eventData.event.location.split(" ")
        let location = ""
        locationSplit.map(string => {
          if (location === "") {
            location = location + `${string}`;
          } else {
            location = location + `+${string}`;
          }
        });
        setLocalization(location);
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
      if (user) {
        if (athletic === "" || !athletic) {
          window.alert("Selecione uma atletica")
        } else {
          navigate(`/sport-events/${eventId}/bookticket/${category.id}`, {
            state: { category, athletic: athletic },
          });
        }
      } else {
        navigate("/login", {
          state: {
            url: `/sport-events/${eventId}/bookticket/${category.id}`,
            category,
            athletic: athletic,
          },
        });
      }
    };

  // function handleCreateTicket() {
  //   navigate(`/admin-area/create-tickets/${eventId}`);
  // }
  const onClick = () => {
    window.open(`https://www.google.com/maps/search/${localization}`, "_blank");
  };

  return (
    <>
      <Menu />

      <Row className={styles.EventDetailsContainer}>
        <Col xl={6} md={12} sm={12}>
          {eventDetails && (
            <Card>
              <Card.Body>
                <h1 className={styles.Title}>{eventDetails.event.name}</h1>
                <hr />
                <br />
                <Card.Img src={ foto ||eventDetails.event.bannerEvent || ""} />
                <hr />
                <label className={styles.Label}>Descrição:</label>
                <p className={styles.Description}> {eventDetails.event.description}</p>
                <label className={styles.Label}>Local do evento:</label>
                <p className={styles.Location}> {eventDetails.event.location}
                  {/* <a href={localization} target="_blank" rel="noopener noreferrer"> */}
                  <Button
                    onClick={onClick}
                    variant="outline-primary"
                    className={styles.iconMap}
                  >
                    <MDBIcon icon="location-dot" />
                    <div> Ver no mapa</div>
                  </Button>
                  {/* </a> */}
                </p>
                <hr />
                {user?.role === "ADMIN" && (
                  <p>Criado em {eventDetails.event.createdAt.split("T")[0]}</p>
                )}
              </Card.Body>
            </Card>
          )}
        </Col>
        <Col xl={6} md={12} sm={12}>
          {user?.role === "ADMIN" && (
            <Row className={styles.ButtonOptionsRow}>
              <Col  className={styles.ColumnsButtonOption}>
                <Button
                  onClick={handleDelete}
                  variant="danger"
                  size="lg"
                  className={styles.ExcludeEventButton}
                >
                  DESATIVAR EVENTO
                </Button>
              </Col>
              <Col  className={styles.ColumnsButtonOption}>
                <CreateCategoryModal
                  data={{ event: eventDetails, token: token }}
                />
              </Col>
              <Col className={styles.ColumnsButtonOption}>
                <CreateModalityModal
                  data={{ event: eventDetails, token: token }}
                />
              </Col>
              {/* </Row> */}
            </Row>
          )}
          <Card>
            <Card.Body>
              <FormGroup
                className={styles.LocationCardBox}
                controlId="formAthletic"
              >
                <div className="d-grid gap-2">
                  <h2>Selecione uma atlética</h2>

                  <Form.Select className={styles.LocationCardBox}
                    onChange={(e) => setAthletic(e.target.value)}>
                    <option disabled selected>Selecione uma atlética</option>
                    {athletics.map((athletic, index) => {
                      return (
                        <option key={index + 1} value={athletic.name}>
                          {athletic.name}
                        </option>
                      );
                    })}
                  </Form.Select>
                </div>
              </FormGroup>
            </Card.Body>
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
                          {athletic ? (
                            <Button
                              size="lg"
                              onClick={(event) => handleBuy(category)(event)}
                            >
                              Comprar
                            </Button>
                          ) : (
                            <Button
                              disabled
                              size="lg"
                              onClick={(event) => handleBuy(category)(event)}
                            >
                              Comprar
                            </Button>
                          )}
                          {/* ADICIONAR STATE BASEADO EM STATUS DO TI */}
                          {user?.role === "ADMIN" && (
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

        </Col>
      </Row>
      <HomeComposedFooter />
    </>
  );
};

export default SportEventDetails;
