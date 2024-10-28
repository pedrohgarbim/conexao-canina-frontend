// src/pages/FavoritesPage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFavoriteDogs } from '../api/dogService'; // Serviço para obter cães favoritos

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const data = await getFavoriteDogs(); // Função para obter os favoritos
                setFavorites(data);
            } catch (error) {
                console.error('Error fetching favorite dogs:', error);
            }
        };

        fetchFavorites();
    }, []);

    return (
        <div className="favorites-page">
            <h1>Meus Favoritos</h1>
            {favorites.length === 0 ? (
                <p>Você ainda não tem cães favoritos.</p>
            ) : (
                <ul>
                    {favorites.map((dog) => (
                        <li key={dog.id}>
                            <Link to={`/dogs/${dog.id}`}>
                                <div className="dog-card">
                                    <h2>{dog.name}</h2>
                                    <p>Raça: {dog.breed}</p>
                                    <p>Idade: {dog.age} anos</p>
                                    <p>Likes: {dog.likes}</p>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FavoritesPage;
