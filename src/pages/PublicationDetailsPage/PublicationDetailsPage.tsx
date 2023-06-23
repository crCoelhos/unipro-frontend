import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { publicationsMockData } from "../../components/HomePublications/mockfile";
import { Publication } from "../../types";
import Menu from "../../components/Menu/Menu";
import HomeComposedFooter from "../../components/homeComposedFooter/homeComposedFooter";
import styles from "./PublicationDetailsPage.module.css";
import { Card } from "react-bootstrap";

const PublicationDetailsPage = () => {
  const { id } = useParams<{ id?: string }>();
  const publicationId = id ? parseInt(id, 10) : undefined;
  const navigate = useNavigate();

  const publication = publicationId
    ? publicationsMockData.find((pub) => pub.id === publicationId)
    : undefined;

  let cardBg;
  switch (publication?.genre) {
    case "sport":
      cardBg = "warning";
      break;
    case "cultural":
      cardBg = "success";
      break;
    case "academic":
      cardBg = "info";
      break;
    case "luto":
      cardBg = "dark";
      break;
    default:
      cardBg = "";
      break;
  }
  if (!publication) {
    return <div>Publication not found</div>;
  }

  let cardGenre;
  switch (publication?.genre) {
    case "sport":
      cardGenre = "Esporte";
      break;
    case "cultural":
      cardGenre = "Cultura";
      break;
    case "academic":
      cardGenre = "Acadêmico";
      break;
    case "luto":
      cardGenre = "";
      break;
    default:
      cardGenre = "";
      break;
  }
  if (!publication) {
    setTimeout(() => {
      navigate("/sport-events");
    }, 4000);
    return (
      <div className={styles.PublicationNotFound}>
        Publicação não encontrada, você será redirecionado em breve.
      </div>
    );
  }
  return (
    <div>
      <Menu />
      <div className={styles.PublicationDetailsPageContent}>
        <Card
          bg={cardBg}
          text="white"
          className={styles.PublicationDetailsCard}
        >
          <Card.Body>
            <Card.Header>{cardGenre}</Card.Header>

            <Card.Title className={styles.PublicationDetailCardTitle}>
              {publication.title}
            </Card.Title>
            <Card.Text>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis
              sit itaque laborum modi consequuntur commodi quidem excepturi
              reprehenderit. Sed mollitia doloremque corrupti dignissimos ipsum
              cum dolore odit soluta hic inventore. Lorem ipsum dolor sit amet
              consectetur, adipisicing elit. Saepe natus provident illo eveniet,
              officiis beatae fugit recusandae blanditiis velit vitae, rerum non
              nam ullam obcaecati autem dolore veritatis impedit iste. Nobis
              facilis quos ex sint! Veniam reiciendis error natus vel cupiditate
              vero neque voluptates commodi soluta asperiores veritatis atque ea
              deserunt culpa voluptatibus, quibusdam inventore quisquam
              exercitationem magni at delectus. Porro, minima aperiam id
              laboriosam placeat quas dolor nisi nesciunt esse praesentium.
              Magnam repellendus vero sed, delectus corporis cupiditate. Minima,
              iusto dolorem! Esse quod, libero aspernatur adipisci asperiores
              sapiente ullam. Atque doloremque esse, sunt mollitia officia
              ratione excepturi voluptate enim pariatur, nemo nisi optio soluta,
              rem facilis perspiciatis voluptatibus! Eligendi, expedita cumque!
              Autem exercitationem repellendus eveniet soluta ipsum cumque
              accusamus! Porro minima eveniet assumenda aliquam, provident quod
              culpa, placeat blanditiis aliquid voluptatem quia quaerat quae
              molestias dolorem, commodi dolor qui magni numquam atque tempore
              fugit at sit! Reiciendis, omnis explicabo? Esse asperiores fugit
              obcaecati tenetur sunt possimus deleniti blanditiis libero,
              eveniet autem ipsa, ut culpa consequatur. Illum voluptas repellat
              aliquid qui debitis quam, eius quisquam animi similique
              accusantium iure nobis. Nihil quos laboriosam corrupti minus modi.
              Ullam pariatur nesciunt officiis dolorem in suscipit quisquam
              ducimus dolores error. Earum recusandae deleniti nam, aspernatur
              laborum quos id quas, necessitatibus, sequi dolorem dignissimos.
              Inventore dolor unde vel necessitatibus magni est quis facere,
              veniam tenetur earum ullam voluptatum quasi ipsam pariatur maxime
              ducimus cupiditate delectus commodi sint! Molestias ex saepe
              fugiat laboriosam voluptatum expedita? Reprehenderit accusantium
              minus earum eius, omnis in ipsa dignissimos tempore ad
              perspiciatis, dolore fugit cum ipsam veritatis, non at iure
              doloremque? Eos, debitis ab! Itaque nam cumque delectus veniam
              quas? Atque earum quasi nesciunt optio eveniet vero itaque,
              excepturi totam ut eius, eligendi unde magni cum esse odio ea
              deleniti. Expedita nisi asperiores animi possimus ad voluptatem
              molestiae voluptate nemo! Voluptatem odit natus dicta! Cupiditate
              quis iure iusto perspiciatis repudiandae aliquid esse iste veniam,
              reprehenderit tempore ex delectus sapiente! Repellendus sit in
              voluptatibus, aspernatur sunt ab deserunt itaque? Enim, nulla.
              Debitis ab doloremque provident hic labore nulla ut mollitia neque
              vero? Voluptatum necessitatibus cumque suscipit quibusdam, natus
              cupiditate neque, fugit dolor iusto doloremque nam ducimus fugiat
              ipsam et nobis eos. Quaerat nobis velit perspiciatis corporis eos,
              architecto quibusdam obcaecati unde odio enim exercitationem,
              magni nostrum facilis. Dolorum maiores minima, facilis quibusdam
              error quo, obcaecati dolorem provident quis ad animi explicabo!
              Vel incidunt veniam obcaecati maxime, debitis consequatur
              voluptatum quis! Sint ut est animi nulla. Distinctio ex saepe quia
              quo officiis non facilis, earum eligendi itaque, totam et voluptas
              tempore odit. Quibusdam dolores numquam sunt veniam impedit
              quisquam modi quaerat voluptatum quod incidunt expedita voluptates
              id laboriosam quasi, similique eaque unde, nisi, aliquid
              cupiditate quae amet molestiae consectetur ullam maxime. Eligendi!
              Laborum maxime blanditiis cumque dolor, nobis quibusdam sequi quam
              consequatur vel commodi quia perferendis aut accusantium aliquam
              ut doloremque amet vitae error quisquam cupiditate! Aliquam dolor
              at illum corporis error? Officia commodi harum ad. Totam culpa
              repudiandae impedit vel delectus, ipsum officiis eos sunt
              laudantium natus accusamus quaerat facere consequatur inventore
              nesciunt voluptatibus rerum optio. Fuga aliquid animi culpa quae.
              Voluptatum velit maxime mollitia, ad fugit praesentium
              accusantium. Dolore harum placeat iste non ratione pariatur beatae
              autem odio! Vero quia enim, incidunt pariatur voluptatem aliquam
              sunt reprehenderit minus sed dolorem. Accusamus quas voluptas
              pariatur? Distinctio culpa iste odio, doloribus quam ipsa sint
              eius, quis explicabo velit vero rerum impedit dolorem? Corporis
              eveniet ipsum odio quam aut ducimus optio minus quibusdam. Est
              magni accusamus minima ad fugit, atque officia totam cum itaque!
              Earum voluptatem aliquid hic asperiores similique, debitis aut.
              Voluptates beatae modi numquam dolorem? Labore magni asperiores
              ullam rerum eaque! Earum eligendi fugiat soluta eaque tempora
              magni voluptatum ipsa commodi facilis fugit voluptas dolorem neque
              doloribus quod ratione distinctio quae ducimus, deserunt ea vitae
              dolores odit nemo quaerat! Pariatur, vero? Temporibus veritatis =
            </Card.Text>
          </Card.Body>
          <footer className={styles.PublicationCardMetaData}>
            <span>
              Autor:
              <span className={styles.PublicationCardAuthor}>
                {" "}
                {publication.author}
              </span>
            </span>
            <span>
              Publicado em:
              <span className={styles.PublicationCardPublicationdDate}>
                {publication.publicationDate}
              </span>
            </span>
          </footer>
        </Card>
      </div>
      <HomeComposedFooter />
    </div>
  );
};
export default PublicationDetailsPage;
