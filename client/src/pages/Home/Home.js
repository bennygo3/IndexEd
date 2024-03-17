import React from 'react';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar.js';
import LineGenerator from '../../components/Lines/LineGenerator.js'

const Home = () => {
  return (
    <main className="home-body">
      <div className="home-container">
        <h1 className="home-header">Index<span style={{ marginLeft: "10px" }}></span>Ed</h1>
         
        <div className="home-background">
        
          <div className="red-line"></div>
          <LineGenerator amount={17} colorClass="blue-line" />
          <Navbar />
          {/* <span className="emoji">🤓</span> */}
        </div>
      </div>
    </main>
  );
};

export default Home;