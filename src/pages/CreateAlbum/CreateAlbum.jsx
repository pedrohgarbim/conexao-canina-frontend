import React, { useState } from 'react';
import './CreateAlbum.css';

const CreateAlbum = () => {
    const [albumName, setAlbumName] = useState('');
    const [description, setDescription] = useState('');
    const [photos, setPhotos] = useState([]);
    const [previewPhotos, setPreviewPhotos] = useState([]);
    const [visibility, setVisibility] = useState('all'); // Estado para visibilidade

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setPhotos(files);
        const previewUrls = files.map(file => URL.createObjectURL(file));
        setPreviewPhotos(previewUrls);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const files = Array.from(event.dataTransfer.files);
        setPhotos(files);
        const previewUrls = files.map(file => URL.createObjectURL(file));
        setPreviewPhotos(previewUrls);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('albumName', albumName);
        formData.append('description', description);
        formData.append('visibility', visibility); // Adiciona visibilidade ao FormData
        photos.forEach(photo => {
            formData.append('photos', photo);
        });

        try {
            const response = await fetch('/api/albums', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Álbum criado com sucesso!');
                setAlbumName('');
                setDescription('');
                setPhotos([]);
                setPreviewPhotos([]);
                setVisibility('all'); // Reseta visibilidade
            } else {
                alert('Erro ao criar álbum. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao criar álbum. Tente novamente.');
        }
    };

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
                <div
                    className="upload-area"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                >
                    <p>Arraste e solte suas fotos aqui ou selecione-as:</p>
                    <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                    />
                </div>
                <div className="preview">
                    {previewPhotos.map((photo, index) => (
                        <img key={index} src={photo} alt="Preview" width="100" />
                    ))}
                </div>
                <button className="CreateAlbumButton" type="submit">Criar Álbum</button>
            </form>
        </div>
    );
};

export default CreateAlbum;

// EXEMPLO DE COMO LINKAR NO BACKEND

// app.post('/api/albums', (req, res) => {
//     const { albumName, description, visibility } = req.body;

//     // Lógica para salvar o álbum, incluindo a configuração de visibilidade
//     const newAlbum = {
//         albumName,
//         description,
//         visibility,
//         // outras propriedades...
//     };

//     // Salve o novo álbum no banco de dados
//     // ...

//     res.status(201).json({ message: 'Álbum criado com sucesso!' });
// });

