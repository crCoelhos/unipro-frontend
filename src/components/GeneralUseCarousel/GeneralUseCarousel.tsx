import React from 'react';
import PropTypes from 'prop-types';
import styles from './GeneralUseCarousel.module.css';
import { Carousel } from 'react-bootstrap';

import sh1 from '../../assets/images/show1.jpg'
import sh2 from '../../assets/images/show2.jpg'
import sh3 from '../../assets/images/show3.jpg'


const GeneralUseCarousel = () => (
  <div className={styles.GeneralUseCarousel}>
    <Carousel fade interval={2000}  indicators={false}>
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

GeneralUseCarousel.propTypes = {};

GeneralUseCarousel.defaultProps = {};

export default GeneralUseCarousel;
