import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import EventController from "../../controllers/EventController";
import styles from "./CreateCouponModal.module.css";
import CouponController from "../../controllers/CouponController";

function CreateCouponModal() {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [code, setCode] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [expireDate, setExpireDate] = useState<string>("");
  const [finishDate, setFinishDate] = useState<string>("");
  const [isActive, setiIsActive] = useState<boolean>(true);
  const [usageCount, setUsageCount] = useState<number>(0);
  const [usageMax, setUageMax] = useState<number>(0);
  const [isUniqueUse, setiIsUniqueUse] = useState<boolean>(false);

  const navigate = useNavigate();

  const [couponCreated, setCouponCreated] = useState(false);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const couponData = {
      code,
      type,
      amount,
      expireDate,
      finishDate,
      isActive,
      usageCount,
      usageMax,
      isUniqueUse,
    };

    await CouponController.createCoupon(couponData);
    setCouponCreated(true);
    handleClose();
  };

  useEffect(() => {
    if (couponCreated) {
      window.location.reload();
      setCouponCreated(false);
    }
  }, [couponCreated]);

  return (
    <div className={styles.CreateCouponModal}>
      <Button
        variant="primary"
        onClick={handleShow}
        style={{ marginLeft: "50vw", fontSize: "18px" }}
      >
        CRIAR CUPOM
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>CRIAR CUPOM</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={handleSubmit}
            id="form"
            className={styles.CreateEventBoxContainer}
          >
            <Form.Group controlId="eventName">
              <Form.Label>Gerar código</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="eventState">
              <Form.Label>Cupom ativo?</Form.Label>
              <Form.Check
                type="switch"
                id="stateSwitch"
                label={isActive === true ? "Ativo" : "Inativo"}
                checked={isActive === true}
                onChange={() => setiIsActive(isActive === true ? false : true)}
                required
              />
            </Form.Group>

            <Form.Group controlId="eventDate">
              <Form.Label>Data de validade do cupom</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) => setExpireDate(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="eventDate">
              <Form.Label>Data final do cupom</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) => setFinishDate(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formQuantity">
              <Form.Label>Quantidade</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="eventState">
              <Form.Label>Cupom de uso único?</Form.Label>
              <Form.Check
                type="switch"
                id="stateSwitch"
                label={isActive === true ? "Ativo" : "Inativo"}
                checked={isActive === true}
                onChange={() =>
                  setiIsUniqueUse(isActive === true ? false : true)
                }
                required
              />
            </Form.Group>

            <Modal.Footer>
              <Button
                variant="primary"
                type="submit"
                className={styles.CreateEventButton}
              >
                Enviar Evento
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

export default CreateCouponModal;
