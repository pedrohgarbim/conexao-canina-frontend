import React, { useState, useEffect } from 'react';
import styles from './PrivacySettings.module.css';

const PrivacySettings = () => {
  const [visibility, setVisibility] = useState({
    photos: true,
    details: true,
    history: true,
  });

  const [authorizedUsers, setAuthorizedUsers] = useState([]);
  const [newUser, setNewUser] = useState('');
  const [message, setMessage] = useState('');

  // Função para atualizar as configurações de visibilidade
  const handleVisibilityChange = (event) => {
    const { name, checked } = event.target;
    setVisibility((prevVisibility) => ({
      ...prevVisibility,
      [name]: checked,
    }));
  };

  // Função para adicionar um usuário autorizado
  const handleAddUser = async () => {
    if (newUser && !authorizedUsers.includes(newUser)) {
      try {
        // Chamada API para adicionar usuário (simulação)
        // await api.addAuthorizedUser(newUser);
        setAuthorizedUsers((prevUsers) => [...prevUsers, newUser]);
        setMessage(`Usuário ${newUser} adicionado com sucesso!`);
        setNewUser('');
      } catch (error) {
        setMessage('Erro ao adicionar usuário!');
      }
    } else {
      setMessage('Usuário já autorizado ou nome inválido!');
    }
  };

  // Função para remover um usuário autorizado
  const handleRemoveUser = async (user) => {
    try {
      // Chamada API para remover usuário (simulação)
      // await api.removeAuthorizedUser(user);
      setAuthorizedUsers((prevUsers) => prevUsers.filter((u) => u !== user));
      setMessage(`Usuário ${user} removido com sucesso!`);
    } catch (error) {
      setMessage('Erro ao remover usuário!');
    }
  };

  // Função para salvar as configurações de visibilidade
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
            onChange={handleVisibilityChange}
          />
        </div>
        <div className={styles.option}>
          <label htmlFor="details">Mostrar detalhes do cachorro</label>
          <input
            type="checkbox"
            id="details"
            name="details"
            checked={visibility.details}
            onChange={handleVisibilityChange}
          />
        </div>
        <div className={styles.option}>
          <label htmlFor="history">Mostrar histórico de cruzamentos</label>
          <input
            type="checkbox"
            id="history"
            name="history"
            checked={visibility.history}
            onChange={handleVisibilityChange}
          />
        </div>

        <button type="button" className={styles.saveButton} onClick={handleSave}>
          Salvar Configurações
        </button>
      </form>

      <div className={styles.permissionsContainer}>
        <h3>Gerenciar Permissões</h3>
        <div className={styles.permissionList}>
          <input
            type="text"
            placeholder="Adicionar usuário"
            value={newUser}
            onChange={(e) => setNewUser(e.target.value)}
            className={styles.input}
          />
          <button
            type="button"
            className={styles.addButton}
            onClick={handleAddUser}
          >
            Adicionar
          </button>

          <div className={styles.authorizedUsers}>
            {authorizedUsers.length === 0 ? (
              <p>Nenhum usuário autorizado.</p>
            ) : (
              authorizedUsers.map((user) => (
                <div key={user} className={styles.userItem}>
                  <span>{user}</span>
                  <button
                    type="button"
                    className={styles.removeButton}
                    onClick={() => handleRemoveUser(user)}
                  >
                    Remover
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default PrivacySettings;
