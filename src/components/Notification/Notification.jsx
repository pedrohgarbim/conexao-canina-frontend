import React, { useState } from 'react';
import './Notification.module.css';

const Notification = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  return (
    isVisible && (
      <div className="notification">
        <p className="notification-message">{message}</p>
        <button className="notification-closeButton" onClick={handleClose}>
          X
        </button>
      </div>
    )
  );
};

export default Notification;
