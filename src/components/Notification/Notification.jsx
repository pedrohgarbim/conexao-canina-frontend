import React, { useState } from 'react';
import './Notification.css';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

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
      {/* Mensagem caso não haja notificações */}
      {notifications.length === 0 && (
        <p className="no-notifications-message">Nenhuma notificação no momento.</p>
      )}

      {/* Botão para adicionar notificações */}
      <button
        className="add-notification-button"
        onClick={() => {
          addNotification('Nova notificação de status!');
          setIsAdding(true); // Quando uma notificação for adicionada, ativa o feedback de adição
          setTimeout(() => setIsAdding(false), 500); // Desativa o feedback após um curto tempo
        }}
      >
        {isAdding ? 'Notificação Adicionada!' : 'Adicionar Notificação'}
      </button>

      {/* Lista de notificações */}
      <div className="notification-list">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="notification fade-in" // Animação de fade-in
          >
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
