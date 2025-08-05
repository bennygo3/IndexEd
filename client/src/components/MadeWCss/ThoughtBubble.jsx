import React from 'react';
import "./thoughtBubble.css";

const ThoughtBubble = () => {
    return (
        <div className="thought-bubble-container"> 
            <div className="main-bubble"></div>
            <div className="main-bubble-text">No material to study yet. Start by creating some study cards for review!</div> 
            {/* <div className="main-bubble">No material to study yet. Start by creating some study cards for review!</div>  */}
            <div className="small-bubble one" />
            <div className="small-bubble two" />
        </div>
    );
};

export default ThoughtBubble;