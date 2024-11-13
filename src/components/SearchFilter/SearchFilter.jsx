import React, { useState, useEffect } from 'react';
import styles from './SearchFilter.module.css';

const SearchFilter = ({ updateSearchRadius, updateSortOption }) => {
  const [radius, setRadius] = useState(10); // Raio padrão de 10 km
  const [sortOption, setSortOption] = useState('Mais Próximo'); // Opção de ordenação padrão
  const [userLocation, setUserLocation] = useState(null); // Armazenar a localização do usuário
  const [errorMessage, setErrorMessage] = useState(''); // Para armazenar erros de geolocalização
  const [manualLocation, setManualLocation] = useState({ latitude: '', longitude: '' }); // Localização manual

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

  // Solicita a localização automática do usuário
  const requestUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setErrorMessage(''); // Limpa a mensagem de erro se a geolocalização for bem-sucedida
        },
        (error) => {
          setErrorMessage('Permissão negada ou erro ao acessar a localização.');
        }
      );
    } else {
      setErrorMessage('Geolocalização não é suportada pelo navegador.');
    }
  };

  // Manipula a mudança de localização manual
  const handleManualLocationChange = (e) => {
    const { name, value } = e.target;
    setManualLocation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
          <option value="Menos Likes">Menos Likes</option>
          <option value="Mais Likes">Mais Likes</option>
        </select>
      </div>

      <div className={styles.filterSection}>
        {/* Botão para solicitar geolocalização automática */}
        <button onClick={requestUserLocation} className={styles.button}>
          Usar Minha Localização Atual
        </button>
        {userLocation && (
          <p className={styles.locationInfo}>
            Localização Detectada: Latitude {userLocation.latitude}, Longitude {userLocation.longitude}
          </p>
        )}
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      </div>

      <div className={styles.filterSection}>
        {/* Campo para definir localização manual */}
        <h4 className={styles.label}>Definir Localização Manualmente:</h4>
        <label htmlFor="manualLatitude" className={styles.label}>
          Latitude:
        </label>
        <input
          type="number"
          id="manualLatitude"
          name="latitude"
          value={manualLocation.latitude}
          onChange={handleManualLocationChange}
          className={styles.input}
        />
        <label htmlFor="manualLongitude" className={styles.label}>
          Longitude:
        </label>
        <input
          type="number"
          id="manualLongitude"
          name="longitude"
          value={manualLocation.longitude}
          onChange={handleManualLocationChange}
          className={styles.input}
        />
      </div>
    </div>
  );
};

export default SearchFilter;
