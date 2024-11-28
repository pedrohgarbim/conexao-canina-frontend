import React, { useState } from "react";
import styles from "./NotificationSettings.module.css";

const NotificationSettings = () => {
  const [preferences, setPreferences] = useState({
    newRequests: true,
    messages: true,
    promotions: false,
    securityAlerts: true,
  });

  const handleToggle = (key) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const savePreferences = async () => {
    try {
      const response = await fetch("/api/notification-preferences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preferences),
      });

      if (!response.ok) {
        throw new Error("Erro ao salvar preferências.");
      }

      alert("Preferências salvas com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar preferências:", error);
      alert("Não foi possível salvar as preferências. Tente novamente.");
    }
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

      <div className={styles.setting}>
        <label className={styles.label}>
          <input
            type="checkbox"
            checked={preferences.promotions}
            onChange={() => handleToggle("promotions")}
            className={styles.checkbox}
          />
          Notificações de promoções
        </label>
      </div>

      <div className={styles.setting}>
        <label className={styles.label}>
          <input
            type="checkbox"
            checked={preferences.securityAlerts}
            onChange={() => handleToggle("securityAlerts")}
            className={styles.checkbox}
          />
          Alertas de segurança
        </label>
      </div>

      <button onClick={savePreferences} className={styles.saveButton}>
        Salvar Preferências
      </button>
    </div>
  );
};

export default NotificationSettings;
