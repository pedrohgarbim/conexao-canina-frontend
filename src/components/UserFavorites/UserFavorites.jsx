// src/pages/UserFavorites.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFavoriteDogs } from '../api/dogService'; // Serviço para obter cães favoritos
import styles from './UserFavorites.module.css'; // Importando o CSS como módulo

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
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserFavorites;
