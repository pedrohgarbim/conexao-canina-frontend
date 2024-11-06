import React, { useState } from 'react';
import styles from './RequestCrossingPage.module.css'; // Importa o CSS modular

const RequestCrossingPage = () => {
  // Estados para controlar a solicitação e feedback
  const [dogName, setDogName] = useState('');
  const [breed, setBreed] = useState('');
  const [requestStatus, setRequestStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Função de validação dos requisitos
  const validateRequest = () => {
    if (dogName.trim() === '' || breed.trim() === '') {
      setErrorMessage('Todos os campos são obrigatórios.');
      return false;
    }
    
    if (breed.toLowerCase() !== 'golden retriever') {  // Exemplo de validação de raça
      setErrorMessage('Apenas Golden Retrievers podem solicitar cruzamento.');
      return false;
    }

    setErrorMessage('');
    return true;
  };

  // Função de envio da solicitação
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateRequest()) {
      setRequestStatus('accepted');
    } else {
      setRequestStatus('rejected');
    }
  };

  // Exibir feedback de acordo com o status
  const renderFeedbackMessage = () => {
    if (requestStatus === 'accepted') {
      return <p className={styles.successMessage}>Solicitação aceita! Entraremos em contato em breve.</p>;
    } else if (requestStatus === 'rejected') {
      return <p className={styles.errorMessage}>{errorMessage}</p>;
    }
    return null;
  };

  return (
    <div className={styles.container}>
      <h2>Solicitação de Cruzamento</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="dogName">Nome do Cão:</label>
          <input
            type="text"
            id="dogName"
            value={dogName}
            onChange={(e) => setDogName(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="breed">Raça do Cão:</label>
          <input
            type="text"
            id="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>Enviar Solicitação</button>
      </form>
      <div className={styles.feedback}>
        {renderFeedbackMessage()}
      </div>
    </div>
  );
};

export default RequestCrossingPage;
