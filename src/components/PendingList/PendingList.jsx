import React, { useState } from 'react';
import styles from './PendingList.module.css';

const PendingList = ({ pendingDogs, onApprove, onReject }) => {
  const [feedback, setFeedback] = useState('');

  const handleApprove = (id) => {
    try {
      onApprove(id);
      setFeedback('Perfil do cachorro aprovado com sucesso!');
    } catch (error) {
      setFeedback('Erro ao aprovar o perfil. Tente novamente.');
    }
  };

  const handleReject = (id) => {
    try {
      onReject(id);
      setFeedback('Perfil do cachorro rejeitado com sucesso!');
    } catch (error) {
      setFeedback('Erro ao rejeitar o perfil. Tente novamente.');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Perfis de Cachorros Pendentes</h2>
      {feedback && <div className={styles.feedback}>{feedback}</div>}
      <ul className={styles.list}>
        {pendingDogs.map((dog) => (
          <li key={dog.id} className={styles.item}>
            <div>
              <p><strong>Nome:</strong> {dog.name}</p>
              <p><strong>Raça:</strong> {dog.breed}</p>
              <p><strong>Descrição:</strong> {dog.description}</p>
            </div>
            <div className={styles.actions}>
              <button 
                className={styles.approveButton} 
                onClick={() => handleApprove(dog.id)}
              >
                Aprovar
              </button>
              <button 
                className={styles.rejectButton} 
                onClick={() => handleReject(dog.id)}
              >
                Rejeitar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PendingList;
