import React, { useState } from 'react';
import './CreateAlbum.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const CreateAlbum = () => {
    const [albumName, setAlbumName] = useState('');
    const [description, setDescription] = useState('');
    const [photos, setPhotos] = useState([]);
    const [previewPhotos, setPreviewPhotos] = useState([]);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setPhotos((prevPhotos) => [...prevPhotos, ...files]);
        const previewUrls = files.map(file => URL.createObjectURL(file));
        setPreviewPhotos((prevUrls) => [...prevUrls, ...previewUrls]);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const files = Array.from(event.dataTransfer.files);
        setPhotos((prevPhotos) => [...prevPhotos, ...files]);
        const previewUrls = files.map(file => URL.createObjectURL(file));
        setPreviewPhotos((prevUrls) => [...prevUrls, ...previewUrls]);
    };

    const removePhoto = (index) => {
        setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
        setPreviewPhotos((prevUrls) => prevUrls.filter((_, i) => i !== index));
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const reorderedPhotos = Array.from(previewPhotos);
        const [removed] = reorderedPhotos.splice(result.source.index, 1);
        reorderedPhotos.splice(result.destination.index, 0, removed);
        setPreviewPhotos(reorderedPhotos);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('albumName', albumName);
        formData.append('description', description);
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
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="photos">
                        {(provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps} className="preview">
                                {previewPhotos.map((photo, index) => (
                                    <Draggable key={index} draggableId={`photo-${index}`} index={index}>
                                        {(provided) => (
                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="photo-item">
                                                <img src={photo} alt="Preview" width="100" />
                                                <button type="button" onClick={() => removePhoto(index)}>Remover</button>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
                <button className="CreateAlbumButton" type="submit">Criar Álbum</button>
            </form>
        </div>
    );
};

export default CreateAlbum;
