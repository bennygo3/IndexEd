import React from 'react';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar';

const Home = () => {
  
  const generateLines = (amount, colorClass) => {
    const lines =[];
    const spacing = 25;
    for (let i = 0; i < amount; i++) {
      const linePosition = 100 + i * spacing;
      lines.push(
        <div 
          key={i} 
          className={colorClass}
          style={{ top: `${linePosition}px`}}
        ></div>
      );
    }
    return lines;
  };
  return (
    <main className="home-body">
      <div className="home-container">
        <h1 className="home-header">Index<span style={{ marginLeft: "10px" }}></span>Ed</h1>
          <div className="home-background">
            <div className="red-line"></div>
            {generateLines(17, "blue-line")}
            <Navbar />
      
          </div>
      </div>
    </main>
  );
};

export default Home;