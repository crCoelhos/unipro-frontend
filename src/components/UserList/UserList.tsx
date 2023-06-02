import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import styles from "./UserList.module.css";

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
      <h1>UserList Component</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}
            <button onClick={() => handleEdit(user.id)}>Editar</button>
            <button onClick={() => handleDelete(user.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

UserList.propTypes = {};

UserList.defaultProps = {};

export default UserList;
