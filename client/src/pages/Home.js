import React from 'react';
import './Home.css';
// import indexCard from "../components/Assets/whiteIndex.png";
import Navbar from '../components/Navbar'
// import Header from "../components/Header_WIP/Header";
// import Footer from "../components/Footer_WIP/Footer";
// import NavBar from "../components/NavBar/NavBar";
import HomeBody from "../components/HomeBody/index";
import SearchBar from "../components/SearchBar/index";


const Home = () => {
  const categories = ["Sports", "Pokemon", "Games"];

  return (
    <main>
      {/* <img src={indexCard} alt='index card background'></img> */}
      <Navbar />
      <div>
        <h2 id="homeHeader">Index<span style={{ marginLeft: "10px" }}></span>Ed</h2>
        <HomeBody />
        <SearchBar categories={categories} />
      </div>

    </main>
  );
};

export default Home;