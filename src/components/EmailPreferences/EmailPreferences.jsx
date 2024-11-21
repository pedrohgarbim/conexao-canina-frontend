import React, { useState } from "react";
import styles from "./EmailPreferences.module.css";

const EmailPreferences = () => {
  // Estados para preferências de e-mail
  const [emailPreferences, setEmailPreferences] = useState({
    promotional: false,
    updates: false,
    news: false,
  });

  // Estados para preferências de notificações
  const [notificationPreferences, setNotificationPreferences] = useState({
    requests: false,
    newMessages: false,
    systemUpdates: false,
  });

  // Estado para frequência de notificações
  const [notificationFrequency, setNotificationFrequency] = useState("daily");

  const [message, setMessage] = useState("");

  // Função para alternar preferências de e-mail
  const handleEmailToggle = (type) => {
    setEmailPreferences((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
    showMessage(`Preferência de e-mail "${type}" atualizada!`);
  };

  // Função para alternar preferências de notificações
  const handleNotificationToggle = (type) => {
    setNotificationPreferences((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
    showMessage(`Preferência de notificação "${type}" atualizada!`);
  };

  // Função para salvar todas as preferências
  const handleSave = () => {
    showMessage("Todas as preferências foram salvas com sucesso!");
  };

  // Função para salvar a frequência de notificações
  const handleFrequencyChange = (event) => {
    setNotificationFrequency(event.target.value);
    showMessage(
      `Frequência de notificações alterada para "${event.target.value}"!`
    );
  };

  // Função para exibir mensagem de feedback
  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 3000);
  };

  // Função para salvar a frequência de notificações
  const handleFrequencyChange = (event) => {
    setNotificationFrequency(event.target.value);
    setMessage("A frequência de notificações foi atualizada com sucesso!");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className={styles.emailPreferencesContainer}>
      <h2 className={styles.emailPreferencesTitle}>Gerenciar Preferências</h2>

      {/* Preferências de e-mail */}
      <section className={styles.preferenceSection}>
        <h3 className={styles.preferenceTitle}>Preferências de E-mail</h3>
        <p className={styles.preferenceDescription}>
          Selecione os tipos de e-mails que deseja receber:
        </p>
        <div className={styles.preferenceOptions}>
          <label className={styles.preferenceOption}>
            <input
              type="checkbox"
              checked={emailPreferences.promotional}
              onChange={() => handleEmailToggle("promotional")}
            />
            E-mails promocionais
          </label>
          <label className={styles.preferenceOption}>
            <input
              type="checkbox"
              checked={emailPreferences.updates}
              onChange={() => handleEmailToggle("updates")}
            />
            Atualizações de conta
          </label>
          <label className={styles.preferenceOption}>
            <input
              type="checkbox"
              checked={emailPreferences.news}
              onChange={() => handleEmailToggle("news")}
            />
            Notícias e novidades
          </label>
        </div>
      </section>

      {/* Preferências de notificações */}
      <section className={styles.preferenceSection}>
        <h3 className={styles.preferenceTitle}>Preferências de Notificações</h3>
        <p className={styles.preferenceDescription}>
          Configure como deseja ser notificado:
        </p>
        <div className={styles.preferenceOptions}>
          <label className={styles.preferenceOption}>
            <input
              type="checkbox"
              checked={notificationPreferences.requests}
              onChange={() => handleNotificationToggle("requests")}
            />
            Notificações de solicitações de cruzamento
          </label>
          <label className={styles.preferenceOption}>
            <input
              type="checkbox"
              checked={notificationPreferences.newMessages}
              onChange={() => handleNotificationToggle("newMessages")}
            />
            Notificações de novas mensagens
          </label>
          <label className={styles.preferenceOption}>
            <input
              type="checkbox"
              checked={notificationPreferences.systemUpdates}
              onChange={() => handleNotificationToggle("systemUpdates")}
            />
            Notificações de atualizações do sistema
          </label>
        </div>
      </section>

      {/* Frequência de notificações */}
      <section className={styles.preferenceSection}>
        <h3 className={styles.preferenceTitle}>Frequência de Notificações</h3>
        <p className={styles.preferenceDescription}>
          Escolha com que frequência deseja receber notificações:
        </p>
        <select
          className={styles.notificationFrequencySelect}
          value={notificationFrequency}
          onChange={handleFrequencyChange}
        >
          <option value="immediate">Imediata</option>
          <option value="daily">Diária</option>
          <option value="weekly">Semanal</option>
          <option value="monthly">Mensal</option>
        </select>
      </section>

      {/* Botão de salvar */}
      <button className={styles.emailPreferencesSaveButton} onClick={handleSave}>
        Salvar Preferências
      </button>

      {/* Feedback visual */}
      {message && (
        <div className={styles.emailPreferencesMessage}>{message}</div>
      )}
    </div>
  );
};

export default EmailPreferences;
