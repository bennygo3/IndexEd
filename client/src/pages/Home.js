import React from 'react';
import './Home.css';

import Navbar from '../components/Navbar'

import HomeBody from "../components/HomeBody/index";
import SearchBar from "../components/SearchBar/index";


const Home = () => {
  // const categories = ["Sports", "Pokemon", "Games"];

  return (
    <main className="home-body">
      <div className="home-container">
      <h1 className="home-header">Index<span style={{ marginLeft: "10px" }}></span>Ed</h1>
      {/* <Navbar /> */}
      <div className="home-background">
        
        {/* <HomeBody /> */}
        {/* <SearchBar categories={categories} /> */}
      </div>
      </div>
    </main>
  );
};

export default Home;