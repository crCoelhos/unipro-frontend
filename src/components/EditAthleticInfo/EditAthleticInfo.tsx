import React, { FC, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Athletic } from "../../types";
import Button from "react-bootstrap/esm/Button";
import { Form } from "react-bootstrap";
import styles from "./EditAthleticInfo.module.css";
import axios from "axios";

const url = process.env.REACT_APP_SERVER_URL;
const serverSideAccessToken = process.env.REACT_APP_ACCESS_TOKEN;

interface EditAthleticInfoProps {
  show: boolean;
  onHide: () => void;
  athletic: Athletic | null;
}

const dataFromStorage = sessionStorage.getItem("user");
let token = "";
let userName = "";
if (dataFromStorage) {
  const parsedData = JSON.parse(dataFromStorage);
  token = parsedData.token;
  userName = parsedData.name;
}

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
    Authorization: token,
    Access: serverSideAccessToken,
  },
};

const EditAthleticInfo: FC<EditAthleticInfoProps> = ({
  show,
  onHide,
  athletic,
}) => {
  const initialFormData: Athletic = {
    id: undefined,
    name: "",
    college_course: {}, // Inicialmente vazio, pois você vai preencher com os dados da API
    direction: "",
    img_url: "",
    createdAt: "",
    updatedAt: "",
  };

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [formData, setFormData] = useState<Athletic>(initialFormData);
  React.useEffect(() => {
    // Aqui, você pode buscar os dados da API e definir o estado formData com os dados recebidos
    if (athletic) {
      setFormData({
        id: athletic.id,
        name: athletic.name,
        college_course: athletic.college_course,
        direction: athletic.direction,
        img_url: athletic.img_url,
        createdAt: athletic.createdAt,
        updatedAt: athletic.updatedAt,
      });
    }
  }, [athletic]);
  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${url}athletics/${athletic?.id}`,
        formData,
        {
          headers: { Authorization: token, Access: serverSideAccessToken },
        }
      );

      if (response.status === 200) {
        setFormData({ ...formData, ...response.data });

        onHide();
      } else {
        console.error("Falha ao atualizar a atlética");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedImage(file);
      handleUpload(file); // Envie o arquivo imediatamente
    }
  };
  const handleUpload = async (file: File) => {
    if (file) {
      const formData = new FormData();
      formData.append("athletic", file);

      try {
        await axios.post(
          url + `auth/photoathletic/${athletic?.id}`,
          formData,
          config
        );
      } catch (error) {
        console.error("image: ", error);
      }
    }
  };

  if (!athletic) {
    return null;
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Atlética</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Nome
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="college_course" className="form-label">
              Curso
            </label>
            {Object.keys(formData.college_course).map((key) => (
              <input
                key={key}
                type="text"
                className="form-control"
                id={key}
                name={key}
                value={formData.college_course[key]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    college_course: {
                      ...formData.college_course,
                      [key]: e.target.value,
                    },
                  })
                }
              />
            ))}
          </div>

          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Presidente
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.direction}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  direction: e.target.value,
                })
              }
            />
          </div>

          <Form.Group>
            <Form.Label>Selecione ou arraste o documento de imagem:</Form.Label>
            <div className={styles.DropFileContainer}>
              <Form.Control
                type="file"
                className={styles.DropArea}
                onChange={handleImageChange}
                id="imageInput"
              />
              <Button variant={selectedImage ? "success" : "danger"} disabled>
                {"    "}
              </Button>
            </div>
            {selectedImage && (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected"
                className={styles.ImgArea}
              />
            )}
          </Form.Group>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={onHide}>
          Fechar
        </button>
        <button className="btn btn-primary" onClick={handleSave}>
          Salvar Alterações
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditAthleticInfo;
