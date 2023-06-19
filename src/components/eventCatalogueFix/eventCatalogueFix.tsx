import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button } from "react-bootstrap";
import styles from "./eventCatalogueFix.module.scss";
import axios from "axios";
import { Event } from "../../types";

const url = process.env.REACT_APP_SERVER_URL;
const serverSideAccessToken = process.env.REACT_APP_ACCESS_TOKEN;

const EventCatalogueFix = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState<boolean>(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [colorClasses, setColorClasses] = useState<string[]>([]);
  const colors = ["#04BF7B", "#4630D9", "#0000FF", "#F26241", "#A4A0FF"];

  useEffect(() => {
    const dataFromStorage = sessionStorage.getItem("user");
    let token = "";
    if (dataFromStorage) {
      const parsedData = JSON.parse(dataFromStorage);
      token = parsedData.token;
    } else {
      setShow(true); // Mostra o alerta para usuário não autenticado
    }

    const config = {
      headers: {
        Authorization: token,
        Access: serverSideAccessToken,
      },
    };
    const fetchEvents = async () => {
      try {
        const response = await axios.get(url + "admin/events", config);
        const eventData: Event[] = response.data;
        setEvents(eventData);

        const newColorClasses = eventData.map(() => {
          const randomIndex = Math.floor(Math.random() * colors.length);
          return `cardColoring-${randomIndex}`;
        });
        setColorClasses(newColorClasses);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) => event.status);

  const handleCardClick = (event: Event) => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 5000);
  };

  return (
    <div className={styles.eventCatalogueFix}>
      <Alert show={show} variant="warning">
        <Alert.Heading>Sem autorização</Alert.Heading>
        <p>
          Você não está autorizado a acessar a página de detalhes de evento. Por
          favor, faça login.
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-warning">
            Fechar
          </Button>
        </div>
      </Alert>
      <div className="row">
        {filteredEvents.map((event, index) => {
          const colorClass = colorClasses[index];
          const randomIndex = Math.floor(Math.random() * colors.length);
          return (
            <div
              className="col-lg-3 col-md-5"
              id="eventCard"
              style={{ margin: "12px" }}
              key={event.id}
              onClick={() => handleCardClick(event)}
            >
              {sessionStorage.getItem("user") ? (
                <Link to={`/sport-events/${event.id}`}>
                  <div
                    className={`card cardColoring ${colorClass}`}
                    style={{
                      backgroundColor: colors[randomIndex],
                      height: "300px",
                    }}
                  >
                    <div
                      className="bg-image hover-overlay ripple"
                      data-mdb-ripple-color="light"
                    >
                      <a href="#!">
                        <div className="mask"></div>
                      </a>
                    </div>
                    <div
                      className="card-body"
                      style={{ color: "white", marginTop: "12px" }}
                    >
                      <h5 className="card-title">{event.name}</h5>
                      <hr style={{ height: "8px", backgroundColor: "white" }} />
                      <p className="card-text">{event.description}</p>
                    </div>
                  </div>
                </Link>
              ) : (
                <div
                  className={`card cardColoring ${colorClass}`}
                  style={{
                    backgroundColor: colors[randomIndex],
                    height: "300px",
                  }}
                >
                  <div
                    className="bg-image hover-overlay ripple"
                    data-mdb-ripple-color="light"
                  >
                    <a href="#!">
                      <div className="mask"></div>
                    </a>
                  </div>
                  <div
                    className="card-body"
                    style={{ color: "white", marginTop: "12px" }}
                  >
                    <h5 className="card-title">{event.name}</h5>
                    <hr style={{ height: "8px", backgroundColor: "white" }} />
                    <p className="card-text">{event.description}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventCatalogueFix;
