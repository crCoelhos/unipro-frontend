import React from "react";
import styles from "./Home.module.css";
import Menu from "../../components/Menu/Menu";
import HomeComposedFooter from "../../components/homeComposedFooter/homeComposedFooter";
import AltSideBar from "../../components/AltSideBar/AltSideBar";

const Home: React.FC = () => {
  return (
    <div className={styles.homeContent}>
      <Menu />

      <h1>teste</h1>
      <h3>jorge</h3>

      <div>
        <p>
          A noite passa devagar Estou aqui deitado só No tique-taque do relógio
          Me aqueço com o seu lençol
        </p>
        <br />
        <br />
        <p>
          Gostaria de saber onde você está Hoje à noite você não vai acabar
          sozinha
        </p>
        <br />
        <br />
        <p>
          Amor, eu sempre estive sozinha Eu nunca me importei até lhe conhecer E
          agora você me escolhe Como deixá-lo sozinho? Como deixá-lo sozinho?
        </p>
        <br />
        <br />
        <p>
          Você não sabe o quanto eu quis Te abraçar, tocar seus lábios Beijar,
          amar você Não sabe o quanto eu esperei Dormir com você hoje à noite
        </p>
        <br />
        <br />
        <p>Mas o segredo ainda está comigo O meu amor por você é demais</p>
        <br />
        <br />
        <p>
          Iê, oh, oh Amor, eu sempre estive sozinha Eu nunca me importei até lhe
          conhecer E agora você me escolhe Como deixá-lo sozinho? Como deixá-lo
          sozinho, amor?
        </p>
        <br />
        <br />
        <p>Como deixá-lo sozinho? Como deixá-lo sozinho? Oh, oh, amor, amor</p>
        <br />
        <br />
        <p>
          Não sabe o quanto eu esperei Dormir com você hoje à noite (Te amo!)
        </p>
      </div>

      <HomeComposedFooter />
    </div>
  );
};

export default Home;
