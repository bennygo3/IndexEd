import React, { useState, useEffect } from 'react';
import './simon-says.css';

const colors = ['yellow', 'blue', 'green', 'red'];
// yellow = top left, blue = top right, green = bottom right, red = bottom left

export default function SimonSays() {
    const [sequence, setSequence] = useState([]);
    const [userSequence, setUserSequence] = useState([]);
    const [isUserTurn, setIsUserTurn] = useState(false);
}