import React, { useState } from 'react';
import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom';

import { formatToDate, formatToCPF} from 'brazilian-values';

import styles from "./Profile.module.css"
import Header from "../../components/Header/Header"
import DevelopedByImperial from "../../assets/images/developed-by-svg-1.svg";
import backToPage from "../../assets/icons/back-to-page-red.svg";
import EditProfile from "../../assets/icons/mdi_document.svg";
import noPic from "../../assets/images/no-image.png";
import useLoginController from '../../controllers/LoginController';

import { UserData } from '../../interfaces/types';

function Profile() {

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  }
  const { getSessionUser, setSessionUser } = useLoginController();
  const [formData, setFormData] = useState({});
  const user = getSessionUser();

  if (!user || !user.user) {
    console.alert("user not found");
    return null;
  }

  const birthdateString = user.user.birthdate;
  const [year, month, day] = birthdateString.split('-').map(Number);
  const oldBirthdate = new Date(year, month - 1, day); 
  const birthdate = formatToDate(oldBirthdate);

  const cpf = formatToCPF(user.user.cpf);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const updatedUserData = { ...user.user, ...formData };
    setSessionUser({ ...user, user: updatedUserData });
  };

  const handleInputChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    setFormData((prevFormData) => ({ ...prevFormData, [fieldName]: fieldValue }));
  };

  return (
    <div className={styles.content}>
      <Header />

      <p className={styles.profileText}>Perfil</p>
      <div>
        <Link >
          <img src={backToPage} className={styles.backPage} onClick={goBack} alt='seta apontando para a esquerda' />
        </Link>
      </div>
      <form onSubmit={handleFormSubmit}>
        <Link to="/upload-pic">
          {/* porcamente */}
          <img src={EditProfile} className={styles.editPhoto} alt='icone sinalizando modificar foto' />
        </Link>
        <label className={styles.photoLabel}>
          {user.user.photo ? (
            <img className={styles.profilePic} alt="Profile" src={`https://api-imperial.azurewebsites.net/uploads/`+user.user.photo} />
          ) : (
            <img className={styles.profilePic} alt="Profile" src={noPic} />
          )}
        </label>
        <label>
          Nome:
          <input type="text" name="name" value={formData.name || user.user.name} onChange={handleInputChange} disabled />
        </label>
        <label>
          CPF:
          <input type="text" name="cpf" value={formData.cpf || cpf} onChange={handleInputChange} disabled />
        </label>
        <label>
          Data de Nascimento:
          <input type="text" name="birthdate" value={formData.birthdate || birthdate} onChange={handleInputChange} disabled />
        </label>
        <label>
          Instituição:
          <input type="text" name="university" value={formData.university || user.user.university} onChange={handleInputChange} disabled />
        </label>
        <label>
          Curso:
          <input type="text" name="course" value={formData.course || user.user.course} onChange={handleInputChange} disabled />
        </label>
        <label>
          Contato:
          <input type="text" name="contact" value={formData.contact || user.user.contact} onChange={handleInputChange} disabled />
        </label>
        <button className={styles.saveButton} type="submit" disabled>Salvar</button>
      </form>
      <a href="#22" className={styles.DevelopedByImperialLink}>
        <img src={DevelopedByImperial} className={styles.DevelopedByImperial} alt="contate-nos" id='contact' />
      </a>
    </div>
  );
}

export default Profile;
