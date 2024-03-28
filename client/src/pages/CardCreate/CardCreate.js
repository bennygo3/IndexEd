import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_STUDYCARD, CREATE_STACK } from '../../utils/mutations.js';
import { GET_USER_STACKS } from '../../utils/queries.js';
import './CardCreate.css';
import NavbarCC from '../../components/Navbar/NavbarCC.js';



const CardCreate = () => {
    const [front, setFront] = useState('');
    const [back, setBack] = useState('');
    const [stackId, setStackId] = useState('');
    const [newStackTitle, setNewStackTitle] = useState('');

    const { data: stacksData, loading: stacksLoading, error: stacksError, refetch: refetchStacks } = useQuery(GET_USER_STACKS);
    const [createStudycard, { loading: creatingStudycard, error: creatingError }] = useMutation(CREATE_STUDYCARD, {
        onCompleted: () => {

        },
        onError: (error) => {

        }
    });

    const [createStack, ]
    
    const handleSubmit = (e) => {
        e.preventDefault();
        createStudycard({
            variables:{
                front,
                back,
                stackId
            }
        });
    };
   
    

    return(
        <>
            <header className="cardCreate-header">
                <h1>Create A <br></br>New Card</h1>
                <NavbarCC />
            </header>
            
            <div className="redLine-CC"></div>

            <form onSubmit={handleSubmit}>
                <label htmlFor="front">Front of the Studycard:</label>
                <input 
                    type="text"
                    id="front"
                    value={front}
                    onChange={(e) => setFront(e.target.value)}
                />

                <label htmlFor="back">Back of the Studycard:</label>
                <input
                    type="text"
                    id="back"
                    value={back}
                    onChange={(e) => setBack(e.target.value)}
                />
            </form>

            <button type="submit">Create!</button>

        </>
    )
}

export default CardCreate