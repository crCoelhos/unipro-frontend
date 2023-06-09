import React, { useEffect } from "react";
import "./PaymentForm.css";
import { loadMercadoPago } from "@mercadopago/sdk-js";

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
            placeholder: "Card Number",
          },
          expirationDate: {
            id: "form-checkout__expirationDate",
            placeholder: "MM/YY",
          },
          securityCode: {
            id: "form-checkout__securityCode",
            placeholder: "Security Code",
          },
          cardholderName: {
            id: "form-checkout__cardholderName",
            placeholder: "Cardholder",
          },
          issuer: {
            id: "form-checkout__issuer",
            placeholder: "Issuing bank",
          },
          installments: {
            id: "form-checkout__installments",
            placeholder: "Installments",
          },
          identificationType: {
            id: "form-checkout__identificationType",
            placeholder: "Document type",
          },
          identificationNumber: {
            id: "form-checkout__identificationNumber",
            placeholder: "Document number",
          },
          cardholderEmail: {
            id: "form-checkout__cardholderEmail",
            placeholder: "Email",
          },
        },
        callbacks: {
          onFormMounted: (error: any) => {
            if (error)
              return console.warn("Form Mounted handling error: ", error);
            console.log("Form mounted");
          },
          onSubmit: (event: { preventDefault: () => void }) => {
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

            if (dataFromStorage) {
              const parsedData = JSON.parse(dataFromStorage);
              authToken = parsedData.token;
            }

            fetch("http://localhost:3003/admin/pay", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: authToken,
                Access: "123",
                Confirm: "true",
              },
              body: JSON.stringify({
                token,
                issuer_id,
                payment_method_id,
                transaction_amount: Number(amount),
                installments: Number(installments),
                description: "Product Description",
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
          },
          onFetching: (resource: any) => {
            console.log("Fetching resource: ", resource);

            // Animate progress bar
            // const progressBar = document.querySelector(".progress-bar");
            // progressBar.removeAttribute("value");

            // return () => {
            //   progressBar.setAttribute("value", "0");
            // };
          },
        },
      });
    };

    initializeMercadoPago();
  }, []);

  return (
    <div className="PaymentForm">
      <form id="form-checkout">
        <div id="form-checkout__cardNumber" className="container">
          {" "}
          teste{" "}
        </div>
        <div id="form-checkout__expirationDate" className="container"></div>
        <div id="form-checkout__securityCode" className="container"></div>
        <input type="text" id="form-checkout__cardholderName" />
        <select id="form-checkout__issuer" className="container"></select>
        <select id="form-checkout__installments" className="container"></select>
        <select
          id="form-checkout__identificationType"
          className="container"
        ></select>
        <input
          type="text"
          id="form-checkout__identificationNumber"
          className="container"
        />
        <input
          type="email"
          id="form-checkout__cardholderEmail"
          className="container"
        />

        <button type="submit" id="form-checkout__submit" className="container">
          Pagar
        </button>
        <progress value="0" className="progress-bar">
          Carregando...
        </progress>
      </form>
    </div>
  );
};

PaymentForm.propTypes = {};

PaymentForm.defaultProps = {};

export default PaymentForm;
