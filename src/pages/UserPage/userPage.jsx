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
import { useAuthValue } from '../../context/AuthContext';

const UserPage = () => {
  const { user, userInfo } = useAuthValue();
  console.log(user)
  console.log(userInfo);
  const [imgUrl, setImgUrl] = useState('');
  const [dogs, setDogs] = useState([]);
  const [requests, setRequests] = useState([]);
  const [historyRequests, setHistoryRequests] = useState([]);
  const [progress, setProgress] = useState(0);
  const [dogToDelete, setDogToDelete] = useState(null); // Estado para armazenar o cachorro que será excluído
  const [showConfirmDialog, setShowConfirmDialog] = useState(false); // Estado para controlar o diálogo de confirmação
  const navigate = useNavigate();

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

  const acceptRequest = (requestId) => {
    setRequests(requests.filter((request) => request.id !== requestId));
    // Adicione lógica para atualizar o backend se necessário
  };

  const rejectRequest = (requestId) => {
    setRequests(requests.filter((request) => request.id !== requestId));
    // Adicione lógica para atualizar o backend se necessário
  };

  const cancelRequest = (requestId) => {
    setHistoryRequests(historyRequests.filter((request) => request.id !== requestId));
    // Adicione lógica para atualizar o backend se necessário
  };

  const fetchHistoryRequests = async () => {
    const response = await fetch('/api/history-requests');
    const data = await response.json();
    setHistoryRequests(data);
  };

  useEffect(() => {
    fetchHistoryRequests();
  }, []);

  const handleDeleteDog = (dog) => {
    setDogToDelete(dog);
    setShowConfirmDialog(true); // Exibir diálogo de confirmação
  };

  const confirmDeleteDog = async () => {
    try {
      // Exemplo de chamada API para deletar o perfil do cachorro
      await fetch(`/api/delete-dog/${dogToDelete.id}`, { method: 'DELETE' });
      setDogs(dogs.filter((dog) => dog.id !== dogToDelete.id)); // Atualizar a lista de cães
      setShowConfirmDialog(false);
      setDogToDelete(null); // Limpar o estado
    } catch (error) {
      alert('Erro ao excluir o perfil do cachorro.');
    }
  };

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
          {userInfo ? (
            <><h1>{userInfo.nome}</h1><p>
              <img src={userIcon} alt='Ícone de Usuário' className={styles.icon} />
              {userInfo.nome}
            </p><p>
                <img src={locationIcon} alt="Ícone de Localização" className={styles.icon} />
                São Paulo, SP
              </p><p>
                <img src={emailIcon} alt="Ícone de Email" className={styles.icon} />
                {userInfo.email}
              </p><p>
                <img src={phoneIcon} alt="Ícone de Telefone" className={styles.icon} />
                {userInfo.telefone}

              </p><button className={styles.editButton}>Alterar meus dados</button>
              <button className={styles.registerDogButton} onClick={goToCreateProfile}>
                Cadastre seu Cão
              </button></>
          ) : (

            <p>Loading user information...</p>
          )}

        </div>
      </div>
    </div>
  );
};

export default transition(UserPage);
