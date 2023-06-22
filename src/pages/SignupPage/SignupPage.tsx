import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import useSignupController from "../../controllers/useSignupController";
import styles from "./SignupPage.module.css";

const SignupPage = () => {
  const [cpfError, setCpfError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const {
    name,
    email,
    password,
    contact,
    cpf,
    birthdate,
    sex,
    signupError,
    setName,
    setEmail,
    setPassword,
    setContact,
    setCpf,
    setBirthdate,
    setSex,
    handleSubmit,
  } = useSignupController();

  const validateCPF = () => {
    // Função para validar o CPF
    const isValid = validateCPFNumber(cpf);
    setCpfError(!isValid);
  };

  const validateCPFNumber = (cpfNumber: string) => {
    // Função para validar o número do CPF
    const cpfDigits = cpfNumber.replace(/[^\d]+/g, "");

    if (cpfDigits.length !== 11 || /^(\d)\1+$/.test(cpfDigits)) {
      return false;
    }

    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
      sum = sum + parseInt(cpfDigits.substring(i - 1, i)) * (11 - i);
    }

    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }

    if (remainder !== parseInt(cpfDigits.substring(9, 10))) {
      return false;
    }

    sum = 0;

    for (let i = 1; i <= 10; i++) {
      sum = sum + parseInt(cpfDigits.substring(i - 1, i)) * (12 - i);
    }

    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }

    if (remainder !== parseInt(cpfDigits.substring(10, 11))) {
      return false;
    }

    return true;
  };


  const validatePhone = () => {
    const phonelength = contact.length;
    if (phonelength === 11) {
      setPhoneError(false);
    } else {
      setPhoneError(true);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div>
        <h2>UNIPRODUÇÕES</h2>
        <Form onSubmit={handleSubmit} className={styles.signupForm}>
          <Form.Group controlId="formName">
            <Form.Label>Nome completo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ex: Rogerio Jorge"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="ex: rogerio@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              placeholder="Insira sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formContact">
            <Form.Label>Telefone para contato</Form.Label>
            <Form.Control
              type="text"
              placeholder="ex: 6899999999"
              value={contact}
              onChange={(e) => {
                setContact(e.target.value);
                setPhoneError(false);
              }}
              onBlur={validatePhone}
              required
            />
            {phoneError && <Alert variant="danger">Telefone inválido!</Alert>}
          </Form.Group>

          <Form.Group controlId="formCPF">
            <Form.Label>CPF</Form.Label>
            <Form.Control
              type="text"
              placeholder="ex: 12345678911"
              value={cpf}
              onChange={(e) => {
                setCpf(e.target.value);
                setCpfError(false); // Limpar o erro ao digitar
              }}
              onBlur={validateCPF} // Validar o CPF ao perder o foco
              required
            />
            {cpfError && <Alert variant="danger" className={styles.FieldValidationAlerts}>CPF inválido!</Alert>}
          </Form.Group>

          <Form.Group controlId="formBirthdate">
            <Form.Label>Data de nascimento</Form.Label>
            <Form.Control
              type="date"
              placeholder="ex:1999-01-01"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formSex">
            <Form.Label>Sexo</Form.Label>
            <Form.Control
              as="select"
              value={sex}
              onChange={(e) => setSex(e.target.value)}
              required
            >
              <option value="">Selecione</option>
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
            </Form.Control>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className={styles.SubmitButton}
          >
            Registrar
          </Button>

          <Button
            variant="outline-warning"
            href="/login"
            className={styles.SubmitButton}
          >
            Voltar
          </Button>
        </Form>

        {signupError && (
          <Alert variant="danger">
            O registro falhou. Por favor, tente novamente.
          </Alert>
        )}
      </div>
    </div>
  );
};

export default SignupPage;
