import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import styles from "./UserList.module.css";
import { Button, Table } from "react-bootstrap";

interface User {
  id: number;
  name: string;
  birthdate: string;
  sex: string;
  email: string;
  contact: string;
  cpf: string;
  roleId: number;
  createdAt: string;
  updatedAt: string;
  role: {
    name: string;
  };
}

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const dataFromStorage = sessionStorage.getItem("user");
    let token = "";

    if (dataFromStorage) {
      const parsedData = JSON.parse(dataFromStorage);
      token = parsedData.token;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get<User[]>(
          "http://localhost:3003/admin/user/",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3003/user/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      console.log("User deletado");
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (id: number) => {
    // Aqui você pode implementar a lógica para redirecionar para a página de edição do usuário com o ID fornecido.
    console.log(`Editar user de ID: ${id}`);
  };

  return (
    <div className={styles.UserList}>
      <h1>Usuários registrados</h1>
      <hr />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Role</th>
            <th>Ação</th>
          </tr>
        </thead>
        {users.map((user) => (
          <tbody>
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.role.name}</td>
              <td>
                <Button
                  variant="warning"
                  className={styles.ActionButton}
                  onClick={() => handleEdit(user.id)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  className={styles.ActionButton}
                  onClick={() => handleDelete(user.id)}
                >
                  Excluir
                </Button>
              </td>
            </tr>
          </tbody>
        ))}
      </Table>
    </div>
  );
};

UserList.propTypes = {};

UserList.defaultProps = {};

export default UserList;
