import React, { useState } from 'react';
import styles from './DogProfileForm.module.css'; // Certifique-se de criar este arquivo CSS
import trasition from '../Transition/transition';

function DogProfileForm() {
  const [nome, setNome] = useState('');
  const [raca, setRaca] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [tamanho, setTamanho] = useState('');
  const [genero, setGenero] = useState('');
  const [idade, setIdade] = useState('');
  const [descricao, setDescricao] = useState('');
  const [foto, setFoto] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!nome || !raca || !cidade || !estado || !tamanho || !genero || !idade || !descricao || !foto) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    // Lógica para enviar os dados do formulário aqui...

    setSuccessMessage('Perfil do cachorro criado com sucesso!');
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.header}>
          <span>Cadastrar Cachorro</span>
        </div>
        
        <span>Nome:</span>
        <label className={styles.inputContainer}>
          <input 
            type="text" 
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder='Nome do Cachorro'
            required
          />
        </label>

        <span>Raça:</span>
        <label className={styles.inputContainer}>
          <input 
            type="text" 
            value={raca}
            onChange={(e) => setRaca(e.target.value)}
            placeholder='Raça do Cachorro'
            required
          />
        </label>

        <span>Cidade:</span>
        <label className={styles.inputContainer}>
          <input 
            type="text" 
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            placeholder='Cidade'
            required
          />
        </label>

        <span>Estado:</span>
        <label className={styles.inputContainer}>
          <input 
            type="text" 
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            placeholder='Estado'
            required
          />
        </label>

        <span>Tamanho:</span>
        <label className={styles.inputContainer}>
          <select 
            value={tamanho}
            onChange={(e) => setTamanho(e.target.value)}
            required
          >
            <option value="">Selecione o tamanho</option>
            <option value="Pequeno">Pequeno</option>
            <option value="Médio">Médio</option>
            <option value="Grande">Grande</option>
          </select>
        </label>

        <span>Gênero:</span>
        <label className={styles.inputContainer}>
          <select 
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            required
          >
            <option value="">Selecione o gênero</option>
            <option value="M">Macho</option>
            <option value="F">Fêmea</option>
          </select>
        </label>

        <span>Idade:</span>
        <label className={styles.inputContainer}>
          <input 
            type="number" 
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
            placeholder='Idade'
            required
          />
        </label>

        <span>Descrição:</span>
        <label className={styles.inputContainer}>
          <textarea 
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder='Conte sobre seu cachorro'
            required
          />
        </label>

        <span>Adicione uma foto do seu Pet:</span>
        <label className={styles.inputContainer_Photo}>
          <input 
            type="file" 
            onChange={(e) => setFoto(e.target.files[0])}
            required
          />
        </label>

        <button type="submit" className={styles.button}>Cadastrar</button>
        
        {error && <p className='error'>{error}</p>}
        {successMessage && <p className='success'>{successMessage}</p>}
      </form>
    </div>
  );
}

export default trasition(DogProfileForm);
