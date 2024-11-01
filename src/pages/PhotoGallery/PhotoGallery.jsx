import React, { useState } from 'react';
import styles from './PhotoGallery.module.css';

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);

  // Função para manipular o upload de fotos
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = files.map((file) => ({
      url: URL.createObjectURL(file),
      file,
    }));
    setPhotos([...photos, ...newPhotos]); // Adiciona novas fotos ao array existente
  };

  // Função para remover uma foto
  const handleRemovePhoto = (index) => {
    const updatedPhotos = [...photos];
    updatedPhotos.splice(index, 1); // Remove a foto pelo índice
    setPhotos(updatedPhotos);
  };

  return (
    <div>
      {/* Input para adicionar novas fotos */}
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handlePhotoUpload}
        className={styles.fileInput} // Aplicando a classe
      />

      {/* Pré-visualização da galeria de fotos */}
      <div className={styles.gallery}>
        {photos.map((photo, index) => (
          <div key={index} className={styles.photoContainer}>
            <img src={photo.url} alt={`dog-photo-${index}`} className={styles.photo} />
            <button onClick={() => handleRemovePhoto(index)} className={styles.removeButton}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
