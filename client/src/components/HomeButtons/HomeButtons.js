import React from 'react';
import { Link } from 'react-router-dom';
import './HomeButtons.css';

export default function HomeButtons({ color, to }) {
  return (
    <Link to={to} className="home-button-link">
      <div className="home-buttons" style={{ backgroundColor: color }}>
        <div className="inner-button"></div>
      </div>
    </Link>
  );
}