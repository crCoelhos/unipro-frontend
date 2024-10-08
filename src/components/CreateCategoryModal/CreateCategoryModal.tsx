import React, { useState, useEffect } from "react";
import { Modal, Form, Button, FormGroup } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CategoryController from "../../controllers/CategoryController";
import styles from "./CreateCategoryModal.module.css";

function CreateCategoryModal({ data }: any) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [name, setName] = useState("");
  // const [eventId, setEventId] = useState("");
  const [price, setPrice] = useState("");
  const [startDate, setStartDate] = useState("");
  const [finishDate, setFinishDate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [typeTickets, setTypeTickets] = useState<any[]>([]);
  const [typeTicket, setTypeTicket] = useState("");
  const url = process.env.REACT_APP_SERVER_URL;
  const serverSideAccessToken = process.env.REACT_APP_ACCESS_TOKEN;

  const [categoryCreated, setCategoryCreated] = useState(false);

  const { eventId } = useParams(); //não ta funcionando, checkar.

  const path = window.location.pathname;
  const code = path.split("/sport-events/")[1];

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const categoryData = {
      name,
      typeTicketId: Number(typeTicket),
      price: parseFloat(price),
      startDate,
      finishDate,
      eventId: Number(eventId),
      quantity: parseInt(quantity),
    };
    // const dataFromStorage = sessionStorage.getItem("user");
    // let token = "";

    // if (dataFromStorage) {
    //   const parsedData = JSON.parse(dataFromStorage);
    //   token = parsedData.token;
    // }
    // const config = {
    //   headers: {
    //     Authorization: token,
    //     Access: serverSideAccessToken,
    //   },
    // };

    // try {
    //   const response = await axios.post(url + "admin/category", categoryData, config);
    //   localStorage.setItem("ingresso", JSON.stringify(response.data))
    //   console.log(response)
    // } catch (error) {
    //   console.error(error);
    // }
    const response =  await CategoryController.createCategory(categoryData);
    setCategoryCreated(true);
    handleClose();
  };

  useEffect(() => {
    async function getTypes() {
      try {
        const response = await axios.get(`${url}admin/typetickets/`, {
          headers: { Authorization: data.token, Access: serverSideAccessToken },
        });
        setTypeTickets(response.data)

      } catch (error) {
        console.error(error);
      }
    }
    getTypes();
    if (categoryCreated) {
      // window.location.reload();
      setCategoryCreated(false);
    }
  }, [categoryCreated]);

  return (
    <div className={styles.CreateEventModal}>
      <Button
        variant="primary"
        onClick={handleShow}
        style={{ fontSize: "16px", width: "250px" }}

      >
        CRIAR INGRESSO
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title> <h1>Criar Ingresso</h1></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}
          id="form"
          className={styles.CreateEventBoxContainer}
          >
            <Form.Group controlId="formEventId">
              <h3>{data?.event?.event?.name}</h3>
            </Form.Group>
            <Form.Group controlId="formName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                // value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <FormGroup controlId="formType">
              <Form.Label>Tipo do ingresso</Form.Label>

              <Form.Select
                onChange={(e) => {
                setTypeTicket(e.target.value)
              }
                }>
                <option value=""></option>
                {typeTickets.map((type, index) => {
                  return (<option key={index + 1} value={type.id}>{type.name}</option>)
                })}
              </Form.Select>
            </FormGroup>
            <Form.Group controlId="formPrice">
              <Form.Label>Preço</Form.Label>
              <Form.Control
                type="number"
                // value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formStartDate">
              <Form.Label>Data de Início</Form.Label>
              <Form.Control
                type="date"
                // value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formFinishDate">
              <Form.Label>Data de Término</Form.Label>
              <Form.Control
                type="date"
                // value={finishDate}
                onChange={(e) => setFinishDate(e.target.value)}
              />
            </Form.Group>


            <Form.Group controlId="formQuantity">
              <Form.Label>Quantidade</Form.Label>
              <Form.Control
                type="number"
                // value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Form.Group>

            <Modal.Footer>

              <Button
                variant="primary"
                type="submit"
                // className={styles.CreateEventButton}
              >
                Enviar Ingresso
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Fechar
              </Button>
            </Modal.Footer>

          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CreateCategoryModal;
