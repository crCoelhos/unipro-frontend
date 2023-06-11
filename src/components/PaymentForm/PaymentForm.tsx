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

const PaymentForm = () => {
  const [payStatus, setPayStatus] = useState(null);
  const [payerFirstName, setPayerFirstName] = useState("");
  const [payerLastName, setPayerLastName] = useState("");
  const [email, setEmail] = useState("");
  const [identificationType, setIdentificationType] = useState("");
  const [identificationNumber, setIdentificationNumber] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
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
        form: {
          id: "form-checkout",
          cardNumber: {
            id: "form-checkout__cardNumber",
            placeholder: "Numero do cartão",
          },
          expirationDate: {
            id: "form-checkout__expirationDate",
            placeholder: "Data de validade no formato: MM/AA",
          },
          securityCode: {
            id: "form-checkout__securityCode",
            placeholder: "Código de segurança",
          },
          cardholderName: {
            id: "form-checkout__cardholderName",
            placeholder: "Nome do titular do cartão",
          },
          issuer: {
            id: "form-checkout__issuer",
            placeholder: "Banco",
          },
          installments: {
            id: "form-checkout__installments",
            placeholder: "Parcelas",
          },
          identificationType: {
            id: "form-checkout__identificationType",
            placeholder: "Tipo de documento",
          },
          identificationNumber: {
            id: "form-checkout__identificationNumber",
            placeholder: "Número do documento do titular",
          },
          cardholderEmail: {
            id: "form-checkout__cardholderEmail",
            placeholder: "Email do titular",
          },
        },
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
                  <label htmlFor="payerFirstName">Nome</label>
                  <input
                    id="form-checkout__payerFirstName"
                    name="payerFirstName"
                    type="text"
                    value={payerFirstName}
                    onChange={(e) => setPayerFirstName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="payerLastName">Sobrenome</label>
                  <input
                    id="form-checkout__payerLastName"
                    name="payerLastName"
                    type="text"
                    value={payerLastName}
                    onChange={(e) => setPayerLastName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="email">E-mail</label>
                  <input
                    id="form-checkout__email"
                    name="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="identificationType">Tipo de documento</label>
                  <select
                    id="form-checkout__identificationType"
                    name="identificationType"
                    value={identificationType}
                    onChange={(e) => setIdentificationType(e.target.value)}
                  >
                    {/* Add options for identification types */}
                  </select>
                </div>
                <div>
                  <label htmlFor="identificationNumber">
                    NÃºmero do documento
                  </label>
                  <input
                    id="form-checkout__identificationNumber"
                    name="identificationNumber"
                    type="text"
                    value={identificationNumber}
                    onChange={(e) => setIdentificationNumber(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div>
                  <input
                    type="hidden"
                    name="transactionAmount"
                    id="transactionAmount"
                    value="100"
                  />
                  <input
                    type="hidden"
                    name="description"
                    id="description"
                    value="Nome do Produto"
                  />
                  <br />
                  <button type="submit">Pagar</button>
                </div>
              </div>
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
