import React, { useEffect, useState } from "react";
import "./PaymentForm.css";
import { loadMercadoPago } from "@mercadopago/sdk-js";
import {
  Accordion,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  ToastHeader,
} from "react-bootstrap";
import axios from "axios";
import PaymentSuccessToast from "../PaymentSuccessToast/PaymentSuccessToast";
import PaymentFailedToast from "../PaymentFailedToast/PaymentFailedToast";
import PaymentProcessingToast from "../PaymentProcessingToast/PaymentProcessingToast";
import { formData } from "./formData";
import { useNavigate } from "react-router-dom";

const PaymentForm = () => {
  const navigate = useNavigate();

  const [payStatus, setPayStatus] = useState(null);

  const [pixFirstName, setPixFirstName] = useState("");
  const [pixLastName, setPixLastName] = useState("");
  const [pixEmail, setPixEmail] = useState("");
  const [pixIdentificationType, setPixIdentificationType] = useState("");
  const [pixIdentificationNumber, setPixIdentificationNumber] = useState("");
  const [pixZipCode, setPixZipCode] = useState("");
  const [pixStreetName, setPixStreetName] = useState("");
  const [pixStreetNumber, setPixStreetNumber] = useState("");
  const [pixNeighborhood, setPixNeighborhood] = useState("");
  const [pixCity, setPixCity] = useState("");
  const [pixFederalUnit, setPixFederalUnit] = useState("");

  const [pixQrCode, setPixQrCode] = useState("");
  const [pixQrCodeBase64, setPixQrCodeBase64] = useState("");

  // pix payment
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const dataFromStorage = sessionStorage.getItem("user");
    let authToken = "";
    console.log("user", dataFromStorage);

    if (dataFromStorage) {
      const parsedData = JSON.parse(dataFromStorage);
      authToken = parsedData.token;
    }

    const pixPayment_data = {
      transaction_amount: 1,
      description: "Título do produto",
      payment_method_id: "pix",
      payer: {
        email: pixEmail,
        first_name: pixFirstName,
        last_name: pixLastName,
        identification: {
          type: pixIdentificationType,
          number: pixIdentificationNumber,
        },
        address: {
          zip_code: pixZipCode,
          street_name: pixStreetName,
          street_number: pixStreetNumber,
          neighborhood: pixNeighborhood,
          city: pixCity,
          federal_unit: pixFederalUnit,
        },
      },
    };

    const pixHeaders = {
      headers: {
        "Content-Type": "application/json",
        Access: "123",
        Authorization: authToken,
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:3003/admin/pay",
        pixPayment_data,
        pixHeaders
      );

      const pix_copypaste_code = response.data.pix_qr_code.qr_code;
      setPixQrCode(pix_copypaste_code);
      const pix_qr_code64 = response.data.pix_qr_code.qr_code_base64;
      setPixQrCodeBase64(pix_qr_code64);

      console.log("sergio", pix_copypaste_code);
      console.log("rogerio", pix_qr_code64);

      const pay_status = response.data.pay_status;
      setPayStatus(pay_status);

      if (pay_status === "approved") {
        console.log(payStatus);
      }
    } catch (error) {
      console.error("Erro ao fazer a requisição:", error);
      console.log(pixPayment_data);
    }
  };

  // card payment
  useEffect(() => {
    const initializeMercadoPago = async () => {
      await loadMercadoPago();
      const mp = new window.MercadoPago(
        "TEST-3905bdb8-bd41-449b-9d83-a3a51c606620"
      );

      const cardForm = mp.cardForm({
        amount: "100.5",
        iframe: true,
        form: formData,
        callbacks: {
          onFormMounted: (error: any) => {
            if (error) {
              console.warn("Form Mounted handling error: ", error);
            } else {
              console.log("Form mounted");
            }
          },
          onSubmit: async (event: { preventDefault: () => void }) => {
            event.preventDefault();

            const {
              paymentMethodId: payment_method_id,
              issuerId: issuer_id,
              cardholderEmail: email,
              amount,
              token,
              installments,
              identificationNumber,
              identificationType,
            } = cardForm.getCardFormData();

            // mandar pro /bookticket
            const dataFromStorage = sessionStorage.getItem("user");
            let authToken = "";
            console.log("user", dataFromStorage);

            if (dataFromStorage) {
              const parsedData = JSON.parse(dataFromStorage);
              authToken = parsedData.token;
            }

            try {
              const response = await axios.post(
                "http://localhost:3003/admin/pay",
                {
                  issuer_id: cardForm.issuerId,
                  payment_method_id,
                  amount,
                  token,
                  transaction_amount: 1000,
                  installments: Number(installments),
                  description: "Descrição do produto",
                  paymentMethod: "cartao",
                  payer: {
                    email,
                    identification: {
                      type: identificationType,
                      number: identificationNumber,
                    },
                  },
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                    Access: "123",
                    Authorization: authToken,
                  },
                }
              );

              const pay_status = response.data.pay_status;
              setPayStatus(pay_status);
              console.log("resultado: ", response.data);

              if (pay_status === "approved") {
                console.log(payStatus);
                setTimeout(() => {
                  navigate("/sport-events");
                }, 7000);
              }
            } catch (error) {
              console.error("Erro ao fazer a requisição:", error);
              setTimeout(() => {
                navigate("/sport-events");
              }, 7000);
            }
          },

          onFetching: (resource: any) => {
            console.log("Fetching resource: ", resource);

            // Animate progress bar
            const progressBar = document.querySelector(".progress-bar");
            if (progressBar) {
              progressBar.removeAttribute("value");

              return () => {
                progressBar.setAttribute("value", "0");
              };
            }
          },
        },
      });

      //teste

      //fechamento
    };

    initializeMercadoPago();
  }, [payStatus, navigate]);

  return (
    <Container className="OuterContainer">
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>CARTÃO DE CREDITO</Accordion.Header>
          <Accordion.Body>
            <div className="PaymentForm">
              <form id="form-checkout">
                <Row>
                  <Col>
                    <div
                      id="form-checkout__cardNumber"
                      className="container mpFormInput"
                    ></div>
                  </Col>
                  <Col>
                    <div
                      id="form-checkout__expirationDate"
                      className="container mpFormInput"
                    ></div>
                  </Col>
                  <Col>
                    <div
                      id="form-checkout__securityCode"
                      className="container mpFormInput"
                    ></div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <select
                      id="form-checkout__issuer"
                      className="container mpFormInput"
                      disabled
                    ></select>
                  </Col>
                </Row>
                <input
                  type="text"
                  id="form-checkout__cardholderName"
                  className="cardHolderName mpFormInput"
                />
                <input
                  type="email"
                  id="form-checkout__cardholderEmail"
                  className="container mpFormInput"
                />
                <Row>
                  <Col>
                    <select
                      id="form-checkout__installments"
                      className="container mpFormInput"
                    ></select>
                  </Col>
                </Row>
                <Row>
                  <span>Tipo de documento:</span>
                  <Col>
                    <select
                      id="form-checkout__identificationType"
                      className="container mpFormInput"
                    ></select>
                  </Col>
                  <Col>
                    <input
                      type="text"
                      id="form-checkout__identificationNumber"
                      className="container mpFormInput"
                    />
                  </Col>
                </Row>

                <Button
                  type="submit"
                  id="form-checkout__submit"
                  className="container"
                >
                  Pagar
                </Button>

                {payStatus === "approved" && <PaymentSuccessToast />}
                {payStatus === "rejected" && <PaymentFailedToast />}
                {payStatus === "in_process" && <PaymentProcessingToast />}
              </form>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>PIX</Accordion.Header>
          <Accordion.Body>
            <Form id="form-checkout" onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="form-checkout__pixFirstName">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                      type="text"
                      value={pixFirstName}
                      onChange={(e) => setPixFirstName(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="form-checkout__pixLastName">
                    <Form.Label>Sobrenome</Form.Label>
                    <Form.Control
                      type="text"
                      value={pixLastName}
                      onChange={(e) => setPixLastName(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={5}>
                  <Form.Group controlId="form-checkout__pixEmail">
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control
                      type="text"
                      value={pixEmail}
                      onChange={(e) => setPixEmail(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group controlId="form-checkout__pixIdentificationType">
                    <Form.Label>Tipo de documento</Form.Label>
                    <Form.Control
                      as="select"
                      value={pixIdentificationType}
                      onChange={(e) => setPixIdentificationType(e.target.value)}
                    >
                      <option value=""></option>
                      <option value="CPF">CPF</option>
                      <option value="CNPJ">CNPJ</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="form-checkout__pixIdentificationNumber">
                    <Form.Label>Número do documento</Form.Label>
                    <Form.Control
                      type="text"
                      value={pixIdentificationNumber}
                      onChange={(e) =>
                        setPixIdentificationNumber(e.target.value)
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={3}>
                  <Form.Group controlId="form-checkout__pixZipCode">
                    <Form.Label>CEP</Form.Label>
                    <Form.Control
                      type="text"
                      value={pixZipCode}
                      onChange={(e) => setPixZipCode(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={5}>
                  <Form.Group controlId="form-checkout__pixStreetName">
                    <Form.Label>Rua</Form.Label>
                    <Form.Control
                      type="text"
                      value={pixStreetName}
                      onChange={(e) => setPixStreetName(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="form-checkout__pixStreetNumber">
                    <Form.Label>Número</Form.Label>
                    <Form.Control
                      type="text"
                      value={pixStreetNumber}
                      onChange={(e) => setPixStreetNumber(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="form-checkout__pixCity">
                    <Form.Label>Cidade</Form.Label>
                    <Form.Control
                      type="text"
                      value={pixCity}
                      onChange={(e) => setPixCity(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="form-checkout__pixFederalUnit">
                    <Form.Label>Estado</Form.Label>
                    <Form.Control
                      type="text"
                      value={pixFederalUnit}
                      onChange={(e) => setPixFederalUnit(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row></Row>
              <Button type="submit" id="form-pix-submit" className="container">
                Gerar QR Code
              </Button>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Col>
        <div className="PixQrCodeContainer">
          <Row>
            <Col xl={5}>
              <Card className="PixCodeBox">
                {/* {pixQrCode !== null && pixQrCode !== undefined && pixQrCode} */}
                {(() => {
                  if (pixQrCode !== null && pixQrCode !== "") {
                    return (
                      <Card.Body>
                        <Card.Title>Pix copia e cola:</Card.Title>
                        <Card.Text>{pixQrCode}</Card.Text>
                      </Card.Body>
                    );
                  }
                  return <></>;
                })()}
              </Card>
            </Col>

            <Col xl={7}>
              {(() => {
                if (pixQrCodeBase64 !== null && pixQrCodeBase64 !== "") {
                  return (
                    <Card className="PixQrCodeBox">
                      <Card.Body>
                        <Card.Title>
                          Abra o aplicativo de pagamento e aponte a câmera para
                          o QR Code{" "}
                        </Card.Title>
                      </Card.Body>
                      <Card.Img
                        src={`data:image/jpeg;base64,${pixQrCodeBase64}`}
                      />
                    </Card>
                  );
                }
                return <></>;
              })()}
            </Col>
          </Row>
        </div>
      </Col>
    </Container>
  );
};

PaymentForm.propTypes = {};

PaymentForm.defaultProps = {};

export default PaymentForm;
