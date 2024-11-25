import React, { useState } from 'react';
import styles from './PendingList.module.css';

const PendingList = ({ pendingDogs, onApprove, onReject, onSuspend, onBlock }) => {
  const [feedback, setFeedback] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [justification, setJustification] = useState('');
  const [actionType, setActionType] = useState('');

  const handleApprove = (id) => {
    try {
      onApprove(id);
      setFeedback('Perfil aprovado com sucesso!');
    } catch (error) {
      setFeedback('Erro ao aprovar o perfil. Tente novamente.');
    }
  };

  const handleReject = (id) => {
    try {
      onReject(id);
      setFeedback('Perfil rejeitado com sucesso!');
    } catch (error) {
      setFeedback('Erro ao rejeitar o perfil. Tente novamente.');
    }
  };

  const handleSuspend = (id) => {
    setActionType('suspend');
    setSelectedUserId(id);
    setShowModal(true);
  };

  const handleBlock = (id) => {
    setActionType('block');
    setSelectedUserId(id);
    setShowModal(true);
  };

  const submitAction = () => {
    try {
      if (actionType === 'suspend') {
        onSuspend(selectedUserId, justification);
        setFeedback('Usuário suspenso com sucesso!');
      } else if (actionType === 'block') {
        onBlock(selectedUserId, justification);
        setFeedback('Usuário bloqueado com sucesso!');
      }
      setJustification('');
      setShowModal(false);
    } catch (error) {
      setFeedback('Erro ao realizar a ação. Tente novamente.');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Gerenciamento de Perfis de Cachorros Pendentes</h2>
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
              <button 
                className={styles.suspendButton} 
                onClick={() => handleSuspend(dog.id)}
              >
                Suspender
              </button>
              <button 
                className={styles.blockButton} 
                onClick={() => handleBlock(dog.id)}
              >
                Bloquear
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal de Justificativa */}
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Forneça uma justificativa</h3>
            <textarea
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              placeholder="Digite sua justificativa aqui..."
              rows="4"
              className={styles.textarea}
            ></textarea>
            <div className={styles.modalActions}>
              <button className={styles.submitButton} onClick={submitAction}>Confirmar</button>
              <button className={styles.cancelButton} onClick={() => setShowModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingList;
