import { useEffect, useState } from "react";
import useScript from "./useScript";
import { formConfig } from "../components/MercadoPago/formConfig";
import { loadMercadoPago } from "@mercadopago/sdk-js";

const url = process.env.REACT_APP_SERVER_URL;
const serverSideAccessToken = process.env.REACT_APP_ACCESS_TOKEN!;
const mpClientSidePaymentKey = process.env.REACT_APP_MP_CLIENT_SIDE_PAYMENT_KEY;

export default function useMercadoPago() {
  const [resultPayment, setResultPayment] = useState(undefined);

  const { MercadoPago } = useScript(
    "https://sdk.mercadopago.com/js/v2",
    "MercadoPago"
  );

  useEffect(() => {
    if (MercadoPago) {
      // const mp = new MercadoPago(import.meta.env.VITE_PUBLIC_KEY_MP);

      const initializeMercadoPago = async () => {
        await loadMercadoPago();
        const mp = new window.MercadoPago(mpClientSidePaymentKey);
        const cardForm = mp.cardForm({
          amount: "100.5",
          autoMount: true,
          form: formConfig,
          callbacks: {
            onFormMounted: (error: any) => {
              if (error)
                return console.warn("Form Mounted handling error: ", error);
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

              fetch(`${url}admin/pay`, {
                // entry point backend
                method: "POST",
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Request-Method":
                    "GET, POST, DELETE, PUT, OPTIONS",
                  "Content-Type": "application/json",
                  Access: serverSideAccessToken,
                },
                body: JSON.stringify({
                  token,
                  issuer_id,
                  payment_method_id,
                  amount,
                  transaction_amount: 1000,
                  installments: Number(installments),
                  description: "Descrição do produto",
                  payer: {
                    email,
                    identification: {
                      type: identificationType,
                      number: identificationNumber,
                    },
                  },
                }),
              })
                .then((res) => res.json())
                .then((data) => setResultPayment(data))
                .catch((err) => {
                  setResultPayment(err);
                });
            },
            onFetching: (resource: any) => {},
          },
        });
      };
    }
  }, [MercadoPago]);

  return resultPayment;
}
