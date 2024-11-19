import React, { useEffect, useState } from 'react';
import styles from './RequestsDisplay.module.css';

const RequestsDisplay = () => {
  const [requestCount, setRequestCount] = useState(0);

  useEffect(() => {
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

    return () => {
      socket.close();
    };
  }, []);

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
    </div>
  );
};

export default RequestsDisplay;
