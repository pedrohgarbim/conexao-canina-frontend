// src/DogProfileReview.js

import React, { useEffect, useState } from 'react';

// Simulação de dados
const mockDogProfiles = [
  {
    id: 1,
    name: 'Rex',
    breed: 'Labrador',
    age: 3,
    description: 'Cachorro amigável e ativo.',
    status: 'pending',
  },
  {
    id: 2,
    name: 'Bella',
    breed: 'Poodle',
    age: 2,
    description: 'Cachorro inteligente e amoroso.',
    status: 'pending',
  },
];

const DogProfileReview = () => {
  const [dogProfiles, setDogProfiles] = useState([]);

  useEffect(() => {
    // Simula a busca de perfis pendentes de revisão
    setDogProfiles(mockDogProfiles);
  }, []);

  const handleApprove = (id) => {
    // Logica para aprovar o perfil
    console.log(`Aprovado: ${id}`);
    // Atualiza o estado
    setDogProfiles((prev) => prev.filter((profile) => profile.id !== id));
  };

  const handleReject = (id, reason) => {
    // Logica para rejeitar o perfil com motivo
    console.log(`Rejeitado: ${id}, Motivo: ${reason}`);
    // Atualiza o estado
    setDogProfiles((prev) => prev.filter((profile) => profile.id !== id));
  };

  const handleRequestModification = (id) => {
    // Logica para solicitar modificações
    console.log(`Solicitar modificações para: ${id}`);
  };

  return (
    <div className="dog-profile-review">
      <h1>Revisão de Perfis de Cachorros</h1>
      {dogProfiles.length === 0 ? (
        <p>Não há perfis pendentes de revisão.</p>
      ) : (
        dogProfiles.map((profile) => (
          <div key={profile.id} className="dog-profile">
            <h2>{profile.name}</h2>
            <p><strong>Raça:</strong> {profile.breed}</p>
            <p><strong>Idade:</strong> {profile.age} anos</p>
            <p><strong>Descrição:</strong> {profile.description}</p>
            <div className="actions">
              <button onClick={() => handleApprove(profile.id)}>Aprovar</button>
              <button onClick={() => handleReject(profile.id, prompt('Motivo da rejeição:'))}>Rejeitar</button>
              <button onClick={() => handleRequestModification(profile.id)}>Solicitar Modificações</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default DogProfileReview;
