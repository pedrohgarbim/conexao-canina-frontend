import React, { useState, useEffect } from 'react';
import { ref, onValue, push } from 'firebase/database';
import { database } from './firebase-config'; // Importando a configuração do Firebase
import './Notification.css';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  // Escutar as notificações em tempo real
  useEffect(() => {
    const notificationsRef = ref(database, 'notifications');

    // Escuta mudanças em tempo real
    onValue(notificationsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const notificationList = Object.values(data);
        setNotifications(notificationList);
      }
    });
  }, []);

  // Adicionar uma nova notificação ao Firebase
  const addNotification = (message) => {
    const notificationsRef = ref(database, 'notifications');
    push(notificationsRef, {
      message,
      timestamp: new Date().getTime(),
    });
    setIsAdding(true);
    setTimeout(() => setIsAdding(false), 500); // Feedback visual ao adicionar
  };

  // Remover uma notificação pelo ID (opcional, se você quiser adicionar essa funcionalidade)
  const removeNotification = (id) => {
    const notificationRef = ref(database, `notifications/${id}`);
    notificationRef.remove();
  };

  return (
    <div className="notification-manager">
      {notifications.length === 0 && (
        <p className="no-notifications-message">Nenhuma notificação no momento.</p>
      )}

      <button
        className="add-notification-button"
        onClick={() => addNotification('Nova notificação de status!')}
      >
        {isAdding ? 'Notificação Adicionada!' : 'Adicionar Notificação'}
      </button>

      <div className="notification-list">
        {notifications.map((notification, index) => (
          <div
            key={index}
            className="notification fade-in"
          >
            <p className="notification-message">{notification.message}</p>
            <button
              className="notification-closeButton"
              onClick={() => removeNotification(index)}
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
