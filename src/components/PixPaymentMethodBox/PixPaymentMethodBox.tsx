import React from "react";
import PropTypes from "prop-types";
import styles from "./PixPaymentMethodBox.module.css";
import { Container, Col, Row, Form, Button } from "react-bootstrap";

const PixPaymentMethodBox = () => (
  <div className={styles.PixPaymentMethodBox}>
    <Container>
      <Col>
        <Form className={styles.CreateEventBoxContainer}>
          <Form.Group controlId="BuyerFirstName">
            <Form.Label>Número do cartão</Form.Label>
            <Form.Control type="text" required />
          </Form.Group>

          <Form.Group controlId="BuyerSurName">
            <Form.Label>Data de validade</Form.Label>
            <Form.Control type="text" required />
          </Form.Group>

          <Form.Group controlId="BuyerSocialName">
            <Form.Label>Nome social</Form.Label>
            <Form.Control type="text" required />
          </Form.Group>

          <Form.Group controlId="BuyerEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" required />
          </Form.Group>

          <Form.Group controlId="BuyerEmailValidation">
            <Form.Label>Confirme o email</Form.Label>
            <Form.Control type="text" required />
          </Form.Group>

          <Form.Group controlId="BuyerCPF">
            <Form.Label>CPF</Form.Label>
            <Form.Control type="text" required />
          </Form.Group>

          <Form.Group controlId="BuyerBirthDate">
            <Form.Label>Data de nascimento</Form.Label>
            <Form.Control type="date" required />
          </Form.Group>

          <Form.Group controlId="BuyerGenre">
            <Form.Label>Genero</Form.Label>
            <Form.Control type="text" required />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className={styles.CreateEventButton}
          >
            Comprar
          </Button>
        </Form>
      </Col>
    </Container>
  </div>
);

PixPaymentMethodBox.propTypes = {};

PixPaymentMethodBox.defaultProps = {};

export default PixPaymentMethodBox;
