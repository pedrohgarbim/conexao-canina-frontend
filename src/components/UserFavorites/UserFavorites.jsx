// src/pages/UserFavorites.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFavoriteDogs, removeFavoriteDog } from '../api/dogService'; // Função de remoção adicionada
import styles from './UserFavorites.module.css'; // Importando CSS Modules
import { FaTimes } from 'react-icons/fa'; // Ícone de "x" para remover

const UserFavorites = () => {
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

    // Função para remover um cão dos favoritos
    const handleRemoveFavorite = async (dogId) => {
        try {
            await removeFavoriteDog(dogId); // Remove o favorito no backend
            setFavorites((prevFavorites) => 
                prevFavorites.filter((dog) => dog.id !== dogId) // Remove localmente da lista
            );
        } catch (error) {
            console.error('Error removing favorite dog:', error);
        }
    };

    return (
        <div className={styles.userFavoritesPage}>
            <h1 className={styles.userFavoritesTitle}>Meus Cães Favoritos</h1>
            {favorites.length === 0 ? (
                <p>Você ainda não tem cães favoritos.</p>
            ) : (
                <ul className={styles.userFavoritesList}>
                    {favorites.map((dog) => (
                        <li key={dog.id} className={styles.userFavoriteItem}>
                            <Link to={`/dogs/${dog.id}`}>
                                <div className={styles.userDogCard}>
                                    <img 
                                        src={dog.imageUrl} 
                                        alt={`${dog.name}`} 
                                        className={styles.userDogImage}
                                    />
                                    <div className={styles.userDogInfo}>
                                        <h2>{dog.name}</h2>
                                        <p>{dog.breed}</p>
                                    </div>
                                </div>
                            </Link>
                            {/* Botão de remover com ícone de "x" */}
                            <button 
                                onClick={() => handleRemoveFavorite(dog.id)}
                                className={styles.removeButton}
                                aria-label="Remover dos favoritos"
                            >
                                <FaTimes size={20} color="red" />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserFavorites;
