import React, { FC, useEffect, useState } from "react";
import styles from "./CouponList.module.css";
import { Button, Container, Table } from "react-bootstrap";
import { Coupon, CouponsResponse } from "../../types";
import axios from "axios";
import EditAthleticInfo from "../EditAthleticInfo/EditAthleticInfo";
import { server } from "websocket";
import format from "date-fns/format";

const url = process.env.REACT_APP_SERVER_URL;
const serverSideAccessToken = process.env.REACT_APP_ACCESS_TOKEN;

const dataFromStorage = sessionStorage.getItem("user");
let token = "";

if (dataFromStorage) {
  const parsedData = JSON.parse(dataFromStorage);
  token = parsedData.token;
}

const headers = {
  headers: { Authorization: token, Access: serverSideAccessToken },
};

const CouponList: FC = () => {
  // const [coupons, setCoupons] = useState<CouponsResponse>({
  //   coupons: [],
  // });
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const [coupons, setCoupons] = useState<Coupon[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Coupon[]>(
          `${url}admin/coupons`,
          headers
        );
        console.log(response.data);

        // Defina diretamente a lista de cupons no estado
        setCoupons(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    let confirmation = window.confirm("Deletar cupom?");

    if (confirmation === true) {
      try {
        await axios.delete(`${url}admin/coupons/${id}`, headers);
        const updatedCoupons = coupons.filter(
          (coupon: any) => coupon.id !== id
        );
        setCoupons(updatedCoupons);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleEdit = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setShowEditModal(true);
  };

  return (
    <div className={styles.CouponList}>
      <Container>
        <h1>Cupons registrados</h1>
        <hr />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Codigo</th>
              <th>Tipo</th>
              <th>Status</th>
              <th>Valor do cupom</th>
              <th>Total de cupons</th>
              <th>Data de validade</th>
              <th>Data de criação</th>
              <th>Uso unico?</th>
            </tr>
          </thead>
          <tbody>
            {coupons.length > 0 ? (
              coupons.map((coupon: any) => (
                <tr key={coupon.id}>
                  <td>{coupon.code}</td>
                  <td>{coupon.type}</td>
                  <td>{coupon.isActive ? "Ativo" : "Inativo"}</td>
                  <td>{coupon.amount}</td>
                  <td>{coupon.usageMax ?? "N/A"}</td>
                  <td>{format(new Date(coupon.expireDate), "dd/MM/yyyy")}</td>
                  <td>{format(new Date(coupon.createdAt), "dd/MM/yyyy")}</td>

                  <td>{coupon.isUniqueUse ? "Sim" : "Não"}</td>
                  <td>
                    {/* hojenão */}

                    {/* <Button
                      variant="warning"
                      className={styles.ActionButton}
                      onClick={() => handleEdit(coupon)}
                    >
                      Editar
                    </Button> */}
                    <Button
                      variant="danger"
                      className={styles.ActionButton}
                      onClick={() => coupon.id && handleDelete(coupon.id)}
                    >
                      Excluir
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8}>Nenhum cupom encontrado.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>

      {/* <EditAthleticInfo
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        coupon={editingCoupon}
      /> */}
    </div>
  );
};

export default CouponList;
