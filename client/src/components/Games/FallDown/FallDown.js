import { useState, useEffect } from 'react';
import './fall-down.css';

function Ball({ x, y }) {
    return <div className='ball' style={{ left: x, top: y }} />
}

function Floor({ x, y }) {
    return <div className='floor' style={{ left: x, top: y }} />
}

function Arena() {
    
}

