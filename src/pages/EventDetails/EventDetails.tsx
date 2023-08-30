import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { Dialog } from 'primereact/dialog';
import { Chips } from 'primereact/chips';

import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, FormGroup, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { MDBIcon } from "mdb-react-ui-kit";
import axios from "axios";
import useLoginController from "../../controllers/LoginController";
import Menu from "../../components/Menu/Menu";
import styles from "./EventDetails.module.css";
import HomeComposedFooter from "../../components/homeComposedFooter/homeComposedFooter";
import { EventDetails, Modality } from "../../types";
import CreateCategoryModal from "../../components/CreateCategoryModal/CreateCategoryModal";
import CreateModalityModal from "../../components/CreateModalityModal/CreateModalityModal";
import foto from "../../assets/images/BANNER_VINICIUS.png";
import format from "date-fns/format";


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
  const [modalities, setModalities] = useState<Modality[]>([]);
  const [eventTickets, setEventTickets] = useState<any[]>([]);
  const [categoryFinal, setCategoryFinal] = useState<any>();
  const [qtModalities, setQtModalities] = useState<number>(0);
  const [localization, setLocalization] = useState("");
  const [athletics, setAthletics] = useState<any[]>([]);
  const [athletic, setAthletic] = useState<string>();
  const [visible, setVisible] = useState<boolean>(false);

  const [selectedModalities, setSelectedModalities] = useState([]);

  const { getSessionUser } = useLoginController();
  const user = getSessionUser();
  
  useEffect(() => {
    async function getAthletics() {
      try {
        const response = await axios.get(`${url}athletics/`, {
          headers: { Access: serverSideAccessToken },
        });
        setAthletics(response.data.athletics);
      } catch (error) {
        console.error(error);
      }
    }
    getAthletics();

    const fetchEventDetails = async () => {
      try {
        const event = await axios.get<EventDetails>(
          `${url}admin/event/${eventId}`,
          {
            headers: { Access: serverSideAccessToken },
          }
        );

        const eventData = event.data;

        setEventDetails(eventData);
        const modality = await axios.get(
          `${url}admin/modalitiesbyevent/${eventId}`,
          {
            headers: { Access: serverSideAccessToken },
          }
        );
        const modalities = modality.data
        setModalities(modalities)

        const locationSplit = eventData.event.location.split(" ");
        let location = "";
        locationSplit.map((string) => {
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
          window.alert("Selecione uma atletica");
        } else {
          navigate(`/sport-events/${eventId}/bookticket/${category.categoryFinal.id}`, {
            state: { category: category.categoryFinal, athletic: athletic, modalities: selectedModalities },
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
                <Card.Img src={foto || eventDetails.event.bannerEvent || ""} />
                <hr />
                <label className={styles.Label}>Descrição:</label>
                <p className={styles.Description}>
                  {" "}
                  {eventDetails.event.description}
                </p>
                <label className={styles.Label}>Local do evento:</label>
                <p className={styles.Location}>
                  {" "}
                  {eventDetails.event.location}
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
                  <p>
                    Criado em{" "}
                    {format(
                      new Date(eventDetails.event.createdAt),
                      "dd/MM/yyyy"
                    )}
                  </p>
                )}
              </Card.Body>
            </Card>
          )}
        </Col>
        <Col xl={6} md={12} sm={12}>
          {user?.role === "ADMIN" && (
            <Row className={styles.ButtonOptionsRow}>
              <Col className={styles.ColumnsButtonOption}>
                <Button
                  onClick={handleDelete}
                  variant="danger"
                  size="lg"
                  className={styles.ExcludeEventButton}
                >
                  DESATIVAR EVENTO
                </Button>
              </Col>
              <Col className={styles.ColumnsButtonOption}>
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

                  <Form.Select
                    className={styles.LocationCardBox}
                    onChange={(e) => setAthletic(e.target.value)}
                  >
                    <option disabled selected>
                      Selecione uma atlética
                    </option>
                    {athletics.map((athletic, index) => {

                      return (<option key={index + 1} value={Number(athletic.id)}>{athletic.name}</option>)

                    })}
                  </Form.Select>
                </div>
              </FormGroup>
            </Card.Body>
            {/* adcionar as modalidades na lista para selecionar */}
            <Dialog header="Modalidades" visible={visible} style={{ width: '50vw' }}
              draggable={false} onHide={() => {
                setVisible(false)
                setSelectedModalities([])
              }}>
              {/* <div className="card p-fluid">
                <Chips value={selectedModalities}  onChange={(e: MultiSelectChangeEvent) => setSelectedModalities(e.value)}/>
              </div> */}
              <div className="card flex justify-content-center mb-2">
                <MultiSelect className={styles.mylabel}  value={selectedModalities} onChange={(e: MultiSelectChangeEvent) => setSelectedModalities(e.value)}
                  options={modalities} optionLabel="name"
                  filter placeholder="Selecione as modalidades" display='chip' selectionLimit={qtModalities} showSelectAll={false} maxSelectedLabels={qtModalities} 
                  // className="w-full md:w-20rem" 
                  />
              </div>
              <Button
                size="lg"
                onClick={(event) => {
                  handleBuy({ categoryFinal })(event)
                }}
              >
                Comprar
              </Button>
            </Dialog>
            <Card.Body className={styles.LocationCardBox}>
              <div className="d-grid gap-2">
              {eventTickets
                  .slice()
                  .sort((a, b) => a.price - b.price)
                  .map((category) => {

                    return (

                      <Card key={category.id}>
                        <Card.Body>
                          <Card.Title>{category.name}</Card.Title>
                        
                          <Card.Text>Preço: R$ {category.price}</Card.Text>

                          <Card.Text>
                            Modalidades: {category.typeTicket.qt_modalities}
                          </Card.Text>
                          {/* <Card.Text>
                          Data de término: {category.finishDate}
                        </Card.Text> */}
                          <div className="d-grid gap-2">
                            {athletic ? (<Button
                              size="lg"
                              onClick={(event) => {
                                setVisible(true)
                                setCategoryFinal(category)
                                setQtModalities(category.typeTicket.qt_modalities)
                              }
                              }
                            >
                              Comprar
                            </Button>)
                              :
                              (<Button

                                disabled
                                size="lg"
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
                    )
                  })}
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
