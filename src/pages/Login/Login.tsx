import React from "react";
import { Form } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import useLoginController from "../../controllers/LoginController";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import LoginCarousel from "../../components/LoginCarousel/LoginCarousel";
import LoginErrorToast from "../../components/LoginErrorToast/LoginErrorToast";
import LoginSuccessToast from "../../components/LoginSuccessToast/LoginSuccessToast";

const LoginPage: React.FC = () => {
  const {
    username,
    password,
    handleUsernameChange,
    handlePasswordChange,
    handleSubmit,
    loginError,
    loggedIn,
    loginErrorPasswordOrUser,
  } = useLoginController();

  const location = useLocation();
  const navigate = useNavigate();
  if (loggedIn) {
    if (location.state) {
      navigate(location.state.url, { state: location.state });
    } else {
      navigate("/home");
    }
  }

  return (
    <div className={styles.loginContent}>
      <Container fluid>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col xl={6} xll={6} md={12} sm={12} xs={12}>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <div className="mb-3">
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3">
                        <Form.Label className={styles["text-center"]}>
                          Insira seu CPF ou EMAIL
                        </Form.Label>
                        <Form.Control
                          className={styles.inputFieldUser}
                          type="text"
                          value={username}
                          onChange={handleUsernameChange}
                          placeholder="Ex: 12345678910 ou usuario@email.com"
                          required
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control
                          className={styles.inputFieldPassword}
                          id="userInput"
                          type="password"
                          value={password}
                          onChange={handlePasswordChange}
                          required
                        />
                      </Form.Group>
                      {loginErrorPasswordOrUser && <LoginErrorToast />}
                      <Form.Group className="mb-3">
                        <p className="small">
                          <a className="text-primary" href="#!">
                            Não consegue entrar?
                          </a>
                        </p>
                      </Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Entrar
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Não possui conta?{" "}
                        <Link to="/signup" className="text-primary fw-bold">
                          Crie uma
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
            {loggedIn && <LoginSuccessToast />}
            {loginErrorPasswordOrUser ? <LoginErrorToast /> : <></>}
          </Col>
          <Col md={12} xl={6} sm={6} xs={6}>
            <LoginCarousel />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;
