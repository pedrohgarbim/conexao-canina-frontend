import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './dogDetails.module.css';
import trasition from '../../components/Transition/transition'
import { FaExclamationTriangle, FaPencilAlt, FaClipboard } from 'react-icons/fa';
import { useFetchCaoById } from '../../hooks/useCao'
import teste from '../../assets/dog1.jpg'


// Importar as imagens dos ícones
import pawIcon from '../../assets/patacachorro.png';
import locationIcon from '../../assets/ELEMENTS.png';
import descriptionIcon from '../../assets/descriptionIcon.png';

// Importar as imagens dos cachorros
import Rex from '../../assets/dog1.jpg';
import Bella from '../../assets/dog2.jpg';
import Thor from '../../assets/dog3.jpg';
import Pintado from '../../assets/dog4.jpg';
import Cesar from '../../assets/dog5.jpg';
import Dorinha from '../../assets/dog6.jpg';
import Chanel from '../../assets/dog7.jpg';
import Birulinha from '../../assets/dog8.jpg';
import Max from '../../assets/dog9.jpeg';
import Luna from '../../assets/dog10.jpg';
import Buddy from '../../assets/dog11.jpg';
import Molly from '../../assets/dog12.jpg';
import Rocky from '../../assets/dog13.jpg';
import Daisy from '../../assets/dog23.jpg';
import Zeus from '../../assets/dog15.jpg';
import Lola from '../../assets/dog16.jpg';
import Toby from '../../assets/dog17.jpg';
import Bailey from '../../assets/dog14.jpg';
import Charlie from '../../assets/dog19.jpg';
import Rosie from '../../assets/dog24.jpg';
import Jack from '../../assets/dog20.jpg';
import Lucy from '../../assets/dog21.jpg';
import Duke from '../../assets/dog18.jpg';
import Maggie from '../../assets/dog22.jpg';

import { db } from '../../firebase/config';
import { collection, addDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

import ShareButtons from './ShareButtons';

const Modal = ({ onClose, owner, dogId }) => {
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState(null);

  // Função para lidar com o envio da solicitação
  const handleSubmit = async () => {
    try {
      // Exemplo de uma requisição POST para enviar a solicitação
      const response = await fetch("/api/send-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ownerId: owner.id,
          dogId: dogId,
          message: message,
        }),
      });

      if (response.ok) {
        setFeedback("Solicitação enviada com sucesso!");
      } else {
        setFeedback("Erro ao enviar a solicitação.");
      }
    } catch (error) {
      console.error("Erro:", error);
      setFeedback("Erro ao enviar a solicitação.");
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContentContact}>
        <div className={styles.infos}>
          <h2 className={styles.ownerContact}>Contato do Dono</h2>
          <p className={styles.ownerName}><strong>Nome:</strong> {owner.name}</p>
          <p className={styles.ownerEmail}><strong>Email:</strong> {owner.email}</p>
          <p className={styles.ownerPhone}><strong>Telefone:</strong> {owner.phone}</p>
        </div>

        {/* Seção para enviar a solicitação de cruzamento */}
        <div className={styles.crossRequest}>
          <h3>Enviar Solicitação de Cruzamento</h3>
          <textarea
            placeholder="Adicione uma mensagem personalizada (opcional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={styles.messageField}
          />
          <button onClick={handleSubmit} className={styles.submitButton}>
            Enviar Solicitação
          </button>

          {/* Exibir feedback ao usuário */}
          {feedback && <p className={styles.feedback}>{feedback}</p>}
        </div>

        <button onClick={onClose} className={styles.closeButton}>Fechar</button>
      </div>
    </div>
  );
};

const ReportModal = ({ onClose, onSubmit }) => {
  const [reason, setReason] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(reason);
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Denunciar Perfil</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Motivo da denúncia:
            <select className={styles.selectBox} value={reason} onChange={(e) => setReason(e.target.value)} required>
              <option value="">Selecione um motivo</option>
              <option value="Perfil Falso">Perfil Falso</option>
              <option value="Conteúdo Inapropriado">Conteúdo Inapropriado</option>
              <option value="Venda ou Adoção Ilegal">Venda ou Adoção Ilegal</option>
              <option value="Uso Indevido de Imagens">Uso Indevido de Imagens</option>
              <option value="Outro">Outro</option>
            </select>
          </label>
          <button type="submit" className={styles.submitButton}>Enviar Denúncia</button>
        </form>
        <button onClick={onClose} className={styles.closeButton}>Fechar</button>
      </div>
    </div>
  );
};

const EditDogModal = ({ onClose, dog, onSubmit }) => {
  const [formData, setFormData] = useState(dog);
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [image, setImage] = useState(null); // Estado para armazenar a imagem selecionada

  // Função para lidar com mudanças no input de texto
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Função para lidar com a seleção de imagem
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Pega o arquivo selecionado
    if (file) {
      setImage(file); // Armazena o arquivo de imagem no estado
      setFormData({ ...formData, photo: file }); // Adiciona o arquivo de imagem ao formData
    }
  };

  // Função para enviar o formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFeedbackMessage('');

    // Simulação de atualização (substitua pela lógica real)
    await onSubmit(formData);

    setIsLoading(false);
    setFeedbackMessage('Dados atualizados com sucesso!');
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContentEdit}>
        <h2>Editar Dados do Cachorro</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <h3>Nome:</h3>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={styles.inputField}
            />
          </label>
          <label>
            <h3>Raça:</h3>
            <input
              type="text"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              required
              className={styles.inputField}
            />
          </label>
          <label>
            <h3>Gênero:</h3>
            <input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className={styles.inputField}
            />
          </label>
          <label>
            <h3>Tamanho</h3>
            <input
              type="text"
              name="size"
              value={formData.size}
              onChange={handleChange}
              required
              className={styles.inputField}
            />
          </label>
          <label>
            <h3>Idade:</h3>
            <input
              type="text"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              className={styles.inputField}
            />
          </label>
          <label>
            <h3>Descrição:</h3>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className={styles.inputField}
            />
          </label>
          <label>
            <h3>Requisitos Específicos:</h3> {/* Campo adicionado para requisitos específicos */}
            <textarea
              name="requirements"
              value={formData.requirements || ''}
              onChange={handleChange}
              placeholder="Descreva requisitos específicos para o cruzamento, como temperamento, tamanho preferido, etc."
              className={styles.inputField}
            />
          </label>
          <label>
            <h3>Foto do Cachorro:</h3>
            <input
              type="file"
              accept="image/*" // Aceitar apenas arquivos de imagem
              onChange={handleImageChange}
              className={styles.inputField}
            />
          </label>
          {image && <p>Arquivo selecionado: {image.name}</p>} {/* Exibir nome do arquivo selecionado */}

          <button type="submit" className={styles.submitButton}>
            {isLoading ? 'Salvando...' : 'Salvar Alterações'}
          </button>
          {feedbackMessage && <p className={styles.feedbackMessage}>{feedbackMessage}</p>}
        </form>
        <button onClick={onClose} className={styles.closeButton}>Fechar</button>
      </div>
    </div>
  );
};


const DogDetails = () => {
  const { id } = useParams();
  console.log(id)
  const { data, loading, error } =  useFetchCaoById(id)
  const navigate = useNavigate();
  const dog = data;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isHealthModalOpen, setIsHealthModalOpen] = useState(false);
  const [isEditingHealth, setIsEditingHealth] = useState(false); // Estado para alternar entre visualização e edição

  const [healthData, setHealthData] = useState(dog?.healthHistories || []);

  if (!dog) {
    return <div>Cachorro não encontrado!</div>;
  }

  const handleOpenHealthModal = () => {
    setIsHealthModalOpen(true);
  };

  const handleCloseHealthModal = () => {
    setIsHealthModalOpen(false);
    setIsEditingHealth(false); // Sempre fechar o modo de edição quando o modal for fechado
  };

  const handleContactClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenReportModal = () => {
    setIsReportModalOpen(true);
  };

  const handleCloseReportModal = () => {
    setIsReportModalOpen(false);
  };

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleReportSubmit = async (reason) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.error('Você precisa estar autenticado para enviar uma denúncia.');
      return;
    }

    const newReport = {
      dogId: name,
      userId: user.uid,
      reason,
      timestamp: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, 'dogReports'), newReport);
      console.log('Denúncia enviada com sucesso!');
    } catch (error) {
      console.error("Error adding report: ", error);
      console.error('Erro ao enviar a denúncia. Por favor, tente novamente.');
    }
  };

  const handleEditSubmit = async (updatedDogData) => {
    console.log('Dados atualizados:', updatedDogData);
  };

  const handleSaveHealthData = async (updatedHealthData) => {
    // Função para salvar os dados de saúde editados
    setHealthData(updatedHealthData); // Atualiza o estado local
    setIsEditingHealth(false); // Volta para o modo de visualização após salvar
  };

  const handleEditHealthClick = () => {
    setIsEditingHealth(true); // Ativa o modo de edição
  };

  const goToCreateAlbum = () => {
    navigate('/create-album');
  };

  const currentUrl = window.location.href;
  const shareText = "Confira este cachorrinho!";

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={dog.caminhoFoto.replace('../..', '')}  alt={dog.name} className={styles.dogImage}  />
        <h2 className={styles.CreateAlbum} onClick={goToCreateAlbum}>
        Ver álbum de fotos
        </h2>
      </div>
      <div className={styles.content}>
        <h1 className={styles.dogName}>
          {dog.name}, <span className={styles.dogBreed}>{dog.breed}</span>
          <div className={styles.reportIcon} onClick={handleOpenReportModal} title="Denunciar este cão">
            <FaExclamationTriangle className={styles.reportIconStyle} />
          </div>
          <div className={styles.editIcon} onClick={handleOpenEditModal} title="Editar este cão">
            <FaPencilAlt className={styles.editIconStyle} />
          </div>
        </h1>
        <div className={styles.details}>
          <p className={styles.detailItemPaw}>
            <img src={pawIcon} alt="Paw icon" className={styles.iconPaw} />
            {dog.gender} | {dog.size} | {dog.age} Anos
          </p>
          <p className={styles.detailItemLocation}>
            <img src={locationIcon} alt="Location icon" className={styles.iconLocation} />
            {dog.city}, {dog.state}
          </p>
          <p className={styles.detailItemDescription}>
            <img src={descriptionIcon} alt="Description icon" className={styles.iconDescription} />
            {dog.description}
          </p>
          <div className={styles.healthHistory}>
            <FaClipboard className={styles.clipboardIcon} onClick={handleOpenHealthModal} />
            <span className={styles.healthHistoryText} onClick={handleOpenHealthModal}>
              Histórico de Saúde
            </span>
            <FaPencilAlt
              className={styles.editIcon}
              onClick={handleEditHealthClick} // Ativa a edição ao clicar no ícone
              title="Editar Histórico de Saúde"
            />
          </div>
        </div>

        {/* Modal de histórico de saúde */}
        {isHealthModalOpen && (
          <HealthHistoryModal
            onClose={handleCloseHealthModal}
            healthData={healthData}
            isEditing={isEditingHealth} // Passa o estado de edição para o modal
            onSave={handleSaveHealthData}
          />
        )}

        <button className={styles.contactButton} onClick={handleContactClick}>
          Contato
        </button>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          Voltar
        </button>
        <ShareButtons url={currentUrl} text={shareText} />
      </div>

      {/* Modais */}
      {isModalOpen && <Modal onClose={handleCloseModal} owner={dog.owner} />}
      {isReportModalOpen && <ReportModal onClose={handleCloseReportModal} onSubmit={handleReportSubmit} />}
      {isEditModalOpen && <EditDogModal onClose={handleCloseEditModal} dog={dog} onSubmit={handleEditSubmit} />}
    </div>
  );
};

// Componente para o modal de histórico de saúde com visualização/edição
const HealthHistoryModal = ({ onClose, healthData, isEditing, onSave }) => {
  const [editableHealthData, setEditableHealthData] = useState(healthData);

  const handleChange = (e, section, index, field) => {
    const updatedData = { ...editableHealthData };
    updatedData[section][index][field] = e.target.value;
    setEditableHealthData(updatedData);
  };

  const handleSave = () => {
    onSave(editableHealthData);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContentHealth}>
        <h2>Histórico de Saúde</h2>

        {isEditing ? (
          <>
            <h3 className={styles.examCategory}>Exames:</h3>
            <ul>
              {editableHealthData.exams.map((exam, index) => (
                <li key={index} className={styles.examText}>
                  <input
                    type="text"
                    value={exam.type}
                    onChange={(e) => handleChange(e, "exams", index, "type")}
                  />{" "}
                  <input
                    type="date"
                    value={exam.date}
                    onChange={(e) => handleChange(e, "exams", index, "date")}
                  />{" "}
                  <input
                    type="text"
                    value={exam.result}
                    onChange={(e) => handleChange(e, "exams", index, "result")}
                  />
                  <span>Veterinário: </span>
                  <input
                    type="text"
                    value={exam.veterinarian}
                    onChange={(e) => handleChange(e, "exams", index, "veterinarian")}
                  />
                </li>
              ))}
            </ul>

            <h3 className={styles.examCategory}>Vacinas:</h3>
            <ul>
              {editableHealthData.vaccines.map((vaccine, index) => (
                <li key={index} className={styles.examText}>
                  <input
                    type="text"
                    value={vaccine.name}
                    onChange={(e) => handleChange(e, "vaccines", index, "name")}
                  />{" "}
                  <input
                    type="date"
                    value={vaccine.date}
                    onChange={(e) => handleChange(e, "vaccines", index, "date")}
                  />
                  <span>Próxima dose:</span>
                  <input
                    type="date"
                    value={vaccine.nextDose}
                    onChange={(e) => handleChange(e, "vaccines", index, "nextDose")}
                  />{" "}
                  <span>Veterinário:</span>
                  <input
                    type="text"
                    value={vaccine.veterinarian}
                    onChange={(e) => handleChange(e, "vaccines", index, "veterinarian")}
                  />
                </li>
              ))}
            </ul>

            <h3 className={styles.examCategory}>Condições de Saúde:</h3>
            <ul>
              {editableHealthData.conditions.map((condition, index) => (
                <li key={index} className={styles.examText}>
                  <input
                    type="text"
                    value={condition.name}
                    onChange={(e) => handleChange(e, "conditions", index, "name")}
                  />{" "}
                  <input
                    type="text"
                    value={condition.description}
                    onChange={(e) => handleChange(e, "conditions", index, "description")}
                  />{" "}
                  <span>Veterinário:</span>
                  <input
                    type="text"
                    value={condition.veterinarian}
                    onChange={(e) => handleChange(e, "conditions", index, "veterinarian")}
                  />
                </li>
              ))}
            </ul>

            <button className={styles.submitButton} onClick={handleSave}>
              Salvar Alterações
            </button>
          </>
        ) : (
          <>
            <h3 className={styles.examCategory}>Exames:</h3>
            <ul>
              {healthData.exams.map((exam, index) => (
                <li key={index} className={styles.examText}>
                  {exam.type} - {exam.date} - {exam.result} (Veterinário: {exam.veterinarian})
                </li>
              ))}
            </ul>

            <h3 className={styles.examCategory}>Vacinas:</h3>
            <ul>
              {healthData.vaccines.map((vaccine, index) => (
                <li key={index} className={styles.examText}>
                  {vaccine.name} - {vaccine.date} (Próxima dose: {vaccine.nextDose}, Veterinário: {vaccine.veterinarian})
                </li>
              ))}
            </ul>

            <h3 className={styles.examCategory}>Condições de Saúde:</h3>
            <ul>
              {healthData.conditions.map((condition, index) => (
                <li key={index} className={styles.examText}>
                  {condition.name} - {condition.description} (Veterinário: {condition.veterinarian})
                </li>
              ))}
            </ul>
          </>
        )}

        <button className={styles.closeButton} onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
};

export default DogDetails;
