import React from 'react';
import Navbar from '../components/Navbar'
// import Header from "../components/Header_WIP/Header";
// import Footer from "../components/Footer_WIP/Footer";
import FlashcardStudy from "../components/FlashcardStudy/FlashcardStudy";
import { useQuery } from '@apollo/client';
import { FLASHCARDS } from '../utils/queries';

const Study = () => {
  const {data} = useQuery(FLASHCARDS);
  let home_flashcards;
  if(data) {
    home_flashcards = data
  }
  console.log(home_flashcards);
  return (
    <main>
    <Navbar />

      <div className="flex-row justify-center">
        <div>
          <h2>Study</h2>
          {home_flashcards? (
            <>
            <h1>there are some flashcards available</h1>
            {home_flashcards.flashcards.map((flashcard, index) => (
              <FlashcardStudy key={index} flashcards={flashcard}/>
            ))}
            </>
          ):
          (
            <h2>Loading</h2>
          )}

        </div>
      </div>
    </main>
  );
};

export default Study;