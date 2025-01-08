
import React, { useMemo, useState, useEffect } from 'react';
import '../styles/css/Countdown.css'
interface CountdownProps {
  title: string;
  targetDate: string;
  isVisible: boolean;
}

const Countdown = ({ title, targetDate, isVisible }: CountdownProps) => {
  // Estado para el tiempo restante
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const parsedTargetDate = useMemo(() => new Date(targetDate), [targetDate]);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const difference = parsedTargetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return false; // Detener el intervalo si la fecha ya pasó
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeRemaining({ days, hours, minutes, seconds });
      return true;
    };

    calculateTimeRemaining();

    const interval = setInterval(() => {
      if (!calculateTimeRemaining()) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [parsedTargetDate]);

  if (!isVisible) {
    return null; // Si no es visible, no renderiza nada
  }

  return (
    <div className="tc bg-light pa5 ma5 br3">
      <h1 className="f-subheadline lh-title fw5" style={{ color: '#001428'}}>
        {title}
      </h1>
      <div className="flex justify-center items-center">
        <div className="ma3">
          <div className="f1" style={{ color: '#001428' }}>
            {timeRemaining.days}
          </div>
          <p className="f6 f5-ns" style={{ color: '#001428' }}>Días</p>
        </div>
        <div className="ma3">
          <div className="f1" style={{ color: '#001428' }}>
            {timeRemaining.hours}
          </div>
          <p className="f6 f5-ns" style={{ color: '#001428' }}>Horas</p>
        </div>
        <div className="ma3">
          <div className="f1" style={{ color: '#001428' }}>
            {timeRemaining.minutes}
          </div>
          <p className="f6 f5-ns" style={{ color: '#001428' }}>Minutos</p>
        </div>
        <div className="ma3">
          <div className="f1" style={{ color: '#001428' }}>
            {timeRemaining.seconds}
          </div>
          <p className="f6 f5-ns" style={{ color: '#001428' }}>Segundos</p>
        </div>
      </div>
    </div>
  );
};

// Valores por defecto para las propiedades del componente
Countdown.defaultProps = {
  title: 'La oferta finaliza en',
  targetDate: '2025-01-09T14:00:00',
  isVisible: true,
};

// Definición del esquema para el Site Editor
Countdown.schema = {
  title: 'Test Block',
  type: 'object',
  properties: {
    title: {
      type: 'string',
      title: 'Título',
      default: 'La oferta finaliza en',
    },
    targetDate: {
      type: 'string',
      title: 'Fecha de fin',
      default: '2025-01-08T14:00:00',
    },
    isVisible: {
      type: 'boolean',
      title: '¿Es visible?',
      default: true,
    },
  },
};

export default Countdown;