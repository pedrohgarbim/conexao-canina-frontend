import React, { useState } from 'react';
import styles from './EngagementReport.module.css';

const EngagementReport = () => {
  const [period, setPeriod] = useState('daily');
  const [trafficData, setTrafficData] = useState(null);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState({ device: 'all', location: 'all' });

  const handlePeriodChange = (event) => {
    setPeriod(event.target.value);
    // Simular carregamento de dados de engajamento
    fetchEngagementData(event.target.value);
  };

  const handleFilterChange = (key, value) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
    // Simular carregamento de dados filtrados
    fetchTrafficData(filter.device, filter.location);
  };

  const fetchEngagementData = (selectedPeriod) => {
    if (selectedPeriod === 'daily') {
      setTrafficData({ visits: 120, pages: ['Home', 'About'], sessionTime: [5, 7, 10] });
      setError('');
    } else if (selectedPeriod === 'weekly') {
      setTrafficData({ visits: 700, pages: ['Home', 'Contact'], sessionTime: [6, 8, 12] });
      setError('');
    } else if (selectedPeriod === 'monthly') {
      setTrafficData({ visits: 3000, pages: ['Home', 'Products'], sessionTime: [4, 6, 11] });
      setError('');
    } else {
      setTrafficData(null);
      setError('Nenhum dado disponível para o período selecionado.');
    }
  };

  const fetchTrafficData = (device, location) => {
    // Simulação de carregamento de dados de tráfego
    console.log(`Filtrando por dispositivo: ${device}, localização: ${location}`);
  };

  const exportReport = (format) => {
    alert(`Relatório exportado como ${format.toUpperCase()}`);
    // Implementação real incluiria a lógica de geração de arquivo
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Relatório de Engajamento e Acesso</h1>

      {/* Filtros de período */}
      <div className={styles.filters}>
        <label htmlFor="period" className={styles.label}>Filtrar por período:</label>
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
      </div>

      {/* Filtros de dispositivo e localização */}
      <div className={styles.trafficFilters}>
        <label htmlFor="device" className={styles.label}>Dispositivo:</label>
        <select
          id="device"
          className={styles.select}
          value={filter.device}
          onChange={(e) => handleFilterChange('device', e.target.value)}
        >
          <option value="all">Todos</option>
          <option value="mobile">Mobile</option>
          <option value="desktop">Desktop</option>
        </select>

        <label htmlFor="location" className={styles.label}>Localização:</label>
        <select
          id="location"
          className={styles.select}
          value={filter.location}
          onChange={(e) => handleFilterChange('location', e.target.value)}
        >
          <option value="all">Global</option>
          <option value="us">EUA</option>
          <option value="br">Brasil</option>
          <option value="eu">Europa</option>
        </select>
      </div>

      {/* Dados ou mensagens de feedback */}
      <div className={styles.graphContainer}>
        {error ? (
          <p className={styles.error}>{error}</p>
        ) : trafficData ? (
          <div className={styles.graph}>
            <p>Número de visitas: {trafficData.visits}</p>
            <p>Páginas mais acessadas: {trafficData.pages.join(', ')}</p>
            <p>Tempo médio de sessão: {trafficData.sessionTime.join(', ')} minutos</p>
          </div>
        ) : (
          <p className={styles.loading}>Carregando dados...</p>
        )}
      </div>

      {/* Botões de exportação */}
      <div className={styles.exportContainer}>
        <button
          className={styles.exportButton}
          onClick={() => exportReport('csv')}
        >
          Exportar como CSV
        </button>
        <button
          className={styles.exportButton}
          onClick={() => exportReport('pdf')}
        >
          Exportar como PDF
        </button>
      </div>
    </div>
  );
};

export default EngagementReport;
