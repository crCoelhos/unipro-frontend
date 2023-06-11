import React, { useEffect, useState } from "react";
import "./PaymentForm.css";
import { loadMercadoPago } from "@mercadopago/sdk-js";
import {
  Accordion,
  Button,
  Col,
  Container,
  Row,
  ToastHeader,
} from "react-bootstrap";
import axios from "axios";
import PaymentSuccessToast from "../PaymentSuccessToast/PaymentSuccessToast";
import PaymentFailedToast from "../PaymentFailedToast/PaymentFailedToast";
import PaymentProcessingToast from "../PaymentProcessingToast/PaymentProcessingToast";
import { formData } from "./formData";

const PaymentForm = () => {
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const pixPayment_data = {
      transaction_amount: 100,
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
        { pixPayment_data },
        {
          headers: {
            "Content-Type": "application/json",
            Access: "123",
            Authorization: authToken,
          },
        }
      );

      console.log('rogerio', pixIdentificationType)
      console.log(pixPayment_data);

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

              if (pay_status === "approved") {
                console.log(payStatus);
              }
            } catch (error) {
              console.error("Erro ao fazer a requisição:", error);
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
  }, []);

  return (
    <Container>
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
                </Row>
                <Row>
                  <div
                    id="form-checkout__securityCode"
                    className="container mpFormInput"
                  ></div>
                </Row>
                <input
                  type="text"
                  id="form-checkout__cardholderName"
                  className="cardHolderName mpFormInput"
                />
                <Row>
                  <select
                    id="form-checkout__issuer"
                    className="container mpFormInput"
                  ></select>
                </Row>
                <Row>
                  <select
                    id="form-checkout__installments"
                    className="container mpFormInput"
                  ></select>
                </Row>
                <Row>
                  <select
                    id="form-checkout__identificationType"
                    className="container mpFormInput"
                  ></select>
                </Row>
                <Row>
                  <input
                    type="text"
                    id="form-checkout__identificationNumber"
                    className="container mpFormInput"
                  />
                </Row>
                <Row>
                  <input
                    type="email"
                    id="form-checkout__cardholderEmail"
                    className="container mpFormInput"
                  />
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
            <form id="form-checkout" onSubmit={handleSubmit}>
              <div>
                <div>
                  <label htmlFor="pixFirstName">Nome</label>
                  <input
                    id="form-checkout__pixFirstName"
                    name="pixFirstName"
                    type="text"
                    value={pixFirstName}
                    onChange={(e) => setPixFirstName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="pixLastName">Sobrenome</label>
                  <input
                    id="form-checkout__pixLastName"
                    name="pixLastName"
                    type="text"
                    value={pixLastName}
                    onChange={(e) => setPixLastName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="pixEmail">E-mail</label>
                  <input
                    id="form-checkout__pixEmail"
                    name="pixEmail"
                    type="text"
                    value={pixEmail}
                    onChange={(e) => setPixEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="pixIdentificationType">
                    Tipo de documento
                  </label>
                  <select
                    id="form-checkout__pixIdentificationType"
                    name="pixIdentificationType"
                    value={pixIdentificationType}
                    onChange={(e) => setPixIdentificationType(e.target.value)}
                    defaultValue="CPF"
                  >
                    <option value=""></option>
                    <option value="CPF">CPF</option>
                    <option value="CNPJ">CNPJ</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="pixIdentificationNumber">
                    Número do documento
                  </label>
                  <input
                    id="form-checkout__pixIdentificationNumber"
                    name="pixIdentificationNumber"
                    type="text"
                    value={pixIdentificationNumber}
                    onChange={(e) => setPixIdentificationNumber(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="pixZipCode">CEP</label>
                  <input
                    id="form-checkout__pixZipCode"
                    name="pixZipCode"
                    type="text"
                    value={pixZipCode}
                    onChange={(e) => setPixZipCode(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="pixStreetName">Rua</label>
                  <input
                    id="form-checkout__pixStreetName"
                    name="pixStreetName"
                    type="text"
                    value={pixStreetName}
                    onChange={(e) => setPixStreetName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="pixStreetNumber">Número</label>
                  <input
                    id="form-checkout__pixStreetNumber"
                    name="pixStreetNumber"
                    type="text"
                    value={pixStreetNumber}
                    onChange={(e) => setPixStreetNumber(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="pixNeighborhood">Bairro</label>
                  <input
                    id="form-checkout__pixNeighborhood"
                    name="pixNeighborhood"
                    type="text"
                    value={pixNeighborhood}
                    onChange={(e) => setPixNeighborhood(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="pixCity">Cidade</label>
                  <input
                    id="form-checkout__pixCity"
                    name="pixCity"
                    type="text"
                    value={pixCity}
                    onChange={(e) => setPixCity(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="pixFederalUnit">Estado</label>
                  <input
                    id="form-checkout__pixFederalUnit"
                    name="pixFederalUnit"
                    type="text"
                    value={pixFederalUnit}
                    onChange={(e) => setPixFederalUnit(e.target.value)}
                  />
                </div>
              </div>
              <Button type="submit" id="form-pix-submit" className="container">
                Pagar
              </Button>
            </form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

PaymentForm.propTypes = {};

PaymentForm.defaultProps = {};

export default PaymentForm;
