import React, { FC, useEffect, useState } from "react";
import styles from "./AthleticList.module.css";
import { Button, Container, Table } from "react-bootstrap";
import { Athletic, AthleticsResponse } from "../../types";
import axios from "axios";

const AthleticList: FC = () => {
  const [athletics, setAthletics] = useState<AthleticsResponse>({
    athletics: [],
  });


  const url = process.env.REACT_APP_SERVER_URL;
  const serverSideAccessToken = process.env.REACT_APP_ACCESS_TOKEN;

  useEffect(() => {
    const dataFromStorage = sessionStorage.getItem("user");
    let token = "";

    const fetchData = async () => {
      try {
        if (dataFromStorage) {
          const parsedData = JSON.parse(dataFromStorage);
          token = parsedData.token;
        }

        const response = await axios.get<AthleticsResponse>(
          `${url}/athletics/`,
          {
            headers: { Authorization: token },
          }
        );

        setAthletics(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const handleDelete = async (id: number) => {
    let confirmation = window.confirm("Deletar atlética?");

    if (confirmation === true)
      try {
        const dataFromStorage = sessionStorage.getItem("user");
        let token = "";

        if (dataFromStorage) {
          const parsedData = JSON.parse(dataFromStorage);
          token = parsedData.token;
        }

        await axios.delete(`${url}/athletics/${id}`, {
          headers: { Authorization: token },
        });

        const updatedAthletics = athletics.athletics.filter(
          (athletic) => athletic.id !== id
        );
        setAthletics({ athletics: updatedAthletics });
      } catch (error) {
        console.error(error);
      }
  };

  return (
    <div className={styles.AthleticList}>
      <Container>
        <h1>Atléticas registradas</h1>
        <hr />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Curso</th>
              <th>Logo</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {athletics.athletics.map((athletic) => (
              <tr key={athletic.id}>
                <td>{athletic.name}</td>
                <td>
                  <ul>
                    {Object.entries(athletic.college_course).map(
                      ([courseKey, courseValue]) => (
                        <li key={courseKey}>{courseValue}</li>
                      )
                    )}
                  </ul>
                </td>
                <td>
                  {athletic.img_url && (
                    <img src={athletic.img_url} alt={athletic.name} />
                  )}
                </td>
                <td>
                  <Button variant="warning" className={styles.ActionButton}>
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    className={styles.ActionButton}
                    onClick={() => athletic.id && handleDelete(athletic.id)}
                  >
                    Excluir
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default AthleticList;
