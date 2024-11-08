// src/pages/UserFavorites.jsx
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getFavoriteDogs, removeFavoriteDog } from '../api/dogService';
import styles from './UserFavorites.module.css';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify'; // Importando toast para notificações

const UserFavorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const data = await getFavoriteDogs();
                setFavorites(data);
            } catch (error) {
                console.error('Error fetching favorite dogs:', error);
                if (error.response && error.response.status === 401) {
                    history.push('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, [history]);

    // Função para remover um cão dos favoritos
    const handleRemoveFavorite = async (dogId) => {
        try {
            await removeFavoriteDog(dogId);
            setFavorites((prevFavorites) => 
                prevFavorites.filter((dog) => dog.id !== dogId)
            );
            toast.success('Cão removido dos favoritos!'); // Notificação de sucesso
        } catch (error) {
            console.error('Error removing favorite dog:', error);
            toast.error('Erro ao remover o favorito. Tente novamente.'); // Notificação de erro
        }
    };

    if (loading) {
        return <div>Carregando seus favoritos...</div>;
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
