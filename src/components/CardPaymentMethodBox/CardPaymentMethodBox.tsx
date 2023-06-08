import React from "react";
import PropTypes from "prop-types";
import styles from "./CreditCardPaymentMethodBox.module.css";
import { Container, Col, Row, Form, Button } from "react-bootstrap";


const CreditCardPaymentMethodBox = () => (
  <div className={styles.CreditCardPaymentMethodBox}>
    <Container>
      <Col>
        <Form className={styles.CreateEventBoxContainer}>
          <Form.Group controlId="eventName">
            <Form.Label>Nome do Evento</Form.Label>
            <Form.Control type="text" required />
          </Form.Group>

          <Form.Group controlId="eventState">
            <Form.Label>Evento ativo?</Form.Label>
            <Form.Check type="switch" id="stateSwitch" required />
          </Form.Group>

          <Form.Group controlId="eventDate">
            <Form.Label>Data do Evento</Form.Label>
            <Form.Control type="date" required />
          </Form.Group>

          <Form.Group controlId="eventLocation">
            <Form.Label>Localização do Evento</Form.Label>
            <Form.Control type="text" required />
          </Form.Group>

          <Form.Group controlId="eventPolicy">
            <Form.Label>Termos de compra</Form.Label>
            <Form.Control type="text" required />
          </Form.Group>

          <Form.Group controlId="eventDescription">
            <Form.Label>Descrição do Evento</Form.Label>
            <Form.Control as="textarea" rows={3} required />
          </Form.Group>

          <Form.Group controlId="eventBannerImage">
            <Form.Label>Banner do evento</Form.Label>
            <Form.Control as="textarea" rows={3} required />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className={styles.CreateEventButton}
          >
            Criar Evento
          </Button>
        </Form>
      </Col>
    </Container>
  </div>
);

CreditCardPaymentMethodBox.propTypes = {};

CreditCardPaymentMethodBox.defaultProps = {};

export default CreditCardPaymentMethodBox;
