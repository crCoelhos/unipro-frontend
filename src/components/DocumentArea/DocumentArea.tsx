import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, FormCheck, Row } from "react-bootstrap";
import axios from "axios";
import styles from "./DocumentArea.module.css";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const url = process.env.REACT_APP_SERVER_URL;
const serverSideAccessToken = process.env.REACT_APP_ACCESS_TOKEN;

const DocumentArea: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<File | null>(null);

  const [selectedDocumentRegistration, setSelectedDocumentRegistration] =
    useState<File | null>(null);
  const [checked, setchecked] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { categoryId } = useParams();

  const dataFromStorage = sessionStorage.getItem("user");
  let token = "";
  let userName = "";
  if (dataFromStorage) {
    const parsedData = JSON.parse(dataFromStorage);
    token = parsedData.token;
    userName = parsedData.name;
  }

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
      Authorization: token,
      Access: serverSideAccessToken,
    },
  };


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedImage(file);
      handleUpload(file); // Envie o arquivo imediatamente
    }
  };

  const handlePDFChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]?.type === "application/pdf") {
      const file = e.target.files![0];
      setSelectedDocument(file);
      handleUpload(file); // Envie o arquivo imediatamente
    } else {
      alert("Por favor, selecione um arquivo PDF.");
    }
  };

  const handlePDFRegistratiom = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files![0]?.type === "application/pdf") {
      const file = e.target.files![0];
      setSelectedDocumentRegistration(file);
      handleUploadRegister(file); // Envie o arquivo imediatamente
    } else {
      alert("Por favor, selecione um arquivo PDF.");
    }
  };

  const handlePdfRemover = () => {
    setSelectedDocument(null);
    const pdfInput = document.getElementById("pdfInput") as HTMLInputElement;
    if (pdfInput) {
      pdfInput.value = "";
    }
  };

  const handleImageRemover = () => {
    setSelectedImage(null);
    const imageInput = document.getElementById(
      "imageInput"
    ) as HTMLInputElement;
    if (imageInput) {
      imageInput.value = "";
    }
  };

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

  const handleUploadRegister = async (file: File) => {
    if (file) {
      const formData = new FormData();
      formData.append("registration", file);

      try {
        await axios.post(url + "auth/photouserregister/", formData, config);
        
      } catch (error) {
        console.error("register: ", error);
      }
    }
  };
  const handleUpload = async (file: File) => {
    if (file) {
      const formData = new FormData();
      formData.append("user", file);

      try {
        await axios.post(url + "auth/photouser/", formData, config);
      } catch (error) {
        console.error("photo: ", error);
      }
    }
  };

  const handleSubmit = async () => {
    if (selectedDocument && selectedDocumentRegistration && selectedImage)
      navigate(`/sport-events/buyticket/${categoryId}`, {
        state: location.state,
      });
  };

  return (
    <div className={styles.DocumentAreaContainer}>
      <Container fluid>
        <Col xs={12} sm={12} md={12} lg={8} xl={8} xxl={8}>
          <Row>
            <Form.Group>
              <Form.Label>
                Selecione ou arraste foto de rosto para credencial:
              </Form.Label>
              <div className={styles.DropFileContainer}>
                <Form.Control
                  type="file"
                  accept=".png, .jpeg, .jpg"
                  className={styles.DropArea}
                  onChange={handleImageChange}
                  id="imageInput"
                />
                <Button variant={selectedImage ? "success" : "danger"} disabled>
                  {"    "}
                </Button>
              </div>
              {selectedImage && (
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected"
                  className={styles.ImgArea}
                />
              )}
            </Form.Group>
          </Row>
          <Row>
            <Form.Group>
              <Form.Label>
                Selecione ou arraste o documento com foto no formato PDF:
              </Form.Label>
              <div className={styles.DropFileContainer}>
                <Form.Control
                  type="file"
                  accept=".pdf"
                  className={styles.DropArea}
                  onChange={handlePDFChange}
                  id="pdfInput"
                />
                <Button
                  variant={selectedDocument ? "success" : "danger"}
                  disabled
                >
                  {"    "}
                </Button>
              </div>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group>
              <Form.Label>
                Selecione ou arraste o comprovante de matricula no formato PDF:
              </Form.Label>
              <div className={styles.DropFileContainer}>
                <Form.Control
                  type="file"
                  accept=".pdf"
                  className={styles.DropArea}
                  onChange={handlePDFRegistratiom}
                  id="pdfInput"
                />
                <Button
                  variant={selectedDocumentRegistration ? "success" : "danger"}
                  disabled
                >
                  {"    "}
                </Button>
              </div>
            </Form.Group>
            <Form.Label>
              Antes de enviar, selecione todos os documentos
            </Form.Label>
            <Form.Group className={styles.ThermDeclaration}>
              <Form.Check
                type={"checkbox"}
                onChange={(e) => setchecked(e.target.checked)}
              ></Form.Check>
              <Form.Label>
                Ao selecionar este campo de seleção, Eu aceito os termos de uso.
              </Form.Label>
            </Form.Group>
          </Row>
        </Col>
      </Container>

      <Button
        variant="primary"
        onClick={handleSubmit}
        disabled={!checked}
        className={styles.ToPaymentSubmitButton}
      >
        Enviar
      </Button>
    </div>
  );
};

export default DocumentArea;
