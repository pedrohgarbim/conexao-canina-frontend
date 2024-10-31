import React, { useEffect, useState } from 'react';
import './DogProfile.module.css';

const DogProfile = ({ dogId }) => {
    const [albums, setAlbums] = useState([]);
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    
    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = await fetch(`/api/dogs/${dogId}/albums`);
                if (response.ok) {
                    const data = await response.json();
                    setAlbums(data);
                } else {
                    console.error('Erro ao buscar álbuns');
                }
            } catch (error) {
                console.error('Erro:', error);
            }
        };

        fetchAlbums();
    }, [dogId]);

    const handleAlbumClick = (album) => {
        setSelectedAlbum(album);
    };

    const closeAlbum = () => {
        setSelectedAlbum(null);
    };

    return (
        <div className="dog-profile">
            <h2>Álbuns de Fotos do Cachorro</h2>
            <div className="albums">
                {albums.map((album) => (
                    <div key={album.id} className="album" onClick={() => handleAlbumClick(album)}>
                        <h3>{album.albumName}</h3>
                        <p>{album.description}</p>
                        <img src={album.coverPhoto} alt={album.albumName} width="150" />
                    </div>
                ))}
            </div>

            {selectedAlbum && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeAlbum}>&times;</span>
                        <h3>{selectedAlbum.albumName}</h3>
                        <p>{selectedAlbum.description}</p>
                        <div className="photos">
                            {selectedAlbum.photos.map((photo, index) => (
                                <img key={index} src={photo} alt={`Foto ${index + 1}`} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DogProfile;


// app.get('/api/dogs/:dogId/albums', async (req, res) => {
//     const { dogId } = req.params;
    
//     // Aqui você deve buscar os álbuns de fotos no banco de dados com base no dogId
//     try {
//         const albums = await Album.find({ dogId }); // Exemplo de busca no MongoDB
//         res.json(albums);
//     } catch (error) {
//         console.error('Erro ao buscar álbuns:', error);
//         res.status(500).json({ message: 'Erro ao buscar álbuns' });
//     }
// });
