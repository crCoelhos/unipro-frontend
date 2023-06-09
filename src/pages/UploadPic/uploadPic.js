import axios from 'axios';
import Dropzone from 'react-dropzone';
import React, { useState } from 'react';
import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom';
import useLoginController from '../../controllers/LoginController.tsx';
import GreetingImperial from "../../assets/images/vida-longa-greeting-svg-1.svg";
import DevelopedByImperial from "../../assets/images/developed-by-svg-1.svg";
import styles from './uploadPic.module.css';


function UploadPic() {
  const [file, setFile] = useState(null);
  const [token, setToken] = useState(''); // insira o token de autorização aqui



  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  }
  const { getSessionUser, setSessionUser } = useLoginController();
  const [formData, setFormData] = useState({});
  const user = getSessionUser();

  if (!user || !user.user) {
    console.error("user not found");
    return null;
  }


  const handleDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('photo', file);

    axios.post('https://api-imperial.azurewebsites.net/auth/photo', formData, {
      headers: {
        Authorization: `${user.token}`,
      },

    })
      .then((response) => {
        navigate('/profile');
      })
      .catch((error) => {
      });

  };

  return (
    <div className={styles.UploadPicContainer}>
      <form onSubmit={handleSubmit}>
        <Dropzone onDrop={handleDrop}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} >
              <input {...getInputProps()} />
              {file ? <p>{file.name}</p> : <p>Arraste e solte uma imagem aqui ou clique para selecionar um arquivo</p>}
            </div>
          )}
        </Dropzone>
        <br />
        <button type="submit" className={styles.sendButton}>Enviar</button>
      </form>
      <footer className={styles.logoFooter}>
        <Link href="/contact-us">
          <img src={GreetingImperial} className={`${styles.GreetingImperial} ${styles.greeting}`} id='greeting' alt="imagem contendo a saudação '#vidalonga" />
        </Link>

        <a href="https://github.com/a-a-a-imperial">
          <img src={DevelopedByImperial} className={styles.DevelopedByImperial} alt="imagem contendo 'developed by imperial'" id='contact' />
        </a>
      </footer>

    </div>
  );
}

export default UploadPic;
