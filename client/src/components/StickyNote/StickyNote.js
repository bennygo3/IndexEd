import React from 'react';
import "./StickyNote.css";

const StickyNote = (props) => {
    return (
        <div className="sticky-note">
            {props.children}
        </div>

    )
}

export default StickyNote;