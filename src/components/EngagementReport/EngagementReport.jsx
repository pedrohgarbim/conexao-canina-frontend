import React, { useState } from 'react';
import styles from './EngagementReport.module.css';

const EngagementReport = () => {
  const [period, setPeriod] = useState('daily');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const handlePeriodChange = (event) => {
    setPeriod(event.target.value);
    // Simulação de carregamento de dados
    fetchData(event.target.value);
  };

  const fetchData = (selectedPeriod) => {
    // Simular consulta de dados
    if (selectedPeriod === 'daily') {
      setData([50, 30, 20]); // Exemplo de dados
      setError('');
    } else if (selectedPeriod === 'weekly') {
      setData([200, 150, 100]);
      setError('');
    } else if (selectedPeriod === 'monthly') {
      setData([800, 600, 400]);
      setError('');
    } else {
      setData(null);
      setError('Nenhum dado disponível para o período selecionado.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Relatório de Engajamento</h1>
      
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

      <div className={styles.graphContainer}>
        {error ? (
          <p className={styles.error}>{error}</p>
        ) : data ? (
          <div className={styles.graph}>
            {/* Simulação de gráfico */}
            <p>Dados do gráfico: {data.join(', ')}</p>
          </div>
        ) : (
          <p className={styles.loading}>Carregando dados...</p>
        )}
      </div>
    </div>
  );
};

export default EngagementReport;
