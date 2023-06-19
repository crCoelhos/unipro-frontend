import React, { useState } from "react";
import axios from "axios";


const url = process.env.REACT_APP_SERVER_URL
const serverSideAccessToken = process.env.REACT_APP_ACCESS_TOKEN

const PaymentForm: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [transaction_amount, settransaction_amount] = useState<number>(0);
  const [cardNumber, setCardNumber] = useState<string>("");
  const [cardHolderName, setCardHolderName] = useState<string>("");
  const [cardExpirationMonth, setCardExpirationMonth] = useState<string>("");
  const [cardExpirationYear, setCardExpirationYear] = useState<string>("");
  const [cardCVV, setCardCVV] = useState<string>("");

  const handlePaymentMethodChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPaymentMethod(event.target.value);
  };

  const handletransaction_amountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    settransaction_amount(parseFloat(event.target.value));
  };

  const handleCardNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCardNumber(event.target.value);
  };

  const handleCardHolderNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCardHolderName(event.target.value);
  };

  const handleCardExpirationMonthChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCardExpirationMonth(event.target.value);
  };

  const handleCardExpirationYearChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCardExpirationYear(event.target.value);
  };

  const handleCardCVVChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCardCVV(event.target.value);
  };

  const handlePaymentSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    // Determine o ID do método de pagamento com base na seleção do usuário
    let paymentMethodId = "";
    if (paymentMethod === "pix") {
      paymentMethodId = "pix_id"; // Substitua pelo ID correto do método PIX
    } else if (paymentMethod === "cartao") {
      paymentMethodId = "cartao_id"; // Substitua pelo ID correto do método de cartão de crédito
    }

    // Enviar os dados do pagamento para o backend
    const data = {
      paymentMethod,
      paymentMethodId: 'visa',
      transaction_amount,
      cardNumber,
      cardHolderName,
      cardExpirationMonth,
      cardExpirationYear,
      cardCVV,
    };



    const dataFromStorage = sessionStorage.getItem("user");
            let authToken = "";

            if (dataFromStorage) {
              const parsedData = JSON.parse(dataFromStorage);
              authToken = parsedData.token;
            }

    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Request-Method": "GET, POST, DELETE, PUT, OPTIONS",
        "Content-Type": "application/json",
        Access: serverSideAccessToken,
        Authorization: authToken,
      },
    };

    try {
      const response = await axios.post(
        `${url}/admin/pay`,
        data,
        config
      );
      // Faça algo com a resposta do backend, por exemplo, exiba uma mensagem de sucesso para o usuário.
    } catch (error) {
      console.error(error);
      // Lida com erros de requisição, exiba uma mensagem de erro para o usuário, etc.
    }
  };

  return (
    <form onSubmit={handlePaymentSubmit}>
      <div>
        <label>
          Método de Pagamento:
          <select value={paymentMethod} onChange={handlePaymentMethodChange}>
            <option value="pix">PIX</option>
            <option value="cartao">Cartão de Crédito</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Valor da Transação:
          <input
            type="number"
            value={transaction_amount}
            onChange={handletransaction_amountChange}
          />
        </label>
      </div>
      {paymentMethod === "cartao" && (
        <div>
          <label>
            Número do Cartão:
            <input
              type="text"
              value={cardNumber}
              onChange={handleCardNumberChange}
            />
          </label>
        </div>
      )}
      {paymentMethod === "cartao" && (
        <div>
          <label>
            Nome do Titular do Cartão:
            <input
              type="text"
              value={cardHolderName}
              onChange={handleCardHolderNameChange}
            />
          </label>
        </div>
      )}
      {paymentMethod === "cartao" && (
        <div>
          <label>
            Mês de Expiração:
            <input
              type="text"
              value={cardExpirationMonth}
              onChange={handleCardExpirationMonthChange}
            />
          </label>
        </div>
      )}
      {paymentMethod === "cartao" && (
        <div>
          <label>
            Ano de Expiração:
            <input
              type="text"
              value={cardExpirationYear}
              onChange={handleCardExpirationYearChange}
            />
          </label>
        </div>
      )}
      {paymentMethod === "cartao" && (
        <div>
          <label>
            CVV:
            <input type="text" value={cardCVV} onChange={handleCardCVVChange} />
          </label>
        </div>
      )}
      <button type="submit">Pagar</button>
    </form>
  );
};

export default PaymentForm;
