import React from 'react';
import { Link } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import './trivia-carousel.css';

function TriviaItem({ genre, description, imageUrl, linkUrl, component }) {
    return (
        <>
            <div className="carousel-item">
                <div className="carousel-group">
                    {/* <h1 className="carousel-title">{genre}</h1> */}
                    <Link to={linkUrl}>
                        {/* <img src={imageUrl} alt={`snapshot of ${genre}`} /> */}
                        {imageUrl ? (
                            <img src={imageUrl} alt={`snapshot of ${genre}`} />
                        ) : component ? (
                            component
                        ) : null}
                    </Link>
                    <p className="carousel-info">{description}</p>
                </div>
            </div>
        </>
    );
};

export default function TriviaCarousel({ genres, activeIndex, setActiveIndex }) {
    const updateIndex = (newIndex) => {
        const adjustedIndex = newIndex < 0
            ? genres.length - 1
            : newIndex>= genres.length
                ? 0
                : newIndex;
        setActiveIndex(adjustedIndex);
    }

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
                        onClick={() => updateIndex(index)}>
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