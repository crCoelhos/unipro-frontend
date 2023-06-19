import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './Countdown.module.css'

interface CountdownProps {
  duration: number; // Duração em minutos
}

const Countdown: React.FC<CountdownProps> = ({ duration }) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60); // Tempo restante em segundos
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft > 0) {
      const countdown = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(countdown);
    } else {
      navigate('/sport-events');
    }
  }, [timeLeft, navigate]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  

  return (
    <Container>
      <Row className="justify-content-end">
        <Col xs={3} className={styles.timerStyle}>
          {formatTime(timeLeft)}
        </Col>
      </Row>
    </Container>
  );
};

export default Countdown;
