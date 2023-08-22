import React, { FC, useEffect, useState } from 'react';
import styles from './CreateModalityModal.module.css';
import { Button, Form, FormGroup, Modal } from 'react-bootstrap';
import ModalityController from '../../controllers/ModalityController';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface CreateModalityModalProps { }
const url = process.env.REACT_APP_SERVER_URL;
const serverSideAccessToken = process.env.REACT_APP_ACCESS_TOKEN;
const CreateModalityModal = ({ data }: any) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [modalityCreated, setModalityCreated] = useState(false);
  const { eventId } = useParams();


  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();



    const ModalityData = {
      name,
      description,
      eventId: Number(eventId),
    };

    await ModalityController.createModality(ModalityData);
    setModalityCreated(true);
    handleClose();
  };

  useEffect(() => {
    // if (modalityCreated) {
    //   window.location.reload();
    //   setModalityCreated(false);
    // }
  }, [modalityCreated]);

  return (
    <div className={styles.CreateModalityModal}>
      <Button
        variant="primary"
        onClick={handleShow}
        style={{ fontSize: "16px", width: "250px" }}

      >
        CRIAR MODALIDADE
      </Button>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title> Criar Modalidade</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEventId">
              <h3>{data?.event?.event?.name}</h3>
            </Form.Group>
            <Form.Group controlId="formName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required

              />
            </Form.Group>

            <Form.Group controlId="formName">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>



            <Modal.Footer>

              <Button
                variant="primary"
                type="submit"
                className={styles.CreateEventButton}
              >
                Enviar Modalidade
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Fechar
              </Button>
            </Modal.Footer>

          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
};

export default CreateModalityModal;
