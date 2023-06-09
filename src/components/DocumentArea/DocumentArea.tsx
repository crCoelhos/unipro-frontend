import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import styles from "./DocumentArea.module.css";
import { useNavigate, useParams } from "react-router-dom";

const url: string = "http://localhost:3003/";

const DocumentArea: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const navigate = useNavigate();
  const { ticketId } = useParams();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append("user", selectedImage);

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
          Access: "123",
        },
      };

      const bookConfig = {
        headers: {
          "Content-Type": "Application/json",
          Authorization: token,
          Access: "123",
          Confirm: true,
        },
      };
      const bookData = {
        id : ticketId
      }

      try {
        await axios.post(url + "auth/photouser/", formData, config);
        try {
          await axios.post(url + "admin/bookticket/", bookData, bookConfig);
        } catch (error) {
          console.error('book: ',error);
          console.log(ticketId)
        }
        navigate(`/sport-events/buyticket/${ticketId}`);
      } catch (error) {
        console.error('photo: ',error);
      }
    }
  };

  return (
    <div className={styles.DocumentAreaContainer}>
      <Form.Group>
        <Form.Label>Selecione ou arraste o documento:</Form.Label>
        <Form.Control
          type="file"
          className={styles.DropArea}
          onChange={handleImageChange}
        />
        {selectedImage && (
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Selected"
            className={styles.ImgArea}
          />
        )}
      </Form.Group>
      <Button variant="primary" onClick={handleUpload}>
        Enviar
      </Button>
    </div>
  );
};

export default DocumentArea;
