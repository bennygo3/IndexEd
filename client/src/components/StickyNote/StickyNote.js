import React from 'react';
import "./StickyNote.css";

export default function StickyNote(props) {
    return (
        <div className="sticky-note">
            {props.children}
        </div>

    )
};