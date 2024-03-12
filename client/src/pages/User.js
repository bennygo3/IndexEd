import React from 'react';
// import Header from "../components/Header_WIP/Header";
// import Footer from "../components/Footer_WIP/Footer";
import Navbar from '../components/Navbar/Navbar'
// import CarouselUser from "../components/CarouselUser/index";
import SearchBar from '../components/SearchBar/index'


const User = () => {
  const categories = ["Sports", "Pokemon", "Games"];
  return (
    <>
    <main>

    <Navbar />
      <div className="flex-row justify-center">
        <div>
          <h2>User page</h2>
          {/* <CarouselUser/> */}
          <SearchBar categories={categories}/>
        </div>
        
      </div>
    </main>
    </>
  );
};

export default User;