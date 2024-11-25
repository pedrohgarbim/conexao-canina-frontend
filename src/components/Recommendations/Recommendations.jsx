import React, { useState, useEffect } from "react";
import styles from "./Recommendations.module.css";

const Recommendations = ({ dogProfile, fetchRecommendations }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    // Fetch initial recommendations on component mount
    const loadRecommendations = async () => {
      try {
        const initialRecommendations = await fetchRecommendations(dogProfile);
        setRecommendations(initialRecommendations);
      } catch (error) {
        console.error("Erro ao carregar recomendações:", error);
      }
    };

    loadRecommendations();
  }, [dogProfile, fetchRecommendations]);

  // Atualiza as recomendações ao salvar as alterações do perfil
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
              <div className={styles.dogInfo}>
                <p><strong>Nome:</strong> {rec.name}</p>
                <p><strong>Raça:</strong> {rec.breed}</p>
                <p><strong>Idade:</strong> {rec.age} anos</p>
                <p><strong>Características:</strong> {rec.characteristics}</p>
              </div>
              <div className={styles.ownerInfo}>
                <p><strong>Dono:</strong> {rec.owner.name}</p>
                <p><strong>Contato:</strong> {rec.owner.contact}</p>
              </div>
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
