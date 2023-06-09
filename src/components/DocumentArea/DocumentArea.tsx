import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import styles from "./DocumentArea.module.css";

const url: string = "http://localhost:3003/";

const DocumentArea: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.set("user", selectedImage);
      for (var key of formData.entries()) {
        console.log(key[0] + ", " + key[1]);
      }
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
          "Accept": "multipart/form-data",
          'Authorization': token,
          "Access": 123,
        },
      };

      try {
        await axios.post(url + "auth/photouser/", formData, config);
        console.log("foi");
      } catch (error) {
        console.error(error);
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
