import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import './trivia-carousel.css';

const TriviaItem = ({ genre, description, imageUrl, linkUrl }) => {
    return (
        <>
            <div className="carousel-item">
                <div className="carousel-group">
                    <h1 className="carousel-title">{genre}</h1>
                    <p className="carousel-info">{description}</p>
                    <Link to={linkUrl}>
                        <img src={imageUrl} alt={`snapshot of ${genre}`} />
                    </Link>
                </div>
            </div>
        </>
    );
};

const TriviaCarousel = ({ genres }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const updateIndex = (newIndex) => {
        if (newIndex < 0) {
            newIndex = genres.length - 1;
        } else if (newIndex >= genres.length) {
            newIndex = 0;
        }
        setActiveIndex(newIndex);
    };

    const handlers = useSwipeable({
        onSwipedLeft: () => updateIndex(activeIndex + 1),
        onSwipedRight: () => updateIndex(activeIndex - 1)
    });

    return (
        <div {...handlers} className="carousel">
            <div className="carousel-inner" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
                {genres.map((genre, index) => (
                    <TriviaItem key={index} {...genre} />
                ))}
            </div>
            <div className="carousel-indicators">
                <button className="left-button"
                    onClick={() => updateIndex(activeIndex - 1)}>
                    <span className="left-arrow">&#9756;</span>
                </button>

                {genres.map((genre, index) => (
                    <button
                        key={index}
                        className={index === activeIndex ? "active" : ""}
                        onCLick={() => updateIndex(index)}>
                        {index + 1}
                    </button>
                ))}

                <button className="right-button"
                    onClick={() => updateIndex(activeIndex + 1)}>
                    <span className="right-arrow">&#9758;</span>
                </button>
            </div>
        </div>
    );
};

export default TriviaCarousel;