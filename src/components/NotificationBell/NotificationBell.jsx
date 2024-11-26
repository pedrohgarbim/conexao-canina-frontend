import React, { useState, useEffect } from "react";
import styles from "./NotificationBell.module.css";

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    // Simulação de chamadas para buscar notificações do backend.
    const fetchNotifications = async () => {
      const mockData = [
        { id: 1, name: "Rex", breed: "Golden Retriever", age: 3, link: "/profile/1" },
        { id: 2, name: "Luna", breed: "Poodle", age: 2, link: "/profile/2" },
      ];
      setNotifications(mockData);
    };

    fetchNotifications();
  }, []);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className={styles.notificationContainer}>
      <div className={styles.bellIcon} onClick={toggleNotifications}>
        <span className={styles.notificationCount}>
          {notifications.length}
        </span>
        🔔
      </div>

      {showNotifications && (
        <div className={styles.notificationList}>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div key={notification.id} className={styles.notificationItem}>
                <p>
                  <strong>{notification.name}</strong> ({notification.breed}, {notification.age} anos)
                </p>
                <a href={notification.link} className={styles.viewLink}>
                  Ver perfil
                </a>
              </div>
            ))
          ) : (
            <p className={styles.noNotifications}>Nenhuma notificação pendente.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
