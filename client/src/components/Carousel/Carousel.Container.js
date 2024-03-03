import React from 'react';
import "./Carousel.css";

import CarouselItem from './Carousel_Item';


function CarouselContainer(props) {
    //Make a function to parse out all the different Carousel items and then add them to the return statment.
    const carousel_items = [];

    for (var i = 0; i < props.decks.length; i += 1) {//Need to figure out what to replace this with so that we can loop through all the decks 
        carousel_items.push(<CarouselItem name={props.deck[i].name} description={props.deck[i].description} />)
    };

    return (
        <div class="container">
            <div class="carousel">
                {carousel_items}
            </div>
   
        </div>


    );
}

export default CarouselContainer;