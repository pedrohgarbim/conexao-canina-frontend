import React, { useState, useEffect } from 'react';
import styles from './SearchFilter.module.css';

const SearchFilter = ({ updateSearchRadius }) => {
  const [radius, setRadius] = useState(10); // Default radius of 10 km

  // Atualiza o valor do raio conforme o slider ou campo de texto é ajustado
  const handleRadiusChange = (e) => {
    const newRadius = e.target.value;
    setRadius(newRadius);
  };

  // Chama a função de atualização dos resultados quando o raio muda
  useEffect(() => {
    updateSearchRadius(radius);
  }, [radius, updateSearchRadius]);

  return (
    <div className={styles.searchFilterContainer}>
      <h3 className={styles.title}>Definir Raio de Busca</h3>

      <div className={styles.filterSection}>
        {/* Slider para definir o raio de busca */}
        <input
          type="range"
          min="1"
          max="100"
          value={radius}
          onChange={handleRadiusChange}
          className={styles.slider}
        />
        <span className={styles.radiusLabel}>{radius} km</span>
      </div>

      <div className={styles.filterSection}>
        {/* Campo de texto para editar o raio manualmente */}
        <label htmlFor="radiusInput" className={styles.label}>
          Raio de Busca (km):
        </label>
        <input
          type="number"
          id="radiusInput"
          value={radius}
          onChange={handleRadiusChange}
          className={styles.input}
          min="1"
          max="100"
        />
      </div>
    </div>
  );
};

export default SearchFilter;
