import React from 'react';
import PropTypes from 'prop-types';
import styles from './LoginCarousel.module.css';
import { Carousel } from 'react-bootstrap';

import sh1 from '../../assets/images/show1.jpg'
import sh2 from '../../assets/images/show2.jpg'
import sh3 from '../../assets/images/show3.jpg'
import sh4 from '../../assets/images/show4.jpg'
import sh5 from '../../assets/images/show5.jpg'

const LoginCarousel = () => (
  <div className={styles.LoginCarousel}>
    <Carousel fade interval={2000}>
      <Carousel.Item>
        <img src={sh1} alt="" className="d-block w-100" />
        <Carousel.Caption>
          <h3>Exemplo de titulo</h3>
          <p>Carícias e declarações de amor. De testemunha o nosso cobertor</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img src={sh2} alt="" className="d-block w-100" />
        <Carousel.Caption>
          <h3>Exemplo de titulo</h3>
          <p>Minha cama esta tão fria sem você, baby</p>
        </Carousel.Caption>
      </Carousel.Item>
      
      <Carousel.Item>
        <img src={sh3} alt="" className="d-block w-100" />
        <Carousel.Caption>
          <h3>Exemplo de titulo</h3>
          <p>Meu corpo já não sabe o que é prazer. Que vontade, de ver você</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img src={sh4} alt="" className="d-block w-100" />
        <Carousel.Caption>
          <h3>Exemplo de titulo</h3>
          <p>Nossa foto sobre a mesa. E eu não resisti. Vou sair, te ver agora</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img src={sh5} alt="" className="d-block w-100" />
        <Carousel.Caption>
          <h3>Exemplo de titulo</h3>
          <p>Carícias e declarações de amor. De testemunha o nosso cobertor</p>
        </Carousel.Caption>
      </Carousel.Item>

    </Carousel>

  </div>
);

LoginCarousel.propTypes = {};

LoginCarousel.defaultProps = {};

export default LoginCarousel;
