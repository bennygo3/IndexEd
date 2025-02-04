import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_STUDYCARD, CREATE_STUDYCARD_GROUP } from '../../utils/mutations.js';
import { GET_CURRENT_USER } from '../../utils/queries.js';
import './CardCreate.css';
import NavbarCC from '../../components/Navbar/NavbarCC.js';
import LineGenerator from '../../components/Lines/LineGenerator.js';
import AddToStackModal from '../../components/AddToStackModal/AddToStackModal.js';

export default function CardCreate() {
    const [front, setFront] = useState('');
    const [back, setBack] = useState('');
    const [studyCardGroupId, setStudyCardGroupId] = useState('');
    const [newGroupTitle, setNewGroupTitle] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCreateCardSuccess = (data) => {
        console.log("Card created successfully:", data);
        setIsModalOpen(true);
    };

    const handleAddToGroup= (studyCardGroupId) => {
        setStudyCardGroupId(studyCardGroupId);
        setIsModalOpen(false);
    }

    const { data: currentUserData, loading: studyCardsLoading, error: studyCardsError, refetch: refetchGroups } = useQuery(GET_CURRENT_USER);
    console.log(currentUserData);
    // const { data: currentUserData } = useQuery(GET_CURRENT_USER);

    const [createStudycard, { loading: creatingStudycard, error: creatingCardError }] = useMutation(CREATE_STUDYCARD, {
        onCompleted: handleCreateCardSuccess,
        onError: (error) => {
            console.error("Error creating card:", error);
            alert("Error creating card: " + error.message);
        }
    });

    const [createStudyCardGroup, { error: creatingGroupError }] = useMutation(CREATE_STUDYCARD_GROUP, {
        onCompleted: (data) => {
            setStudyCardGroupId(data.createStudyCardGroup._id);
            refetchGroups();
        }
    });

    const handleCreateGroup = () => {
        if (currentUserData?.getCurrentUser) {
            createStudyCardGroup({
                variables: {
                    title: newGroupTitle,
                    category: "",
                    description: "",
                }
            });
            setIsModalOpen(false);
        }
    }

    // const [createStudycard, { loading: creatingStudycard, error: creatingCardError }] = useMutation(CREATE_STUDYCARD, {
    //     onCompleted: (data) => {
    //         console.log("Card created successfully:", data);
    //         alert("Card created successfully!");
    //         window.location.href = '/card-create';
    //     },
    //     onError: (error) => {
    //         console.error("Error creating card:", error);
    //         alert("Error creating card: " + error.message);
    //     }
    // });

    // const [createStack, { error: creatingStackError }] = useMutation(CREATE_STUDYCARD_GROUP, {
    //     onCompleted: (data) => {
    //         setStackId(data.createStack._id); //Sets the newly created stack as the selected stack
    //         refetchStacks();
    //     }
    // });

    // const handleCreateStack = (title) => {
    //     if (currentUserData && currentUserData.currentUser) {
    //         createStack({
    //             variables: {
    //                 input: {
    //                     title: newStackTitle,
    //                     category: "",
    //                     description: "",
    //                     author: currentUserData.currentUser._id
    //                 }
    //             }
    //         });
    //         setIsModalOpen(false);
    //      }

    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted with:", { front, back, studyCardGroupId });
        createStudycard({
            variables: {
                    front,
                    back,
                    studyCardGroupId,
            }
            // onCompleted: handleCreateCardSuccess, // this opens the modal upon successful card creation
        });
    };


    if (studyCardsLoading) return <p>Loading ...</p>
    if(studyCardsError) return <p>Error loading: {studyCardsError.message}</p>

    return (
        <main>
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
                    <label htmlFor="newGroupTitle" className="label-class">New Group Title:</label>
                    <input
                        id="newGroupTitle"
                        className="input-class"
                        value={newGroupTitle}
                        onChange={(e) => setNewGroupTitle(e.target.value)}
                    />
                    <button className="create-button" type="submit" disabled={creatingStudycard}>Create!</button>

                </form>
            </div>

            {creatingCardError && <p>Error creating card: {creatingCardError.message}</p>}
            {creatingGroupError && <p>Error creating study card group: {creatingGroupError.message}</p>}
            <AddToStackModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreateStack={handleCreateGroup}
                onAddToStack={handleAddToGroup}
                studyCardGroups={currentUserData?.getCurrentUser?.studyCardGroups || []}
            />
        
        </main>
    );
}