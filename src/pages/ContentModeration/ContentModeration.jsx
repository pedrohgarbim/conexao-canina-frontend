// src/ContentModeration.js

import React, { useEffect, useState } from 'react';

// Simulação de dados de perfis e conteúdos
const mockProfiles = [
  {
    id: 1,
    name: 'Rex',
    images: [
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150/FF0000',
    ],
    status: 'active',
  },
  {
    id: 2,
    name: 'Bella',
    images: [
      'https://via.placeholder.com/150/00FF00',
      'https://via.placeholder.com/150/0000FF',
    ],
    status: 'active',
  },
];

const ContentModeration = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    // Simula a busca de perfis e conteúdos
    setProfiles(mockProfiles);
  }, []);

  const handleMarkInappropriate = (id) => {
    // Logica para marcar conteúdo como impróprio
    console.log(`Conteúdo impróprio marcado para: ${id}`);
  };

  const handleNotifyUser = (id) => {
    const message = prompt('Mensagem para notificar o usuário:');
    // Logica para notificar usuário
    if (message) {
      console.log(`Usuário notificado para: ${id}, Mensagem: ${message}`);
    }
  };

  const handleBlockProfile = (id) => {
    // Logica para bloquear temporariamente o perfil
    console.log(`Perfil bloqueado temporariamente: ${id}`);
    setProfiles((prev) => prev.map(profile => 
      profile.id === id ? { ...profile, status: 'blocked' } : profile
    ));
  };

  return (
    <div className="content-moderation">
      <h1>Moderação de Conteúdo</h1>
      {profiles.length === 0 ? (
        <p>Não há perfis a revisar.</p>
      ) : (
        profiles.map((profile) => (
          <div key={profile.id} className="profile">
            <h2>{profile.name}</h2>
            <div className="images">
              {profile.images.map((image, index) => (
                <img key={index} src={image} alt={`${profile.name} - ${index}`} />
              ))}
            </div>
            <div className="actions">
              <button onClick={() => handleMarkInappropriate(profile.id)}>Marcar Impróprio</button>
              <button onClick={() => handleNotifyUser(profile.id)}>Notificar Usuário</button>
              <button onClick={() => handleBlockProfile(profile.id)}>Bloquear Perfil</button>
            </div>
            <p>Status: {profile.status}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ContentModeration;
