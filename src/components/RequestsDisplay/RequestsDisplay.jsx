import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { format, subDays, subMonths } from 'date-fns';
import styles from './RequestsDisplay.module.css';

const RequestsDisplay = () => {
  const [requestCount, setRequestCount] = useState(0);
  const [statistics, setStatistics] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('lastWeek');

  const fetchStatistics = (period) => {
    // Simulação de chamada à API para buscar estatísticas baseadas no período
    let startDate;
    if (period === 'lastWeek') {
      startDate = subDays(new Date(), 7);
    } else if (period === 'lastMonth') {
      startDate = subMonths(new Date(), 1);
    } else {
      startDate = subDays(new Date(), 30); // Período personalizado (ajustável)
    }

    // Simulação de dados
    const stats = Array.from({ length: 7 }, (_, i) => ({
      date: format(subDays(new Date(), 6 - i), 'yyyy-MM-dd'),
      requests: Math.floor(Math.random() * 50),
    }));
    setStatistics(stats);
  };

  useEffect(() => {
    // WebSocket para número de solicitações
    const socket = new WebSocket('wss://example.com/requests'); // Substitua pelo endpoint real

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'updateRequestCount') {
        setRequestCount(data.count);
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    // Fechar o socket ao desmontar o componente
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    fetchStatistics(selectedPeriod);
  }, [selectedPeriod]);

  const handlePeriodChange = (event) => {
    setSelectedPeriod(event.target.value);
  };

  const chartData = {
    labels: statistics.map((stat) => stat.date),
    datasets: [
      {
        label: 'Solicitações',
        data: statistics.map((stat) => stat.requests),
        borderColor: '#0078d4',
        backgroundColor: 'rgba(0, 120, 212, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Data',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Solicitações',
        },
      },
    },
  };

  return (
    <div className={styles.requestsDisplayContainer}>
      <div className={styles.requestsDisplayIcon}>
        <span role="img" aria-label="Solicitações">
          📩
        </span>
      </div>
      <div className={styles.requestsDisplayText}>
        <span>Solicitações:</span>
        <span className={styles.requestsDisplayCount}>{requestCount}</span>
      </div>

      <div className={styles.periodSelector}>
        <label htmlFor="period">Período:</label>
        <select id="period" value={selectedPeriod} onChange={handlePeriodChange}>
          <option value="lastWeek">Última semana</option>
          <option value="lastMonth">Último mês</option>
          <option value="custom">Período personalizado</option>
        </select>
      </div>

      <div className={styles.chartContainer}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default RequestsDisplay;
