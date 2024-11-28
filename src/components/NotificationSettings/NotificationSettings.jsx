import React, { useState } from "react";
import styles from "./NotificationSettings.module.css";

const NotificationSettings = () => {
  const [preferences, setPreferences] = useState({
    newRequests: true,
    messages: true,
  });

  const handleToggle = (key) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));

    // Simular chamada ao backend para salvar preferências
    savePreferences({ ...preferences, [key]: !preferences[key] });
  };

  const savePreferences = (updatedPreferences) => {
    // Chamada de API simulada
    console.log("Salvando preferências:", updatedPreferences);
  };

  return (
    <div className={styles.notificationSettings}>
      <h1 className={styles.title}>Configurações de Notificação</h1>
      <div className={styles.setting}>
        <label className={styles.label}>
          <input
            type="checkbox"
            checked={preferences.newRequests}
            onChange={() => handleToggle("newRequests")}
            className={styles.checkbox}
          />
          Notificações para novas solicitações
        </label>
      </div>
      <div className={styles.setting}>
        <label className={styles.label}>
          <input
            type="checkbox"
            checked={preferences.messages}
            onChange={() => handleToggle("messages")}
            className={styles.checkbox}
          />
          Notificações para mensagens
        </label>
      </div>
    </div>
  );
};

export default NotificationSettings;
