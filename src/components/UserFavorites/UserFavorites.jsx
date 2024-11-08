// src/pages/UserFavorites.jsx
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getFavoriteDogs, removeFavoriteDog } from '../api/dogService';
import styles from './UserFavorites.module.css';
import { FaTimes } from 'react-icons/fa';

const UserFavorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true); // Adicionando estado de carregamento
    const history = useHistory();

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const data = await getFavoriteDogs();
                setFavorites(data);
            } catch (error) {
                console.error('Error fetching favorite dogs:', error);
                // Redirecionar o usuário para o login se o token não for válido
                if (error.response && error.response.status === 401) {
                    history.push('/login'); // Redirecionar para a página de login
                }
            } finally {
                setLoading(false); // Concluído o carregamento
            }
        };

        fetchFavorites();
    }, [history]);

    const handleRemoveFavorite = async (dogId) => {
        try {
            await removeFavoriteDog(dogId);
            setFavorites((prevFavorites) => 
                prevFavorites.filter((dog) => dog.id !== dogId)
            );
        } catch (error) {
            console.error('Error removing favorite dog:', error);
        }
    };

    if (loading) {
        return <div>Carregando seus favoritos...</div>; // Mostra enquanto os favoritos estão carregando
    }

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
