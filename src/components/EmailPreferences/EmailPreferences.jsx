import React, { useState } from "react";
import styles from "./EmailPreferences.module.css";

const EmailPreferences = () => {
  const [preferences, setPreferences] = useState({
    promotional: false,
    updates: false,
    news: false,
  });
  const [message, setMessage] = useState("");

  const handleToggle = (type) => {
    setPreferences((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleSave = () => {
    setMessage("Suas preferências de e-mail foram salvas com sucesso!");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className={styles.emailPreferencesContainer}>
      <h2 className={styles.emailPreferencesTitle}>Preferências de E-mail</h2>
      <p className={styles.emailPreferencesDescription}>
        Selecione os tipos de e-mails que deseja receber:
      </p>
      <div className={styles.emailPreferencesOptions}>
        <label className={styles.emailPreferencesOption}>
          <input
            type="checkbox"
            checked={preferences.promotional}
            onChange={() => handleToggle("promotional")}
          />
          E-mails promocionais
        </label>
        <label className={styles.emailPreferencesOption}>
          <input
            type="checkbox"
            checked={preferences.updates}
            onChange={() => handleToggle("updates")}
          />
          Atualizações de conta
        </label>
        <label className={styles.emailPreferencesOption}>
          <input
            type="checkbox"
            checked={preferences.news}
            onChange={() => handleToggle("news")}
          />
          Notícias e novidades
        </label>
      </div>
      <button className={styles.emailPreferencesSaveButton} onClick={handleSave}>
        Salvar Preferências
      </button>
      {message && (
        <div className={styles.emailPreferencesMessage}>{message}</div>
      )}
    </div>
  );
};

export default EmailPreferences;
