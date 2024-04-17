import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_STUDYCARD, CREATE_STACK } from '../../utils/mutations.js';
import { GET_CURRENT_USER } from '../../utils/queries.js';
import './CardCreate.css';
import NavbarCC from '../../components/Navbar/NavbarCC.js';
import LineGenerator from '../../components/Lines/LineGenerator.js';
import AddToStackModal from '../../components/AddToStackModal/AddToStackModal.js';

export default function CardCreate() {
    const [front, setFront] = useState('');
    const [back, setBack] = useState('');
    const [stackId, setStackId] = useState('');
    const [newStackTitle, setNewStackTitle] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCreateCardSuccess = (data) => {
        console.log("Card created successfully:", data);
        setIsModalOpen(true);
    };

    const handleAddToStack = (stackId) => {
        // Logic to add the card to the selected stack

        setIsModalOpen(false);
    }

    const { data: stacksData, loading: stacksLoading, error: stacksError, refetch: refetchStacks } = useQuery(GET_CURRENT_USER);
    console.log(stacksData);
    const { data: currentUserData } = useQuery(GET_CURRENT_USER);

    const [createStudycard, { loading: creatingStudycard, error: creatingCardError }] = useMutation(CREATE_STUDYCARD, {
        onCompleted: (data) => {
            console.log("Card created successfully:", data);
            alert("Card created successfully!");
            window.location.href = '/card-create';
        },
        onError: (error) => {
            console.error("Error creating card:", error);
            alert("Error creating card: " + error.message);
        }
    });

    const [createStack, { error: creatingStackError }] = useMutation(CREATE_STACK, {
        onCompleted: (data) => {
            setStackId(data.createStack._id); //Sets the newly created stack as the selected stack
            refetchStacks();
        }
    });

    const handleCreateStack = (title) => {
        if (currentUserData && currentUserData.currentUser) {
            createStack({
                variables: {
                    input: {
                        title: newStackTitle,
                        category: "",
                        description: "",
                        author: currentUserData.currentUser._id
                    }
                }
            });
            setIsModalOpen(false);
         }

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted with:", { front, back });
        createStudycard({
            variables: {
                input: {
                    front,
                    back
                }
            },
            onCompleted: handleCreateCardSuccess, // this opens the modal upon successful card creation
        });
    };


    if (stacksLoading) return <p>Loading ...</p>
    if(stacksError) return <p>Error loading: {stacksError.message}</p>

    return (
        <div className="cardCreate-container">
            <header className="cardCreate-header">
                <h1>Create A <br></br>New Card</h1>
                <NavbarCC />
            </header>

            <div className="redLine-cc"></div>
            <div className="background-lines">
                <LineGenerator amount={25} colorClass="blue-line" />
            </div>

            <div className="form-cc">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="front" className="label-class">Front of the Studycard:</label>
                    <textarea
                        id="front"
                        className="input-class"
                        value={front}
                        onChange={(e) => setFront(e.target.value)}
                    />

                    <label htmlFor="back" className="label-class">Back of the Studycard:</label>
                    <textarea
                        id="back"
                        className="input-class"
                        value={back}
                        onChange={(e) => setBack(e.target.value)}
                    />
                    <button className="create-button" type="submit" disabled={creatingStudycard}>Create!</button>

                </form>
            </div>

            {creatingCardError && <p>Error creating card: {creatingCardError.message}</p>}

            <AddToStackModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreateStack={handleCreateStack}
                onAddToStack={handleAddToStack}
                stacks={stacksData ? stacksData.stacks : []}
            />
        </div>
    );
}


// {/* <input
// type="text"
// id="front"
// className="input-class"
// value={front}
// onChange={(e) => setFront(e.target.value)}
// /> */}