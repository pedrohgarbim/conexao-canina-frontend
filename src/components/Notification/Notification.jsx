import React, { useState } from 'react';
import './Notification.css';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  // Adicionar uma nova notificação
  const addNotification = (message) => {
    const id = new Date().getTime(); // Gerar um ID único
    setNotifications((prev) => [...prev, { id, message }]);
  };

  // Remover uma notificação pelo ID
  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  return (
    <div className="notification-manager">
      <button
        className="add-notification-button"
        onClick={() => addNotification('Nova notificação de status!')}
      >
        Adicionar Notificação
      </button>

      <div className="notification-list">
        {notifications.map((notification) => (
          <div key={notification.id} className="notification">
            <p className="notification-message">{notification.message}</p>
            <button
              className="notification-closeButton"
              onClick={() => removeNotification(notification.id)}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
