import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import styles from "./CreateAthleticModal.module.css";
import AthleticController from "../../controllers/AthleticController";
import { Athletic } from "../../types";

function CreateAthleticModal({ event }: any) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [name, setName] = useState("");
  const [college_course, setCollegeCourse] = useState("");
  const [direction, setDirection] = useState("");
  const [img_url, setImgUrl] = useState("");
  const [athleticCreated, setAthleticCreated] = useState(false);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const athleticData = {
      name,
      college_course: {
        course: college_course,
      },
      direction,
      img_url,
    };

    await AthleticController.createAthletic(athleticData);
    setAthleticCreated(true);
    handleClose();
  };

  useEffect(() => {
    if (athleticCreated) {
      window.location.reload();
      setAthleticCreated(false);
    }
  }, [athleticCreated]);

  return (
    <div className={styles.CreateEventModal}>
      <Button
        variant="primary"
        onClick={handleShow}
        style={{ fontSize: "18px", width: "205px" }}
      >
        CRIAR ATLÉTICA
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>CRIAR ATLÉTICA</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formCollegeCourse">
              <Form.Label>Curso</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setCollegeCourse(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formStartDirection">
              <Form.Label>Presidente</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setDirection(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formImgUrl">
              <Form.Label>URL do Logo da Atlética</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setImgUrl(e.target.value)}
              />
            </Form.Group>

            <Modal.Footer>
              <Button
                variant="primary"
                type="submit"
                className={styles.CreateEventButton}
              >
                Enviar Atlética
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

export default CreateAthleticModal;
