// src/pages/FavoritesPage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFavoriteDogs, toggleFavoriteDog } from '../api/dogService';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const data = await getFavoriteDogs();
                setFavorites(data);
            } catch (error) {
                console.error('Error fetching favorite dogs:', error);
            }
        };

        fetchFavorites();
    }, []);

    const handleToggleFavorite = async (dogId) => {
        try {
            const updatedFavorites = await toggleFavoriteDog(dogId);
            setFavorites(updatedFavorites);
        } catch (error) {
            console.error('Error toggling favorite status:', error);
        }
    };

    return (
        <div className="favorites-page">
            <h1 className="favorites-title">Meus Favoritos</h1> {/* Adicionada classe única */}
            {favorites.length === 0 ? (
                <p>Você ainda não tem cães favoritos.</p>
            ) : (
                <ul className="favorites-list"> {/* Adicionada classe única */}
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
                            <button 
                                onClick={() => handleToggleFavorite(dog.id)}
                                className="favorite-button"
                                aria-label={dog.isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                            >
                                {dog.isFavorite ? (
                                    <FaHeart color="red" size={24} />
                                ) : (
                                    <FaRegHeart color="grey" size={24} />
                                )}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FavoritesPage;
