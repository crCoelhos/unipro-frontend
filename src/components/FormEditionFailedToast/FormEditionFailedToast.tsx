import React, { FC, useState } from "react";
import styles from "./FormEditionFailedToast.module.css";
import { Button, Col, Row, Toast } from "react-bootstrap";
import CurrentTime from "../CurrentTime/CurrentTime";

interface FormEditionFailedToastProps {}





function FormEditionFailedToast() {
  const [show, setShow] = useState(false);

  return (
    <Row>
      <Col xs={6}>
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide bg="danger">
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Erro na atualização dos dados</strong>
            <small><CurrentTime/></small>
          </Toast.Header>
          <Toast.Body className="danger" style={{color:"#fff"}}>A sua solicitaçao não foi enviada. Corrija os campos e tente novamente.</Toast.Body>
        </Toast>
      </Col>
    </Row>
  );
}

export default FormEditionFailedToast;
