import React, { useState } from 'react';
import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom';
import useLoginController from '../../../controllers/LoginController.js';
import LogoImperial from "../../assets/images/logoimperial-svg 1.svg";
import noPic from "../../assets/images/no-image.png";
import backToPage from "../../assets/icons/back-to-page-white.svg";
import GreetingImperial from "../../assets/images/vida-longa-greeting-svg-2-white.svg";
import styles from "./MemberCard.module.css"

import { formatToDate, formatToCPF } from 'brazilian-values';



function MemberCardPage() {

  const { getSessionUser, setSessionUser } = useLoginController();
  const [formData, setFormData] = useState({});
  const user = getSessionUser();

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  }

  if (!user || !user.user) {
    console.alert("user not found");
    return null;
  }

  const birthdateString = user.user.birthdate;
  const [year, month, day] = birthdateString.split('-').map(Number);
  const oldBirthdate = new Date(year, month - 1, day);
  const birthdate = formatToDate(oldBirthdate);

  const cpf = formatToCPF(user.user.cpf);

  // const handleFormSubmit = (event) => {
  //   event.preventDefault();
  //   const updatedUserData = { ...user.user, ...formData };
  //   setSessionUser({ ...user, user: updatedUserData });
  // };

  // const handleInputChange = (event) => {
  //   const fieldName = event.target.name;
  //   const fieldValue = event.target.value;
  //   setFormData((prevFormData) => ({ ...prevFormData, [fieldName]: fieldValue }));
  // };

  return (
    <div className={styles.content}>
      <Link to="/home">
        <img src={LogoImperial} className={styles.logoImperial} alt="logo da imperial" />
      </Link>

      <p className={styles.memberCardText}>CARTEIRA</p>
      <p className={styles.memberCardText2}>DIGITAL</p>
      <div>
        <Link >
          <img src={backToPage} className={styles.backPage} onClick={goBack} alt='seta para a esquerda significando voltar pagina' />
        </Link>
      </div>
      <div className={styles.MemberCard} >
        <label className={styles.photoLabel}>
          {user.user.photo ? (
            <img className={styles.profilePic} alt="Profile" src={`https://api-imperial.azurewebsites.net/uploads/`+user.user.photo} />
          ) : (
            <img className={styles.profilePic} style={{ width: "128px" }} alt="Profile" src={noPic} />
          )}
        </label>
        <label>
          Nome:
          <p className={styles.memberData}>{user.user.name}</p>
        </label>
        <label>
          CPF:
          <p className={styles.memberData}>{cpf}</p>
        </label>
        <label>
          Data de Nascimento:
          <p className={styles.memberData}>{birthdate}</p>
        </label>
        <label>
          Instituição:
          <p className={styles.memberData}>{user.user.university}</p>
        </label>
        <label>
          Curso:
          <p className={styles.memberData}>{user.user.course}</p>
        </label>
        <label>
          Contato:
          <p className={styles.memberData}>{user.user.contact}</p>
        </label>
      </div>
      <footer>
        <Link to="/contact-us">
          <img src={GreetingImperial} className={`${styles.GreetingImperial} ${styles.greeting}`} id='greeting' alt="" />
        </Link>
      </footer>
    </div>
  );
}

export default MemberCardPage;