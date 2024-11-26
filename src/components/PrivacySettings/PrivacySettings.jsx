import React, { useState } from 'react';
import styles from './PrivacySettings.module.css';

const PrivacySettings = () => {
  const [visibility, setVisibility] = useState({
    photos: true,
    details: true,
    history: true,
  });

  // Função para atualizar as configurações de visibilidade
  const handleChange = (event) => {
    const { name, checked } = event.target;
    setVisibility((prevVisibility) => ({
      ...prevVisibility,
      [name]: checked,
    }));
  };

  // Função para salvar as configurações
  const handleSave = () => {
    // Aqui você pode integrar com a API para salvar as configurações de privacidade
    // Exemplo fictício de integração com a API:
    // api.savePrivacySettings(visibility);

    console.log('Configurações de privacidade salvas:', visibility);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Configurações de Privacidade</h2>
      <form className={styles.form}>
        <div className={styles.option}>
          <label htmlFor="photos">Mostrar fotos</label>
          <input
            type="checkbox"
            id="photos"
            name="photos"
            checked={visibility.photos}
            onChange={handleChange}
          />
        </div>
        <div className={styles.option}>
          <label htmlFor="details">Mostrar detalhes do cachorro</label>
          <input
            type="checkbox"
            id="details"
            name="details"
            checked={visibility.details}
            onChange={handleChange}
          />
        </div>
        <div className={styles.option}>
          <label htmlFor="history">Mostrar histórico de cruzamentos</label>
          <input
            type="checkbox"
            id="history"
            name="history"
            checked={visibility.history}
            onChange={handleChange}
          />
        </div>
        <button type="button" className={styles.saveButton} onClick={handleSave}>
          Salvar Configurações
        </button>
      </form>
    </div>
  );
};

export default PrivacySettings;
