import React, { useState, useEffect } from "react";
import { Modal, Form, Button, FormGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import EventController from "../../controllers/EventController";
import styles from "./CreateCouponModal.module.css";
import CouponController from "../../controllers/CouponController";

function CreateCouponModal() {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [code, setCode] = useState<string>("");
  const [type, setType] = useState<any>("");
  const [amount, setAmount] = useState<string>("");
  const [expireDate, setExpireDate] = useState<string>("");
  const [finishDate, setFinishDate] = useState<string>("");
  const [isActive, setiIsActive] = useState<boolean>(true);
  const [usageCount, setUsageCount] = useState<number>(0);
  const [usageMax, setUsageMax] = useState<number>(0);
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
      // window.location.reload();
      // setCouponCreated(false);
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
            <Form.Group controlId="couponCode">
              <Form.Label>Gerar código</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="couponState">
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

            <Form.Group controlId="expiringDate">
              <Form.Label>Data de validade do cupom</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) => setExpireDate(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="finishDate">
              <Form.Label>Data final do cupom</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) => setFinishDate(e.target.value)}
                required
              />
            </Form.Group>
            <FormGroup controlId="formType">
              <Form.Label>Tipo de desconto</Form.Label>

              <Form.Select
                onChange={(e) => {
                  setType(e.target.value);
                }}
              >
                <option value="percentage">Porcentagem</option>
                <option value="value">Valor Fixo</option>
              </Form.Select>
            </FormGroup>

            <Form.Group controlId="discountAmount">
              <Form.Label>Valor do desconto</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="maxUsage">
              <Form.Label>Quantidade de cupons</Form.Label>
              <Form.Control
                type="maxUsage"
                onChange={(e) => setUsageMax(Number(e.target.value))}
                required
              />
            </Form.Group>

            <Form.Group controlId="maxUsage">
              <Form.Label>Cupom de uso único?</Form.Label>
              <Form.Check
                type="switch"
                id="couponUsage"
                label={isUniqueUse === true ? "Ativo" : "Inativo"}
                checked={isUniqueUse === true}
                onChange={() =>
                  setiIsUniqueUse(isUniqueUse === true ? false : true)
                }
              />
            </Form.Group>

            <Modal.Footer>
              <Button
                variant="primary"
                type="submit"
                className={styles.CreateEventButton}
              >
                Enviar cupom
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
