import React, { useState, useEffect } from "react";
import styles from "./VerificationRequestPage.module.css";

const VerificationRequest = () => {
  const [document, setDocument] = useState(null);
  const [method, setMethod] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isVerified, setIsVerified] = useState(false); // Status de verificação
  const [notifications, setNotifications] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!document || !method) {
      setFeedback("Por favor, preencha todos os campos antes de enviar.");
      return;
    }

    // Simulação de envio e verificação
    setFeedback("Solicitação enviada, aguardando análise.");
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      { message: "Solicitação enviada, aguardando análise.", type: "info" },
    ]);
    setTimeout(() => {
      setIsVerified(true); // Simula aprovação
      setFeedback("Parabéns! Sua conta foi verificada.");
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        { message: "Sua conta foi verificada com sucesso!", type: "success" },
      ]);
    }, 2000);
  };

  // Simulação de notificações em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        { message: "Novidade: O processo de verificação está em andamento.", type: "info" },
      ]);
    }, 10000); // Notificação a cada 10 segundos, simulando atualizações

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, []);

  return (
    <div className={styles.verificationRequestContainer}>
      <h2 className={styles.verificationRequestTitle}>Solicitação de Verificação de Identidade</h2>

      {/* Exibição do perfil */}
      <div className={styles.verificationRequestProfile}>
        <h3 className={styles.verificationRequestProfileTitle}>Perfil do Usuário</h3>
        <p className={styles.verificationRequestProfileName}>Nome do Usuário</p>
        {isVerified ? (
          <span className={styles.verificationRequestVerifiedBadge}>Verificado ✅</span>
        ) : (
          <span className={styles.verificationRequestNotVerifiedBadge}>Não Verificado ❌</span>
        )}
      </div>

      {/* Notificações */}
      <div className={styles.verificationRequestNotifications}>
        {notifications.map((notification, index) => (
          <div
            key={index}
            className={`${styles.verificationRequestNotification} ${
              notification.type === "success" ? styles.verificationRequestSuccess : styles.verificationRequestInfo
            }`}
          >
            {notification.message}
          </div>
        ))}
      </div>

      {/* Informações de segurança */}
      <div className={styles.verificationRequestSecurityInfo}>
        <h3 className={styles.verificationRequestSecurityTitle}>Segurança e Privacidade</h3>
        <p className={styles.verificationRequestSecurityText}>
          Garantimos que todos os dados enviados durante o processo de
          verificação são tratados com total confidencialidade. Seus
          documentos serão protegidos utilizando as melhores práticas de
          segurança e criptografia.
        </p>
      </div>

      {/* Instruções de uso */}
      <div className={styles.verificationRequestInstructions}>
        <p className={styles.verificationRequestInstructionsText}>
          Para iniciar o processo de verificação, por favor, faça o upload de
          um documento válido e escolha o método de verificação. Sua solicitação
          será analisada, e você será informado sobre o status.
        </p>
      </div>

      {/* Formulário de solicitação */}
      <form onSubmit={handleSubmit} className={styles.verificationRequestForm}>
        <div className={styles.verificationRequestField}>
          <label htmlFor="document" className={styles.verificationRequestLabel}>
            Upload do Documento
          </label>
          <input
            type="file"
            id="document"
            accept="image/*,.pdf"
            onChange={(e) => setDocument(e.target.files[0])}
            className={styles.verificationRequestInput}
          />
        </div>

        <div className={styles.verificationRequestField}>
          <label htmlFor="method" className={styles.verificationRequestLabel}>
            Método de Verificação
          </label>
          <select
            id="method"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className={styles.verificationRequestSelect}
          >
            <option value="">Selecione um método</option>
            <option value="email">Verificação por E-mail</option>
            <option value="telefone">Verificação por Telefone</option>
          </select>
        </div>

        <div className={styles.verificationRequestNotice}>
          <p>
            📢 <strong>Aviso:</strong> Seus dados serão utilizados
            exclusivamente para fins de verificação e não serão compartilhados
            com terceiros.
          </p>
        </div>

        <button type="submit" className={styles.verificationRequestButton}>
          Enviar Solicitação
        </button>
      </form>

      {feedback && <p className={styles.verificationRequestFeedback}>{feedback}</p>}
    </div>
  );
};

export default VerificationRequest;
