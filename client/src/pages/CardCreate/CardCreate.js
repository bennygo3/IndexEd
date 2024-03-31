import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_STUDYCARD, CREATE_STACK } from '../../utils/mutations.js';
import { GET_USER_STACKS } from '../../utils/queries.js';
import './CardCreate.css';
import NavbarCC from '../../components/Navbar/NavbarCC.js';
import LineGenerator from '../../components/Lines/LineGenerator.js';

const CardCreate = () => {
    const [front, setFront] = useState('');
    const [back, setBack] = useState('');
    const [stackId, setStackId] = useState('');
    const [newStackTitle, setNewStackTitle] = useState('');

    const { data: stacksData, loading: stacksLoading, error: stacksError, refetch: refetchStacks } = useQuery(GET_USER_STACKS);

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

    const [createStack, { loading: creatingStack, error: creatingStackError }] = useMutation(CREATE_STACK, {
        onCompleted: (data) => {
            setStackId(data.createStack._id); //Sets the newly created stack as the selected stack
            refetchStacks();
        }
    });

    const handleCreateStack = () => {
        createStack({
            variables: {
                title: newStackTitle
            }
        });
    };
    console.log({ front, back, stackId });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted with:", { front, back, stackId });
        createStudycard({
            variables: {
                front,
                back,
                stackId
            }
        });
    };

    // if (stacksLoading) return <p>Loading ...</p>
    // if(stacksError) return <p>Error loading: {stacksError.message}</p>

    return (
        <div className="cardCreate-container">
            <header className="cardCreate-header">
                <h1>Create A <br></br>New Card</h1>
                <NavbarCC />
            </header>

            <div className="redLine-cc"></div>
            <div className="background-lines">
                <LineGenerator amount={0} colorClass="blue-line" />
            </div>

            <div className="form-cc">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="front" className="label-class">Front of the Studycard:</label>
                    <input
                        type="text"
                        id="front"
                        className="input-class"
                        value={front}
                        onChange={(e) => setFront(e.target.value)}
                    />

                    <label htmlFor="back" className="label-class">Back of the Studycard:</label>
                    <input
                        type="text"
                        id="back"
                        className="input-class"
                        value={back}
                        onChange={(e) => setBack(e.target.value)}
                    />

                    <button className="create-button" type="submit" disabled={creatingStudycard}>Create!</button>
                    {stacksData && stacksData.stacks.length > 0 ? (
                        <select
                            id="stack"
                            value={stackId}
                            onChange={(e) => setStackId(e.target.value)}
                        >
                            <option value="">Select a stack</option>
                            {stacksData.stacks.map((stack) => (
                                <option key={stack._id} value={stack._id}>
                                    {stack.title}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <div>
                            <label htmlFor="newStackTitle">New Stack Title:</label>
                            <input
                                type="text"
                                id="newStackTitle"
                                value={newStackTitle}
                                onChange={(e) => setNewStackTitle(e.target.value)}
                            />
                            <button type="button" onClick={handleCreateStack} disabled={creatingStack}>
                                Create New Stack
                            </button>
                        </div>
                    )}
                </form>
            </div>


            {creatingCardError && <p>Error creating card: {creatingCardError.message}</p>}
        </div>
    )
}

export default CardCreate