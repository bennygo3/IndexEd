import React, { useState } from 'react';

export default function FunFacts({ factTitle, factContent }) {
    const [isOpen, factIsOpen] = useState(false);

    const toggleModal = () => factIsOpen(!isOpen);
    return (
        <>
        <div className='ff-container' onClick={toggleModal}>
            <h2 className="material-symbols-outlined">psychology_alt</h2>
            <p>Fun Fact!</p>
        </div>

        {isOpen && (
            <div className='modal-backdrop'>
                <div className='modal-body' onClick={e => e.stopPropagation()}>
                    <h2>{factTitle}</h2>
                    <p>{factContent}</p>
                    <button onClick={toggleModal}>&times;</button>
                </div>

            </div>
        )}
        </>
    );
}