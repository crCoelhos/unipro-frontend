import React from "react";
import { useParams } from "react-router-dom";
import { publicationsMockData } from "../../components/HomePublications/mockfile";

interface Publication {
  id: number;
  title: string;
  headline: string;
  publicationDate: string;
  author: string;
}

const PublicationDetailsPage = () => {
  const { id } = useParams<{ id?: string }>();
  const publicationId = id ? parseInt(id, 10) : undefined;

  const publication = publicationId
    ? publicationsMockData.find((pub) => pub.id === publicationId)
    : undefined;

  if (!publication) {
    return <div>Publication not found</div>;
  }

  return (
    <div>
      <h2>{publication.title}</h2>
      <p>{publication.headline}</p>
      <p>
        <strong>Published on:</strong> {publication.publicationDate}
      </p>
      <p>
        <strong>Author:</strong> {publication.author}
      </p>
    </div>
  );
};
export default PublicationDetailsPage;
