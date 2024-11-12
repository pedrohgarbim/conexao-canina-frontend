import React, { useState, useEffect } from 'react';
import styles from './SearchFilter.module.css';

const SearchFilter = ({ updateSearchRadius, updateSortOption }) => {
  const [radius, setRadius] = useState(10); // Default radius of 10 km
  const [sortOption, setSortOption] = useState('Mais Próximo'); // Default sort option

  // Atualiza o valor do raio conforme o slider ou campo de texto é ajustado
  const handleRadiusChange = (e) => {
    const newRadius = e.target.value;
    setRadius(newRadius);
  };

  // Atualiza a opção de ordenação
  const handleSortChange = (e) => {
    const newSortOption = e.target.value;
    setSortOption(newSortOption);
  };

  // Chama a função de atualização dos resultados quando o raio muda
  useEffect(() => {
    updateSearchRadius(radius);
  }, [radius, updateSearchRadius]);

  // Chama a função de atualização dos resultados quando a ordenação muda
  useEffect(() => {
    updateSortOption(sortOption);
  }, [sortOption, updateSortOption]);

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

      <div className={styles.filterSection}>
        {/* Opção de ordenação */}
        <label htmlFor="sortOption" className={styles.label}>
          Ordenar por:
        </label>
        <select id="sortOption" value={sortOption} onChange={handleSortChange} className={styles.select}>
          <option value="Mais Próximo">Mais Próximo</option>
          {/* Adicione outras opções de ordenação conforme necessário */}
        </select>
      </div>
    </div>
  );
};

export default SearchFilter;
