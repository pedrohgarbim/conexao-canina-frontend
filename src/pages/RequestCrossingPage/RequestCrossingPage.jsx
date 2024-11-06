import React, { useState } from 'react';
import styles from './RequestCrossingPage.module.css'; // Importa o CSS modular

const RequestCrossingPage = () => {
  // Estados para controlar a solicitação e feedback
  const [dogName, setDogName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [customRequirements, setCustomRequirements] = useState('');
  const [requestStatus, setRequestStatus] = useState(null);
  const [errorMessages, setErrorMessages] = useState([]);
  const [requisites, setRequisites] = useState({
    breed: 'golden retriever',
    age: '2-5'
  });

  // Função de validação dos requisitos
  const validateRequest = () => {
    const errors = [];
    
    if (dogName.trim() === '') {
      errors.push('O nome do cão é obrigatório.');
    }
    if (breed.trim() === '') {
      errors.push('A raça do cão é obrigatória.');
    }

    // Validação com base nas opções predefinidas
    if (breed.toLowerCase() !== requisites.breed) {
      errors.push(`Apenas ${requisites.breed}s podem solicitar cruzamento.`);
    }
    if (age < 2 || age > 5) {  // Exemplo de faixa etária válida
      errors.push('A faixa etária do cão deve ser entre 2 e 5 anos.');
    }

    // Verificação de requisitos personalizados
    if (customRequirements.trim() && !customRequirements.toLowerCase().includes('aceito')) {
      errors.push('O requisito personalizado não está adequado.');
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
          <select
            id="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            className={styles.input}
          >
            <option value="golden retriever">Golden Retriever</option>
            <option value="labrador">Labrador</option>
            <option value="bulldog">Bulldog</option>
            <option value="poodle">Poodle</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="age">Idade do Cão (em anos):</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="customRequirements">Requisitos Personalizados:</label>
          <input
            type="text"
            id="customRequirements"
            value={customRequirements}
            onChange={(e) => setCustomRequirements(e.target.value)}
            className={styles.input}
            placeholder="Digite requisitos personalizados"
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
