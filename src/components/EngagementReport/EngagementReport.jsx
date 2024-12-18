import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import styles from './EngagementReport.module.css';

const EngagementReport = () => {
  const navigate = useNavigate();
  const [selectedReport, setSelectedReport] = useState('engagement');
  const [period, setPeriod] = useState('daily');
  const [filter, setFilter] = useState({ device: 'all', location: 'all' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Verificação de autenticação
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // Verifique se o usuário é um administrador (pode ser baseado em um campo no Firebase ou Firestore)
        firebase
          .firestore()
          .collection('users')
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.exists && doc.data().role === 'admin') {
              setIsAuthenticated(true);
              setIsAdmin(true);
            } else {
              setIsAuthenticated(false);
              navigate('/login'); // Redireciona para o login se não for admin
            }
          });
      } else {
        setIsAuthenticated(false);
        navigate('/login'); // Redireciona para o login se não estiver autenticado
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleReportChange = (report) => {
    setSelectedReport(report);
    setLoading(true);
    setError('');
    setSuccessMessage('');
    setTimeout(() => {
      setLoading(false);
      setSuccessMessage(`Dados de ${report} carregados com sucesso.`);
    }, 1000);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const handlePeriodChange = (event) => {
    setPeriod(event.target.value);
    setLoading(true);
    setError('');
    setSuccessMessage('');
    setTimeout(() => {
      setLoading(false);
      setSuccessMessage('Filtro de período aplicado com sucesso.');
    }, 1000);
  };

  if (!isAuthenticated) {
    return <p>Carregando...</p>; // Exibe uma mensagem de carregamento enquanto autentica
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Painel de Relatórios</h1>

      {/* Navegação entre relatórios */}
      <div className={styles.nav}>
        <button
          className={`${styles.navButton} ${selectedReport === 'engagement' ? styles.active : ''}`}
          onClick={() => handleReportChange('engagement')}
        >
          Relatório de Engajamento
        </button>
        <button
          className={`${styles.navButton} ${selectedReport === 'access' ? styles.active : ''}`}
          onClick={() => handleReportChange('access')}
        >
          Relatório de Acesso
        </button>
        <button
          className={`${styles.navButton} ${selectedReport === 'performance' ? styles.active : ''}`}
          onClick={() => handleReportChange('performance')}
        >
          Relatório de Performance
        </button>
      </div>

      {/* Feedback visual */}
      {loading && <p className={styles.loading}>Carregando...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {successMessage && <p className={styles.success}>{successMessage}</p>}

      {/* Filtros */}
      <div className={styles.filters}>
        <label htmlFor="period" className={styles.label}>Período:</label>
        <select
          id="period"
          className={styles.select}
          value={period}
          onChange={handlePeriodChange}
        >
          <option value="daily">Diário</option>
          <option value="weekly">Semanal</option>
          <option value="monthly">Mensal</option>
        </select>

        <label htmlFor="device" className={styles.label}>Dispositivo:</label>
        <select
          id="device"
          className={styles.select}
          name="device"
          value={filter.device}
          onChange={handleFilterChange}
        >
          <option value="all">Todos</option>
          <option value="mobile">Celular</option>
          <option value="desktop">Desktop</option>
        </select>

        <label htmlFor="location" className={styles.label}>Localização:</label>
        <select
          id="location"
          className={styles.select}
          name="location"
          value={filter.location}
          onChange={handleFilterChange}
        >
          <option value="all">Todas</option>
          <option value="usa">EUA</option>
          <option value="brazil">Brasil</option>
          <option value="europe">Europa</option>
        </select>
      </div>

      {/* Exibição do relatório ativo */}
      <div className={styles.reportContainer}>
        {selectedReport === 'engagement' && (
          <p>Exibindo dados de Engajamento (mock).</p>
        )}
        {selectedReport === 'access' && (
          <p>Exibindo dados de Acesso ao Site (mock).</p>
        )}
        {selectedReport === 'performance' && (
          <p>Exibindo dados de Performance Técnica (mock).</p>
        )}
      </div>
    </div>
  );
};

export default EngagementReport;
