import React, { useState, useEffect } from 'react';
import styles from './userPage.module.css';
import transition from '../../components/Transition/transition';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import avatarIcon from '../../assets/PessoaUsuario.png';
import userIcon from '../../assets/perfilUsuario.png';
import locationIcon from '../../assets/ELEMENTS.png';
import emailIcon from '../../assets/email.png';
import phoneIcon from '../../assets/phone.png';
import dogIcon from '../../assets/dogIcon.png';

const UserPage = () => {
  const [imgUrl, setImgUrl] = useState('');
  const [dogs, setDogs] = useState([]);
  const [requests, setRequests] = useState([]); // Estado para armazenar as solicitações de cruzamento
  const [historyRequests, setHistoryRequests] = useState([]); // Histórico de solicitações
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  const addDog = (newDog) => {
    setDogs([...dogs, newDog]);
  };

  const handleUpload = (event) => {
    event.preventDefault();

    const file = event.target[0]?.files[0];
    if (!file) return;

    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        alert(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImgUrl(url);
        });
      }
    );
  };

  const goToCreateProfile = () => {
    navigate('/create-profile');
  };

  // Função para aceitar uma solicitação
  const acceptRequest = (requestId) => {
    setRequests(requests.filter((request) => request.id !== requestId));
    // Adicione lógica para atualizar o backend se necessário
  };

  // Função para rejeitar uma solicitação
  const rejectRequest = (requestId) => {
    setRequests(requests.filter((request) => request.id !== requestId));
    // Adicione lógica para atualizar o backend se necessário
  };

  // Função para cancelar uma solicitação
  const cancelRequest = (requestId) => {
    setHistoryRequests(historyRequests.filter((request) => request.id !== requestId));
    // Adicione lógica para atualizar o backend se necessário
  };

  // Função para buscar o histórico de solicitações
  const fetchHistoryRequests = async () => {
    // Aqui você deve fazer uma chamada à API para buscar o histórico de solicitações
    const response = await fetch('/api/history-requests'); // Exemplo de endpoint
    const data = await response.json();
    setHistoryRequests(data);
  };

  useEffect(() => {
    fetchHistoryRequests();
  }, []);

  return (
    <div className={styles.profileContainer}>
      <div className={styles.leftColumn}>
        <div className={styles.avatar}>
          {!imgUrl ? (
            <img src={avatarIcon} alt='Foto Perfil' className={styles.uploaded_image} />
          ) : (
            <img src={imgUrl} alt='Foto Perfil' className={styles.uploaded_image} />
          )}
        </div>

        <form onSubmit={handleUpload} className={styles.upload_form}>
          <h4>Alterar minha foto de Perfil</h4>
          <input type="file" className={styles.file_input} />
          <button type="submit" className={styles.upload_button}>Enviar</button>
          {progress > 0 && <p>Progresso: {progress.toFixed(2)}%</p>}
        </form>
      </div>

      <div className={styles.rightColumn}>
        <div className={styles.userInfo}>
          <h1>José Afonso Oliveira</h1>
          <p>
            <img src={userIcon} alt="Ícone de Usuário" className={styles.icon} /> jose.oliveira
          </p>
          <p>
            <img src={locationIcon} alt="Ícone de Localização" className={styles.icon} /> São Paulo, SP
          </p>
          <p>
            <img src={emailIcon} alt="Ícone de Email" className={styles.icon} /> jose.oliveira@gmail.com
          </p>
          <p>
            <img src={phoneIcon} alt="Ícone de Telefone" className={styles.icon} /> (16) 99999-9999
          </p>
          <button className={styles.editButton}>Alterar meus dados</button>
          <button className={styles.registerDogButton} onClick={goToCreateProfile}>
            Cadastre seu Cão
          </button>
        </div>

        {/* Seção "Meus Cães" */}
        <div className={styles.dogsSection}>
          <h2>Meus Cães</h2>
          <div className={styles.dogsList}>
            {dogs.length === 0 ? (
              <p>Você ainda não cadastrou nenhum cão.</p>
            ) : (
              dogs.map((dog, index) => (
                <div key={index} className={styles.dogCard}>
                  <img src={dogIcon} alt="Ícone de Cachorro" className={styles.dogIcon} />
                  <span>{dog.nome}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Seção "Solicitações de Cruzamento" */}
        <div className={styles.requestsSection}>
          <h2>Solicitações de Cruzamento</h2>
          <div className={styles.requestsList}>
            {requests.length === 0 ? (
              <p>Você não tem solicitações de cruzamento.</p>
            ) : (
              requests.map((request) => (
                <div key={request.id} className={styles.requestCard}>
                  <p>{request.dogName} deseja cruzar com o seu cão.</p>
                  <button onClick={() => acceptRequest(request.id)} className={styles.acceptButton}>
                    Aceitar
                  </button>
                  <button onClick={() => rejectRequest(request.id)} className={styles.rejectButton}>
                    Rejeitar
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Seção "Histórico de Solicitações" */}
        <div className={styles.historySection}>
          <h2>Histórico de Solicitações</h2>
          <div className={styles.historyList}>
            {historyRequests.length === 0 ? (
              <p>Você não tem solicitações enviadas.</p>
            ) : (
              historyRequests.map((request) => (
                <div key={request.id} className={styles.historyCard}>
                  <p>{request.dogName} - Status: {request.status}</p>
                  {request.status === 'pendente' && (
                    <button onClick={() => cancelRequest(request.id)} className={styles.cancelButton}>
                      Cancelar
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default transition(UserPage);
