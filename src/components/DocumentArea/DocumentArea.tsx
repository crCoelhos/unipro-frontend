import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import styles from "./DocumentArea.module.css";
import { useNavigate, useParams, useLocation } from "react-router-dom";


const url = process.env.REACT_APP_SERVER_URL;
const serverSideAccessToken = process.env.REACT_APP_ACCESS_TOKEN;

const DocumentArea: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { categoryId } = useParams();
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkUserToken = () => {
    const userToken = sessionStorage.getItem('user');
    if (!userToken || userToken === 'undefined') {
      setIsLoggedIn(false);
      return navigate('/login');
    }
    setIsLoggedIn(true);
  }
  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);


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
          Access: serverSideAccessToken,
        },
      };

      const bookConfig = {
        headers: {
          "Content-Type": "Application/json",
          Authorization: token,
          Access: serverSideAccessToken,
          Confirm: true,
        },
      };
      const bookData = {
        categoryId: categoryId,
        athleticId: location.state.athletic.id
      }
      try {
        await axios.post(url + "auth/photouser/", formData, config);
        try {
          // await axios.post(url + "admin/bookticket/", bookData, bookConfig);
        } catch (error) {
          console.error('book: ', error);
        }
        navigate(`/sport-events/buyticket/${categoryId}`, { state: location.state });
      } catch (error) {
        console.error('photo: ', error);
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
