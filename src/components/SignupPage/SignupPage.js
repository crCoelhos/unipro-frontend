import React from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import useSignupController from '../../controllers/useSignupController';

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
    <div>
      <h2>Signup</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formContact">
          <Form.Label>Contact</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formCPF">
          <Form.Label>CPF</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBirthdate">
          <Form.Label>Birthdate</Form.Label>
          <Form.Control
            type="date"
            placeholder="Enter birthdate"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Signup
        </Button>
      </Form>

      {signupError && <Alert variant="danger">Signup failed. Please try again.</Alert>}
    </div>
  );
};

export default SignupPage;
