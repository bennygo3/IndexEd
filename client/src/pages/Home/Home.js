import React from 'react';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar';

const Home = () => {
  return (
    <main className="home-body">
      <div className="home-container">
        <h1 className="home-header">Index<span style={{ marginLeft: "10px" }}></span>Ed</h1>
          <div className="home-background">
            <div className="red-line"></div>
            <Navbar />
      
          </div>
      </div>
    </main>
  );
};

export default Home;