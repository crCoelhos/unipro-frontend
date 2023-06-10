import React, { useEffect } from "react";
import "./PaymentForm.css";
import { loadMercadoPago } from "@mercadopago/sdk-js";
import { Button, Col, Container, Row } from "react-bootstrap";

const PaymentForm = () => {
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
              installments,
              identificationNumber,
              identificationType,
            } = cardForm.getCardFormData();

            // mandar pro /bookticket
            const dataFromStorage = sessionStorage.getItem("user");
            let authToken = "";
            console.log('user',dataFromStorage)
            

            if (dataFromStorage) {
              const parsedData = JSON.parse(dataFromStorage);
              authToken = parsedData.token;
            }

            try {
              const response = await fetch("http://localhost:3003/admin/pay", {
                // entry point backend
                method: "POST",
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Request-Method":
                    "GET, POST, DELETE, PUT, OPTIONS",
                  "Content-Type": "application/json",
                  Access: "123",
                  Authorization : authToken
                },
                body: JSON.stringify({
                  issuer_id,
                  payment_method_id ,
                  amount,
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
                }),
              });


              console.log(JSON.stringify({
                issuer_id,
                payment_method_id,
                amount,
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
              }))
              // Tratar a resposta
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
    };

    initializeMercadoPago();
  }, []);

  return (
    <Container>
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
          <progress value="0" className="progress-bar">
            Carregando...
          </progress>
        </form>
      </div>
    </Container>
  );
};

PaymentForm.propTypes = {};

PaymentForm.defaultProps = {};

export default PaymentForm;
