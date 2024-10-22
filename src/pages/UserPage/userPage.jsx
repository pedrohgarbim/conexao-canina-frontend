import React, { useState } from 'react';
import styles from './userPage.module.css';
import transition from '../../components/Transition/transition';
import { useNavigate } from 'react-router-dom'; // Importando useNavigate
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; // Importando funções do Firebase

import avatarIcon from '../../assets/PessoaUsuario.png';
import userIcon from '../../assets/perfilUsuario.png';
import locationIcon from '../../assets/ELEMENTS.png';
import emailIcon from '../../assets/email.png';
import phoneIcon from '../../assets/phone.png';
import dogIcon from '../../assets/dogIcon.png'; // Adicione um ícone de cachorro

const UserPage = () => {
  const [imgUrl, setImgUrl] = useState('');
  const [dogs, setDogs] = useState([]); // Estado para armazenar os cães
  const navigate = useNavigate(); // Inicializando o useNavigate
  const [progress, setProgress] = useState(0); // Estado para o progresso do upload

  // Função para adicionar um novo cão ao estado
  const addDog = (newDog) => {
    setDogs([...dogs, newDog]);
  };

  const handleUpload = (event) => {
    event.preventDefault();

    const file = event.target[0]?.files[0];
    if (!file) return;

    const storageRef = ref(storage, `images/${file.name}`); // Corrigido para usar template string
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

  // Função para redirecionar para a página CreateProfile
  const goToCreateProfile = () => {
    navigate('/create-profile');
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
          {progress > 0 && <p>Progresso: {progress.toFixed(2)}%</p>} {/* Mostrando progresso */}
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

          {/* Alterando o botão para redirecionar para a página CreateProfile */}
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
                  <img src={dogIcon} alt="Ícone de Cão" className={styles.dogIcon} />
                  <span>{dog.nome}</span> {/* Exiba o nome do cão */}
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
