import React from 'react';
import PropTypes from 'prop-types';
import styles from './LoginCarousel.module.css';
import { Carousel } from 'react-bootstrap';

import sh1 from '../../assets/images/show1.jpg'
import sh2 from '../../assets/images/show2.jpg'
import sh3 from '../../assets/images/show3.jpg'

const LoginCarousel = () => (
  <div className={styles.LoginCarousel}>
    <Carousel fade interval={2000}>
    <Carousel.Item>
        <img src={sh1} alt="" className="d-block w-100" />
        <Carousel.Caption>
          <p>Jogos Uni 2021</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img src={sh2} alt="" className="d-block w-100" />
        <Carousel.Caption>
          <p>Jogos Uni 2021</p>
        </Carousel.Caption>
      </Carousel.Item>
      
      <Carousel.Item>
        <img src={sh3} alt="" className="d-block w-100" />
        <Carousel.Caption>
          <p>Jogos Uni 2021</p>
        </Carousel.Caption>
      </Carousel.Item>

    </Carousel>

  </div>
);

LoginCarousel.propTypes = {};

LoginCarousel.defaultProps = {};

export default LoginCarousel;
