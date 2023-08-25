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
import { useNavigate, useLocation } from "react-router-dom";
import copyIcon from "../../assets/icons/copy.png";
import { Modality } from "../../types";

const PaymentForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [paymentID, setPaymentID] = useState<string>("");
  const [paymentResponse, setPaymentResponse] = useState<number | null>(null);
  const checkUserToken = () => {
    const userToken = sessionStorage.getItem("user");
    if (!userToken || userToken === "undefined") {
      setIsLoggedIn(false);
      return navigate("/login");
    }
    setIsLoggedIn(true);
  };
  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);
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

  const [eventData, setEventData] = useState({});
  const [categorytDataId, setCategortDataId] = useState("");

  const path = window.location.pathname;
  const code = path.split("/buyticket/")[1];

  const url = process.env.REACT_APP_SERVER_URL;
  const serverSideAccessToken = process.env.REACT_APP_ACCESS_TOKEN;
  const mpClientSidePaymentKey =
    process.env.REACT_APP_MP_CLIENT_SIDE_PAYMENT_KEY;

  const dataFromStorage = sessionStorage.getItem("user");
  let authToken = "";

  if (dataFromStorage) {
    const parsedData = JSON.parse(dataFromStorage);
    authToken = parsedData.token;
  }

  const eventHeaders = {
    headers: {
      "Content-Type": "application/json",
      Access: serverSideAccessToken,
      Authorization: authToken,
    },
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${url}admin/category/${code}`,
          eventHeaders
        );
        const event_Data = response.data;
        setEventData(event_Data);
        setCategortDataId(event_Data.id);
      } catch (error) {
        console.error("Erro ao fazer a requisição:", error);
      }
    };

    // const fetchPaymentResponse = async () => {
    //   try {
    //     const response = await axios.get(`${url}notification`, eventHeaders);
    //     const response_id = response.data.id;
    //     const response_status = response.data.status;
    //     setPaymentID(response_id);
    //     setPaymentResponse(response_status);
    //   } catch (error) {
    //     console.error("Erro ao obter resposta de pagamento: ", error);
    //   }
    // };

    // fetchPaymentResponse();

    fetchEvents();
  }, []);

  // pix payment
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const dataFromStorage = sessionStorage.getItem("user");
    let authToken = "";

    if (dataFromStorage) {
      const parsedData = JSON.parse(dataFromStorage);
      authToken = parsedData.token;
    }

    const pixPayment_data = {
      // id: event_,
      transaction_amount: Number(location.state.category.price),
      description: "eu vo tomar um tacaca, dançar, curtir, ficar de boa",
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
        Access: serverSideAccessToken,
        Authorization: authToken,
      },
    };
    try {
      const response = await axios.post(
        `${url}admin/pay`,
        pixPayment_data,
        pixHeaders
      );

      const modalities = location.state.modalities;
      const userTicket = location.state.userTicket;
      modalities.forEach(async (modality: Modality) => {
        const modalitiesUserTicket = {
          userTicketId: userTicket.id,
          modalityId: modality.id,
        };
        const modalities = await axios.post(
          `${url}admin/modalitusertickets`,
          modalitiesUserTicket,
          pixHeaders
        );
      });

      const pix_copypaste_code = response.data.pix_qr_code.qr_code;
      setPixQrCode(pix_copypaste_code);
      const pix_qr_code64 = response.data.pix_qr_code.qr_code_base64;
      setPixQrCodeBase64(pix_qr_code64);

      const pay_status = response.data.pay_status;
      setPayStatus(pay_status);

      if (pay_status === "approved") {
      }
    } catch (error) {
      console.error("Erro ao fazer a requisição:", error);
    }
  };

  // card payment
  useEffect(() => {
    const initializeMercadoPago = async () => {
      await loadMercadoPago();
      const mp = new window.MercadoPago(mpClientSidePaymentKey);
      const cardForm = mp.cardForm({
        amount: location.state.category.price,
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

            if (dataFromStorage) {
              const parsedData = JSON.parse(dataFromStorage);
              authToken = parsedData.token;
            }

            try {
              const response = await axios.post(
                `${url}admin/pay`,
                {
                  id: location.state.category.id,
                  issuer_id: cardForm.issuerId,
                  payment_method_id,
                  amount,
                  token,
                  transaction_amount: location.state.category.price,
                  installments: Number(installments),
                  description: location.state.category.name,
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
                    Access: serverSideAccessToken,
                    Authorization: authToken,
                  },
                }
              );
              const httpHeader = {
                headers: {
                  "Content-Type": "application/json",
                  Access: serverSideAccessToken,
                  Authorization: authToken,
                },
              };
              const modalities = location.state.modalities;
              const userTicket = location.state.userTicket;
              modalities.forEach(async (modality: Modality) => {
                const modalitiesUserTicket = {
                  userTicketId: userTicket.id,
                  modalityId: modality.id,
                };
                const modalities = await axios.post(
                  `${url}admin/modalitusertickets`,
                  modalitiesUserTicket,
                  httpHeader
                );
              });

              const pay_status = response.data.pay_status;
              setPayStatus(pay_status);

              if (pay_status === "approved") {
                setTimeout(() => {
                  navigate("/sport-events");
                }, 7000);
              } else if (pay_status === "rejected") {
                setTimeout(() => {
                  window.location.reload();
                }, 2000);
              }
            } catch (error) {
              console.error("Erro ao fazer a requisição:", error);
              setTimeout(() => {
                navigate("/sport-events");
              }, 7000);
            }
          },

          onFetching: (resource: any) => {
            // console.log("Fetching resource: ", resource);

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
  }, [payStatus, eventData, categorytDataId, navigate]);

  const webhookCall = async () => {
    try {
      const response = await axios.post(`${url}webhook`, {
        headers: {
          Authorization: authToken,
          Access: serverSideAccessToken,
        },
      });

      console.log(response.data); // Exibe a resposta do webhook
    } catch (error) {
      console.error(error);
    }
  };

  webhookCall();

  return (
    <Container className="OuterContainer">
      <Card>
        <Card bg="info">
          <Card.Text className="PaymentFormTicketInfoCard">
            <span>
              <h1>{location.state.category.name}</h1>
            </span>
            <span>
              <h1 id="amount">R$ {location.state.category.price}</h1>
            </span>
          </Card.Text>
        </Card>
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
                    required
                  />
                  <input
                    type="email"
                    id="form-checkout__cardholderEmail"
                    className="container mpFormInput"
                    required
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
                        required
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
            <Accordion.Header className="PaymentMethodOptions">
              PIX
            </Accordion.Header>
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
                        onChange={(e) =>
                          setPixIdentificationType(e.target.value)
                        }
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
                  <Col md={4}>
                    <Form.Group controlId="form-checkout__pixNeighborhood">
                      <Form.Label>Bairro</Form.Label>
                      <Form.Control
                        type="text"
                        value={pixNeighborhood}
                        onChange={(e) => setPixNeighborhood(e.target.value)}
                      />
                    </Form.Group>

                    {/* <div>
                  <label htmlFor="pixNeighborhood">Bairro</label>
                  <input
                    id="form-checkout__pixNeighborhood"
                    name="pixNeighborhood"
                    type="text"
                    value={pixNeighborhood}
                    onChange={(e) => setPixNeighborhood(e.target.value)}
                  />
                </div> */}
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
                <Button
                  type="submit"
                  id="form-pix-submit"
                  className="container"
                >
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
                          <Card.Title>
                            {pixQrCode && (
                              <Button
                                variant="outline-info"
                                onClick={() =>
                                  navigator.clipboard.writeText(pixQrCode)
                                }
                              >
                                <img
                                  src={copyIcon}
                                  alt="icone de copiar para area de transferência"
                                  className="CopyIcon"
                                />
                              </Button>
                            )}
                          </Card.Title>

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
                            Abra o aplicativo de pagamento e aponte a câmera
                            para o QR Code
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
      </Card>
    </Container>
  );
};

PaymentForm.propTypes = {};

PaymentForm.defaultProps = {};

export default PaymentForm;
