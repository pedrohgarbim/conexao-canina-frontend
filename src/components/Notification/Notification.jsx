import React, { useState } from 'react';
import './Notification.css';

const Notification = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  return (
    isVisible && (
      <div className="notification">
        <p className="notification-message">
          Este serviço está temporariamente indisponível. Pedimos desculpas pelo transtorno.
        </p>
        <button className="notification-closeButton" onClick={handleClose}>
          X
        </button>
      </div>
    )
  );
};

export default Notification;
