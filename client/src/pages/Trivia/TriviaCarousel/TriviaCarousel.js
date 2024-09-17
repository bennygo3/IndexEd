import React from 'react';
import { Link } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';

function TriviaItem({ genre, description, imageUrl, linkUrl, component }) {
    return (
        <div className="trivia-item">
            {/* <h1 className="carousel-title">{genre}</h1> */}
            <Link to={linkUrl}>
                {imageUrl ? (
                    <img src={imageUrl} alt={`snapshot of ${genre}`} />
                ) : component ? (
                    component
                ) : null}
            </Link>
            <p className="trivia-description">{description}</p>
        </div>
    );
};

export default function TriviaCarousel({ genres, activeIndex, setActiveIndex }) {
    const updateIndex = (newIndex) => {
        const adjustedIndex = newIndex < 0
            ? genres.length - 1
            : newIndex >= genres.length
                ? 0
                : newIndex;
        setActiveIndex(adjustedIndex);
    }

    const handlers = useSwipeable({
        onSwipedLeft: () => updateIndex(activeIndex + 1),
        onSwipedRight: () => updateIndex(activeIndex - 1)
    });

    const previousIndex = (activeIndex - 1 + genres.length) % genres.length;
    const nextIndex = (activeIndex + 1) % genres.length;

    return (
        <div {...handlers} >

            <div className="t-card left">
                <TriviaItem {...genres[previousIndex]} />
            </div>
            <div className="t-card center">
                <TriviaItem {...genres[activeIndex]} />
            </div>
            <div className="t-card right">
                <TriviaItem {...genres[nextIndex]} />
            </div>

            <div className="carousel-indicators">
                <button className="left-button"
                    onClick={() => updateIndex(activeIndex - 1)}>
                    <span className="left-arrow">&#9756;</span>
                </button>

                {genres.map((_, index) => (
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