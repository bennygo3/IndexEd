import React, { useState } from 'react';

export default function AddToStackModal({ isOpen, onClose, onCreateGenre, onAddToGenre, studyGenres, cardId }) {
    const [newGenreTitle, setNewGenreTitle] = useState('');
    const [selectedGenreId, setSelectedGenreId] = useState('');

    const handleCreateGenre = async () => {
        const newGenreId = await onCreateGenre(newGenreTitle);
        if (newGenreId) {
            onAddToGenre(newGenreId, cardId);
            onClose();
        }
    };

    const handleAddToGenre = () => {
        onAddToGenre(selectedGenreId, cardId);
        onClose();
    };

    if(!isOpen) {
        return null;
    }

    return(
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Add Card to Stack</h2>
                <select 
                    value={selectedGenreId}
                    onChange={(e) => setSelectedGenreId(e.target.value)}
                >
                    <option value="">Select a Genre</option>
                    {studyGenres.map((genre) => (
                        <option key={genre._id} value={genre._id}>
                            {genre.title}
                        </option>
                    ))}
                </select>
                <button onClick={handleAddToGenre}>Add to Selected Genre</button>
                <hr />
                <input
                    type="text"
                    value={newGenreTitle}
                    onChange={(e) => setNewGenreTitle(e.target.value)}
                    placeholder="New Genre Title"
                />
                <button onClick={handleCreateGenre}>Create New Genre</button>
            </div>
        </div>
    );
};