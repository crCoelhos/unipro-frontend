import React from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import useSignupController from '../../controllers/useSignupController';
import styles from './SignupPage.module.css'

const SignupPage = () => {
  const {
    name,
    email,
    password,
    contact,
    cpf,
    birthdate,
    signupError,
    setName,
    setEmail,
    setPassword,
    setContact,
    setCpf,
    setBirthdate,
    handleSubmit,
  } = useSignupController();

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
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
              onChange={(e) => setContact(e.target.value)} 
              required
            />
          </Form.Group>

          <Form.Group controlId="formCPF">
            <Form.Label>CPF</Form.Label>
            <Form.Control
              type="text"
              placeholder="ex: 12345678911"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)} 
              required
            />
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

          <Button variant="primary" type="submit" className={styles.SubmitButton}>
            Registrar
          </Button>

          <Button variant="outline-warning" type="submit" className={styles.SubmitButton}>
            Voltar
          </Button>
        </Form>

        {signupError && <Alert variant="danger">O registro falhou. Por favor tente novamente.</Alert>}
      </div>
    </div>
  );
};

export default SignupPage;
