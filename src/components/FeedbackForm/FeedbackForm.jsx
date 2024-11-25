import React, { useState } from 'react';
import styles from './FeedbackForm.module.css';

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [name, setName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAnonymousChange = () => {
    setIsAnonymous(!isAnonymous);
    setName(''); // Clear name when choosing anonymous
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const feedbackData = {
      feedback,
      isAnonymous,
      name: isAnonymous ? 'Anonymous' : name,
    };

    try {
      setIsLoading(true);
      // Simula uma chamada ao backend
      await new Promise((resolve) => setTimeout(resolve, 1000)); 
      console.log('Enviado ao backend:', feedbackData); // Substituir por integração real com o backend
      setIsSubmitted(true); // Exibe a mensagem de confirmação
    } catch (error) {
      console.error('Erro ao enviar o feedback:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFeedback('');
    setName('');
    setIsAnonymous(false);
    setIsSubmitted(false);
  };

  return (
    <div className={styles.feedbackFormContainer}>
      {!isSubmitted ? (
        <>
          <h2 className={styles.title}>Formulário de Feedback</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <textarea
              value={feedback}
              onChange={handleFeedbackChange}
              placeholder="Escreva seu feedback aqui..."
              className={styles.textarea}
              required
            />
            <div className={styles.options}>
              <label>
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={handleAnonymousChange}
                />
                Enviar anonimamente
              </label>
              {!isAnonymous && (
                <input
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  placeholder="Seu nome"
                  className={styles.nameInput}
                  required
                />
              )}
            </div>
            <div className={styles.buttons}>
              <button type="submit" className={styles.submitButton} disabled={isLoading}>
                {isLoading ? 'Enviando...' : 'Enviar'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className={styles.cancelButton}
                disabled={isLoading}
              >
                Cancelar
              </button>
            </div>
          </form>
        </>
      ) : (
        <div className={styles.confirmationMessage}>
          <h2>Obrigado pelo seu feedback!</h2>
          <p>Seu feedback foi registrado com sucesso.</p>
          <button onClick={handleCancel} className={styles.submitButton}>
            Enviar outro feedback
          </button>
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;
