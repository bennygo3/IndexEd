import React, { useState } from 'react';

export default function FunFacts({ factTitle, factContent }) {
    const [isOpen, factIsOpen] = useState(false);

    const toggleModal = () => factIsOpen(!isOpen);
    return (
        <>
        <div className='ff-container'>
            <h2 className="material-symbols-outlined">psychology_alt</h2>
            <p>Fun Fact!</p>
        </div>

        {isOpen && (
            <div>
                
            </div>
        )}
        </>
    );
}