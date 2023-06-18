import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { User } from "../../types";
import { config } from "process";

const url = "http://localhost:3003";

const UserProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [updatedUser, setUpdatedUser] = useState<User | null>(null);
  const dataFromStorage = sessionStorage.getItem("user");
  let token = "";
  let userEmail = "";
  if (dataFromStorage) {
    const parsedData = JSON.parse(dataFromStorage);
    token = parsedData.token;
    userEmail = parsedData.email;
  }

  const config = {
    headers: {
      Authorization: token,
      Access: "123",
    },
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${url}/admin/useremail/${userEmail}`,
          config
        );
        const userData = response.data[0];
        setUser(userData);
        setUpdatedUser(userData);

        console.log("leticia: ", userData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUpdatedUser((prevUser) => {
      if (prevUser) {
        return {
          ...prevUser,
          [id]: value,
        };
      }
      return null;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (user && updatedUser) {
        const response = await axios.put(
          `${url}/admin/user/${user.id}`,
          updatedUser,
          config
        );
        console.log("Usuário atualizado:", response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        {user && (
          <>
            <Form.Group controlId="name">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                value={updatedUser?.name || ""}
                onChange={handleInputChange}
                readOnly
              />
            </Form.Group>

            <Form.Group controlId="birthdate">
              <Form.Label>Data de nascimento</Form.Label>
              <Form.Control
                type="text"
                value={updatedUser?.birthdate || ""}
                onChange={handleInputChange}
                readOnly
              />
            </Form.Group>

            <Form.Group controlId="sex">
              <Form.Label>Sexo</Form.Label>
              <Form.Control
                type="text"
                value={updatedUser?.sex || ""}
                onChange={handleInputChange}
                readOnly
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={updatedUser?.email || ""}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="contact">
              <Form.Label>Contato</Form.Label>
              <Form.Control
                type="text"
                value={updatedUser?.contact || ""}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="cpf">
              <Form.Label>CPF</Form.Label>
              <Form.Control
                type="text"
                value={updatedUser?.cpf || ""}
                readOnly
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Alterar
            </Button>
          </>
        )}
      </Form>
    </div>
  );
};

export default UserProfilePage;
