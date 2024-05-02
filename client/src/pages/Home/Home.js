import React from 'react';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar.js';
import LineGenerator from '../../components/Lines/LineGenerator.js';
import LogoutButton from '../../components/Logout/LogoutButton.js';

export default function Home(){
  return (
    <main className="home-body">
      <div className="home-container">
        <h1 className="home-header">Index<span style={{ marginLeft: "10px" }}></span>Ed</h1>
        <LogoutButton />
        <div className="home-background">
          
          <div className="red-line"></div>
          <LineGenerator amount={17} colorClass="blue-line" />
          <Navbar className="navbar-home"/>
        </div>
      </div>
    </main>
  );
};