import React from 'react';
import "./HomeBody.css";
import CardBckg from "../../assets/whiteIndex.png";
import CarouselItem from '../Carousel.Item';
import { useQuery } from '@apollo/client';
import { HOME_DECKS } from '../../utils/queries';


const HomeBody = () => {
    const { loading, data } = useQuery(HOME_DECKS);

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="container">
            <img id="homeCard" alt="background of flashcards" src={CardBckg}></img>
            <img id="homeCard1" alt="background of flashcards" src={CardBckg}></img>
            <img id="homeCard2" alt="background of flashcards" src={CardBckg}></img>
            <div className="carousel row">
                {data && data.decks.map(deck => (
                    <CarouselItem key={deck._id} name={deck.title} description={deck.description} />
                ))}
            </div>
        </div>
    );
};

export default HomeBody;