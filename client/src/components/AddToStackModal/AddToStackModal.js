import React, { useState } from 'react';

const AddToStackModal = ({ isOpen, onClose, onCreateStack, onAddToStack, stacks, cardId }) => {
    const [newStackTitle, setNewStackTitle] = useState('');
    const [selectedStackId, setSelectedStackId] = useState('');

    const handleCreateStack = async () => {
        const newStackId = await onCreateStack(newStackTitle);
        if (newStackId) {
            onAddToStack(newStackId, cardId);
            onClose();
        }
    };

    const handleAddToStack = () => {
        onAddToStack(selectedStackId, cardId);
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
                    value={selectedStackId}
                    onChange={(e) => setSelectedStackId(e.target.value)}
                >
                    <option value="">Select a stack</option>
                    {stacks.map((stack) => (
                        <option key={stack._id} value={stack._id}>
                            {stack.title}
                        </option>
                    ))}
                </select>
                <button onClick={handleAddToStack}>Add to Selected Stack</button>
                <hr />
                <input
                    type="text"
                    value={newStackTitle}
                    onChange={(e) => setNewStackTitle(e.target.value)}
                    placeholder="New Stack Title"
                />
                <button onClick={handleCreateStack}>Create New Stack</button>
            </div>
        </div>
    );
};

export default AddToStackModal;