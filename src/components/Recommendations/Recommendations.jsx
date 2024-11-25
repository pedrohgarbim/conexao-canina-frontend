import React, { useState } from "react";
import styles from "./Recommendations.module.css";

const Recommendations = ({ dogProfile, fetchRecommendations }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [notification, setNotification] = useState("");

  // Simula a atualização de características do perfil do cachorro
  const handleProfileSave = async () => {
    try {
      const updatedRecommendations = await fetchRecommendations(dogProfile);
      setRecommendations(updatedRecommendations);
      setNotification("Recomendações atualizadas com sucesso!");
      setTimeout(() => setNotification(""), 3000); // Remove a mensagem após 3 segundos
    } catch (error) {
      setNotification("Erro ao atualizar recomendações. Tente novamente.");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Recomendações de Parceiros</h2>
      {notification && <div className={styles.notification}>{notification}</div>}
      <button onClick={handleProfileSave} className={styles.saveButton}>
        Salvar Alterações no Perfil
      </button>
      <div className={styles.recommendationsList}>
        {recommendations.length > 0 ? (
          recommendations.map((rec, index) => (
            <div key={index} className={styles.recommendationItem}>
              <p><strong>Nome:</strong> {rec.name}</p>
              <p><strong>Raça:</strong> {rec.breed}</p>
              <p><strong>Idade:</strong> {rec.age} anos</p>
            </div>
          ))
        ) : (
          <p className={styles.noRecommendations}>Nenhuma recomendação disponível no momento.</p>
        )}
      </div>
    </div>
  );
};

export default Recommendations;
