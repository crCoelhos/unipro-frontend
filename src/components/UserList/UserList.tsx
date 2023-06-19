import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./UserList.module.css";
import { Button, Table } from "react-bootstrap";
import { User } from "../../types";

const url = process.env.REACT_APP_SERVER_URL;
  const serverSideAccessToken = process.env.REACT_APP_ACCESS_TOKEN;
  

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const dataFromStorage = sessionStorage.getItem("user");
    let token = "";

    const fetchData = async () => {
      try {
        if (dataFromStorage) {
          const parsedData = JSON.parse(dataFromStorage);
          token = parsedData.token;
        }

        const response = await axios.get<User[]>(`${url}admin/user/`, {
          headers: { Authorization: token },
        });

        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    const dataFromStorage = sessionStorage.getItem("user");
    let token = "";

    let confirmation = window.confirm("Deletar usuario?");

    if (confirmation === true) {
      try {
        if (dataFromStorage) {
          const parsedData = JSON.parse(dataFromStorage);
          token = parsedData.token;
        }

        await axios.delete(`${url}admin/user/${id}`, {
          headers: { Authorization: token },
        });
        setUsers(users.filter((user) => user.id !== id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleEdit = async (id: number) => {
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
            <th>Email</th>
            <th>Atlética</th>
            <th>Role</th>
            <th>Ação</th>
          </tr>
        </thead>
        {users.map((user) => (
          <tbody key={user.id}>
            <tr>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              {user.athletic?.name
                ? <td>{user.athletic?.name} </td>
                : <td>Não associado</td>
              }
              
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
