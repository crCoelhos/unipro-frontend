import React from "react";
import { useParams } from "react-router-dom";
import { infoCardsMockData } from "../../components/HomeInfoCards/mockfile";



const InfoCardDetails = () => {
  const { id } = useParams<{ id?: string }>();
  const infoCardId = id ? parseInt(id, 10) : undefined;

  const infoCard = infoCardsMockData.find((card) => card.id === infoCardId);

  if (!infoCard) {
    return <div>Info Card not found</div>;
  }

  return (
    <div>
      <h2>{infoCard.title}</h2>
      <p>{infoCard.description}</p>
      <p>
        <strong>Category:</strong> {infoCard.category}
      </p>
    </div>
  );
};

export default InfoCardDetails;
