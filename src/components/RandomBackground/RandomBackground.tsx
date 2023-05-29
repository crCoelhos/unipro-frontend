import React, { useEffect } from 'react';
import ImperialGeral1 from "../../assets/images/imperial-teste.jpg";
import ImperialGeral2 from "../../assets/images/imperial-teste-2.jpg";
import ImperialGeral3 from "../../assets/images/imperial-teste-3.jpg";
import ImperialGeral4 from "../../assets/images/imperial-teste-4.jpg";
import ImperialGeral5 from "../../assets/images/imperial-teste-5.jpg";
import ImperialGeral6 from "../../assets/images/imperial-teste-6.jpg";
import styles from './RandomBackground.module.css';

const images = [ImperialGeral1, ImperialGeral2, ImperialGeral3, ImperialGeral4, ImperialGeral5, ImperialGeral6];

function changeImg() {
  let randomized = null;
  do {
    randomized = images[Math.floor(Math.random() * images.length)];
  } while (randomized === (document.getElementById('backgroundContent') as HTMLDivElement).style.backgroundImage);
  const background = document.getElementById('backgroundContent') as HTMLDivElement;
  background.style.backgroundImage = `url(${randomized})`;
}

const RandomBackground: React.FC = () => {

  useEffect(() => {
    changeImg();
  }, []);

  return (
    <div className={styles.backgroundContent} id="backgroundContent"></div>
  );
};

export default RandomBackground;