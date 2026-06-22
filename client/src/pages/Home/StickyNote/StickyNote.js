import React from 'react';
import "./StickyNote.css";

export default function StickyNote({
    children,
    color = "rgb(255, 248, 179)",
    width = "100%",
    height="100%",
    className = "",
}) {
    return (
        <div 
            className={`sticky-note ${className}`}
            style={{
                backgroundColor: color,
                width,
                height,
            }}
        >
            {children}
        </div>
    );
}