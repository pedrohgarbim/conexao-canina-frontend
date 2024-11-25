import React, { useState } from 'react';
import styles from './FeedbackForm.module.css';

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [name, setName] = useState('');

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const feedbackData = {
      feedback,
      isAnonymous,
      name: isAnonymous ? 'Anonymous' : name,
    };
    console.log(feedbackData); // Replace with API call or form submission logic
    setFeedback(''); // Clear feedback field after submission
    setName(''); // Clear name field after submission
  };

  const handleCancel = () => {
    setFeedback('');
    setName('');
  };

  return (
    <div className={styles.feedbackFormContainer}>
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
          <button type="submit" className={styles.submitButton}>Enviar</button>
          <button type="button" onClick={handleCancel} className={styles.cancelButton}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;
