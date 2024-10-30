import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RequestsPage.module.css'; // Estilo para a página de solicitações

const RequestsPage = () => {
  const navigate = useNavigate();
  
  // Aqui você pode usar um estado para armazenar as solicitações de cruzamento
  const [requests, setRequests] = React.useState([
    { id: 1, dogName: 'Rex', user: 'Maria' },
    { id: 2, dogName: 'Fido', user: 'João' },
  ]);

  // Função para aceitar uma solicitação
  const acceptRequest = (id) => {
    // Lógica para aceitar a solicitação
    alert(`Solicitação de ${id} aceita.`);
    // Remover ou atualizar a solicitação do estado
    setRequests(requests.filter(request => request.id !== id));
  };

  // Função para rejeitar uma solicitação
  const rejectRequest = (id) => {
    // Lógica para rejeitar a solicitação
    alert(`Solicitação de ${id} rejeitada.`);
    // Remover ou atualizar a solicitação do estado
    setRequests(requests.filter(request => request.id !== id));
  };

  return (
    <div className={styles.requestsContainer}>
      <h1>Solicitações de Cruzamento</h1>
      {requests.length === 0 ? (
        <p>Você não tem solicitações de cruzamento.</p>
      ) : (
        requests.map((request) => (
          <div key={request.id} className={styles.requestCard}>
            <h3>{request.dogName}</h3>
            <p>Solicitante: {request.user}</p>
            <button onClick={() => acceptRequest(request.id)}>Aceitar</button>
            <button onClick={() => rejectRequest(request.id)}>Rejeitar</button>
          </div>
        ))
      )}
      <button onClick={() => navigate('/user-page')}>Voltar</button>
    </div>
  );
};

export default RequestsPage;
