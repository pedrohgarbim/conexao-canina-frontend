import React, { useState } from 'react';
import styles from './PendingList.module.css';

const PendingList = ({ pendingUsers, onApprove, onReject }) => {
  const [feedback, setFeedback] = useState('');

  const handleApprove = (id) => {
    try {
      onApprove(id);
      setFeedback('Cadastro aprovado com sucesso!');
    } catch (error) {
      setFeedback('Erro ao aprovar o cadastro. Tente novamente.');
    }
  };

  const handleReject = (id) => {
    try {
      onReject(id);
      setFeedback('Cadastro rejeitado com sucesso!');
    } catch (error) {
      setFeedback('Erro ao rejeitar o cadastro. Tente novamente.');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Cadastros Pendentes</h2>
      {feedback && <div className={styles.feedback}>{feedback}</div>}
      <ul className={styles.list}>
        {pendingUsers.map((user) => (
          <li key={user.id} className={styles.item}>
            <div>
              <p><strong>Nome:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
            <div className={styles.actions}>
              <button 
                className={styles.approveButton} 
                onClick={() => handleApprove(user.id)}
              >
                Aprovar
              </button>
              <button 
                className={styles.rejectButton} 
                onClick={() => handleReject(user.id)}
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
