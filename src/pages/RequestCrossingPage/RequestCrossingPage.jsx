import React, { useState } from 'react';
import styles from './RequestCrossingPage.module.css'; // Importa o CSS modular

const RequestCrossingPage = () => {
  // Estados para controlar a solicitação e feedback
  const [dogName, setDogName] = useState('');
  const [breed, setBreed] = useState('');
  const [requestStatus, setRequestStatus] = useState(null);
  const [errorMessages, setErrorMessages] = useState([]);

  // Função de validação dos requisitos
  const validateRequest = () => {
    const errors = [];
    
    if (dogName.trim() === '') {
      errors.push('O nome do cão é obrigatório.');
    }
    if (breed.trim() === '') {
      errors.push('A raça do cão é obrigatória.');
    }
    
    if (breed.toLowerCase() !== 'golden retriever') {  // Exemplo de validação de raça
      errors.push('Apenas Golden Retrievers podem solicitar cruzamento.');
    }

    if (errors.length > 0) {
      setErrorMessages(errors);
      return false;
    }

    setErrorMessages([]);
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
      return (
        <div className={styles.errorMessages}>
          <p className={styles.errorTitle}>Solicitação rejeitada:</p>
          <ul>
            {errorMessages.map((msg, index) => (
              <li key={index} className={styles.errorMessage}>{msg}</li>
            ))}
          </ul>
        </div>
      );
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
