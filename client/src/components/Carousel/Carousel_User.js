import React from 'react';
import CarouselContainer from './Carousel_Container';
import {Deck, Flashcard, User} from '../../../../server/models';
import {USER_DECKS} from '../../utils/queries'
import { useQuery } from '@apollo/client';

function CarouselHome(props){
    const {loading, data} = useQuery(USER_DECKS);
    const user_decks = data;
    console.log(user_decks);


    return(
       <CarouselContainer decks={user_decks} />
    );

}


export default CarouselHome;