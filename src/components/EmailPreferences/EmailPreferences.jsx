import React, { useState, useEffect } from "react";
import styles from "./EmailPreferences.module.css";

// Supondo que a função `getCurrentUser` retorne as informações do usuário logado.
import { getCurrentUser } from "../auth"; // Importe a função que retorna o usuário logado

const EmailPreferences = ({ profileOwnerId }) => {
  const [emailPreferences, setEmailPreferences] = useState({
    promotional: false,
    updates: false,
    news: false,
  });

  const [notificationPreferences, setNotificationPreferences] = useState({
    requests: false,
    newMessages: false,
    systemUpdates: false,
  });

  const [notificationFrequency, setNotificationFrequency] = useState("daily");

  const [message, setMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  // Verifica se o usuário está logado
  useEffect(() => {
    const user = getCurrentUser(); // Função para obter as informações do usuário logado
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  // Função para verificar se o usuário logado é o dono do perfil
  const isProfileOwner = currentUser && currentUser.id === profileOwnerId;

  if (!currentUser) {
    // Caso o usuário não esteja logado, exibe uma mensagem ou redireciona
    return <div className={styles.accessDenied}>Acesso restrito! Faça login para acessar.</div>;
  }

  if (!isProfileOwner) {
    // Caso o usuário logado não seja o dono do perfil, restringe o acesso
    return <div className={styles.accessDenied}>Você não tem permissão para acessar estas preferências.</div>;
  }

  const handleEmailToggle = (type) => {
    setEmailPreferences((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
    showMessage(`Preferência de e-mail "${type}" atualizada!`);
  };

  const handleNotificationToggle = (type) => {
    setNotificationPreferences((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
    showMessage(`Preferência de notificação "${type}" atualizada!`);
  };

  const handleSave = () => {
    showMessage("Todas as preferências foram salvas com sucesso!");
  };

  const handleFrequencyChange = (event) => {
    setNotificationFrequency(event.target.value);
    showMessage(`Frequência de notificações alterada para "${event.target.value}"!`);
  };

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className={styles.emailPreferencesContainer}>
      <h2 className={styles.emailPreferencesTitle}>Gerenciar Preferências</h2>

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
