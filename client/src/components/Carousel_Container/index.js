import React, { Component } from 'react';
// import { M } from 'materialize-css/dist/js/materialize.min.js';
// import "./Carousel.css";
import Carousel_Item from '../Carousel.Item';


import M from "materialize-css";

class Carousel extends Component {
    componentDidMount() {
        const options = {
            numVisible: 10,
            padding: 10,
            dist:-100,
            duration: 200,
        };
        M.Carousel.init(this.Carousel, options);
    }
    render() {
        return (
            <div className="container">
                <div ref={Carousel => { this.Carousel = Carousel; }} className="carousel row">
                    {(this.props.decks.decks).map((title,description, i) => (
                            <Carousel_Item key={ i} name={title} description={description} />
                            
                    ))}
                    
                </div>
            </div>


        );
    }
}

export default Carousel;