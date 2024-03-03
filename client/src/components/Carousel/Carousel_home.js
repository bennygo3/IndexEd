import React from 'react';
import CarouselContainer from './Carousel_Container';
// import {Deck, Flashcard, User} from '../../../../server/models';
import {HOME_DECKS} from '../../utils/queries'
import { useQuery } from '@apollo/client';

function CarouselHome(props){
    const {loading, data} = useQuery(HOME_DECKS);
    const home_decks = data;
    console.log(home_decks);


    return(
        <CarouselContainer decks={home_decks} />
    );

}


export default CarouselHome;