import React from 'react';
import "./Flashcard_Study.css";


function FlashcardStudy(props) {
    let card_index = 0;

    function FlipCard() {
        document.querySelector(".SideB").classList.toggle("hide");
        document.querySelector(".SideA").classList.toggle("hide");
    }


    //decrements the card index value which will change the contents of the displayed flashcard.
    function Prev_Card(total_cards, card_index) {
        if (card_index !== 0) {
            card_index -= 1;
        } else {
            card_index = total_cards;
        }
    }

    //increments the card index value which will change the contents of the displayed flashcard.
    function Next_Card(total_cards) {
        if (card_index !== 0) {
            card_index -= 1;
        } else {
            card_index = total_cards;
        }
    }
    //index that will let us loop through all the cards.

    //need to figure out what exactly is passed into this function so that we can properly set up the props calls.
    // as of right now I am using the card index let to loop through all of the cards in the deck. 

    return (
        <div className="container row flashcard_study valign-wrapper">
            <div className="col s2 button_holder right-align">
                <button className="waves-effect waves-light btn flow-text valign-wrapper" onClick={() => Prev_Card(props.flashcards.length, card_index)}><i className="material-icons">arrow_back</i></button>
            </div>
            <div className="col s8">
                <div className="card">
                    <div className="card-content">
                        <div className="Study center-align SideA" id="SideA">
                            <div>{props.flashcards.sideA}</div>
                            
                            <button className="waves-effect waves-light btn flow-text" id="SideA_btn" onClick={() => FlipCard()}><i className="material-icons">autorenew</i></button>

                        </div>
                        <div className="Study center-align hide SideB" id="SideB">
                            <div>{props.flashcards.sideB}</div>
                            <button className="waves-effect waves-light btn flow-text" id="SideB_btn" onClick={() => FlipCard()}><i className="material-icons ">autorenew</i></button>
                        </div>

                    </div>
                </div>
            </div>
            <div className="col s2 button_holder">
                <button className="waves-effect waves-light btn flow-text valign-wrapper" onClick={() => Next_Card(props.flashcards.length, card_index)}><i className="material-icons">arrow_forward</i></button>
            </div>
        </div>
    )
}
export default FlashcardStudy;

//important!!! need to change the buttons to an onclick to prevent them from doing what they are doing now ie fading with each click
// also need to change class to className