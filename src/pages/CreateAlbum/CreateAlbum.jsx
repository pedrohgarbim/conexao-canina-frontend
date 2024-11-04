import React, { useState } from 'react';
import PhotoGallery from '../../pages/PhotoGallery/PhotoGallery'; // Importa o componente de galeria de fotos
import { useAuthValue } from '../../context/AuthContext'; // Importa o hook do contexto de autenticação
import './CreateAlbum.css';

const CreateAlbum = () => {
    const [albumName, setAlbumName] = useState('');
    const [description, setDescription] = useState('');
    const [photos, setPhotos] = useState([]); // Fotos gerenciadas no estado do álbum
    const [visibility, setVisibility] = useState('all'); // Estado para visibilidade
    const [feedbackMessage, setFeedbackMessage] = useState(''); // Estado para mensagem de feedback
    const { user, isAuthenticated } = useAuthValue(); // Obtém usuário e status de autenticação do contexto

    // Função de callback para o componente PhotoGallery para adicionar fotos
    const handlePhotosUpdate = (newPhotos) => {
        setPhotos(newPhotos);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('albumName', albumName);
        formData.append('description', description);
        formData.append('visibility', visibility); // Adiciona visibilidade ao FormData
        photos.forEach(photo => {
            formData.append('photos', photo.file); // Adiciona cada foto
        });

        try {
            const response = await fetch('/api/albums', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setFeedbackMessage('Álbum criado com sucesso!');
                setAlbumName('');
                setDescription('');
                setPhotos([]);
                setVisibility('all'); // Reseta visibilidade
            } else {
                setFeedbackMessage('Erro ao criar álbum. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro:', error);
            setFeedbackMessage('Erro ao criar álbum. Tente novamente.');
        }
    };

    // Função para ampliar a imagem ao clicar
    const enlargeImage = (photoUrl) => {
        const newWindow = window.open(photoUrl, '_blank');
        if (newWindow) newWindow.focus();
    };

    // Função para otimizar o carregamento das imagens
    const optimizedImageUrl = (url) => {
        // Exemplo de URL otimizada, depende da sua infraestrutura
        return `${url}?w=800&h=800&auto=format`;
    };

    // // Verifica se o usuário está autenticado
    // if (!isAuthenticated) {
    //     return (
    //         <div className="access-denied">
    //             <h2>Acesso Negado</h2>
    //             <p>Você não tem permissão para criar álbuns. Por favor, faça login para continuar.</p>
    //             <button onClick={() => window.location.href = '/entrar'}>Ir para Login</button>
    //         </div>
    //     );
    // }

    return (
        <div className="create-album">
            <h2>Criar Novo Álbum</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="albumName">Nome do Álbum:</label>
                    <input
                        type="text"
                        id="albumName"
                        value={albumName}
                        onChange={(e) => setAlbumName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Descrição:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="visibility">Visibilidade:</label>
                    <select
                        id="visibility"
                        value={visibility}
                        onChange={(e) => setVisibility(e.target.value)}
                    >
                        <option value="all">Todos os usuários</option>
                        <option value="registered">Apenas usuários registrados</option>
                        <option value="specific">Apenas usuários específicos</option>
                    </select>
                </div>
                {visibility === 'specific' && (
                    <div>
                        <label htmlFor="specificUsers">Usuários Específicos:</label>
                        <input
                            type="text"
                            id="specificUsers"
                            placeholder="Digite os nomes ou IDs dos usuários separados por vírgula"
                        />
                    </div>
                )}

                {/* Renderiza a galeria de fotos aqui */}
                <PhotoGallery 
                    photos={photos.map(photo => ({
                        ...photo,
                        url: optimizedImageUrl(photo.url) // Carrega as imagens otimizadas
                    }))}
                    setPhotos={handlePhotosUpdate}
                    onClickPhoto={enlargeImage} // Amplia a imagem ao clicar
                />

                <button className="CreateAlbumButton" type="submit">Criar Álbum</button>

                {/* Exibe a mensagem de feedback */}
                {feedbackMessage && <p className="feedback-message">{feedbackMessage}</p>}
            </form>
        </div>
    );
};

export default CreateAlbum;
