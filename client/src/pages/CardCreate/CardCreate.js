import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_STUDYCARD, CREATE_STUDYGENRE } from '../../utils/mutations.js';
import { GET_CURRENT_USER } from '../../utils/queries.js';
import './CardCreate.css';
import NavbarCC from '../../components/Navbar/NavbarCC.js';
import LineGenerator from '../../components/Lines/LineGenerator.js';
import AddToStackModal from '../../components/AddToStackModal/AddToStackModal.js';

export default function CardCreate() {
    const [front, setFront] = useState('');
    const [back, setBack] = useState('');
    const [studyGenreId, setStudyGenreId] = useState('');
    const [newGenreTitle, setNewGenreTitle] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCreateCardSuccess = (data) => {
        console.log("Card created successfully:", data);
        setIsModalOpen(true);
    };

    const handleAddToGenre = (studyGenreId) => {
        console.log("📌 handleAddToGroup: Setting studyCardGroupId:", studyGenreId);
        setStudyGenreId(studyGenreId);
        setIsModalOpen(false);
    }

    const { data: currentUserData, loading: studyGenresLoading, error: studyGenresError, refetch: refetchGenres } = useQuery(GET_CURRENT_USER);
    console.log(currentUserData);
    // const { data: currentUserData } = useQuery(GET_CURRENT_USER);

    const [createStudyCard, { loading: creatingStudyCard, error: creatingCardError }] = useMutation(CREATE_STUDYCARD, {
        onCompleted: handleCreateCardSuccess,
        onError: (error) => {
            console.error("Error creating card:", error);
            alert("Error creating card: " + error.message);
        }
    });

    const [createStudyGenre, { error: creatingGenreError }] = useMutation(CREATE_STUDYGENRE, {
        onCompleted: (data) => {
            console.log("✅ New Study Genre Created:", data.createStudyGenre);
            setStudyGenreId(data.createStudyGenre._id);
            refetchGenres();
        }
    });

    const handleCreateGenre = async () => {
        if (currentUserData?.getCurrentUser) {
            try {
                const { data } = await createStudyGenre({
                    variables: {
                        title: newGenreTitle,
                        category: "",
                        description: "",
                    }
                });
                if (data?.createStudyGenre?._id) {
                    console.log('📌 handleCreateGenre: New studyGenreId set:', data.createStudyGenre._id);
                    setStudyGenreId(data.createStudyGenre._id);
                } else {
                    console.error("❌ handleCreateGroup: Failed to create a new study card group!")
                }
                // onCompleted: (data) => {
                //     console.log("📌 handleCreateGroup: New studyCardGroupId set:", data.createStudyCardGroup._id);
                //     setStudyCardGroupId(data.createStudyCardGroup._id);
                // }
                // });
                setIsModalOpen(false);
            } catch (error) {
                console.error("❌ handleCreateGroup Error:", error)
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('📌 handleSubmit: studyGenreId before mutation:', studyGenreId)

        if (!studyGenreId) {
            console.error('❌ handleSubmit: studyGenreId is undefined or empty!');

            const existingGenres = currentUserData?.getCurrentUser?.studyGenres;
            if (existingGenres?.length > 0) {
                console.log('📌 handleSubmit: Found an existing genre, setting studyCardGroupId:', existingGenres[0]._id);
                setStudyGenreId(existingGenres[0]._id);
            } else {
                console.warn('no existing study genres found. cannot proceed.');
                alert('Please select or create a study genre before adding a card.');
                return;
            }
        }
        try {
            await createStudyCard({
                variables: {
                    front,
                    back,
                    studyGenreId,
                }
            });
        } catch (error) {
            console.error('❌ Error submitting study card:', error)
        }
    }

    if (studyGenresLoading) return <p>Loading ...</p>
    if (studyGenresError) return <p>Error loading: {studyGenresError.message}</p>

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
                    <label htmlFor="newGenreTitle" className="label-class">New Genre Title:</label>
                    <input
                        id="newGenreTitle"
                        className="input-class"
                        value={newGenreTitle}
                        onChange={(e) => setNewGenreTitle(e.target.value)}
                    />
                    <button className="create-button" type="submit" disabled={creatingStudyCard}>Create!</button>

                </form>
            </div>

            {creatingCardError && <p>Error creating card: {creatingCardError.message}</p>}
            {creatingGenreError && <p>Error creating study card group: {creatingGenreError.message}</p>}
            <AddToStackModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreateGenre={handleCreateGenre}
                onAddToGenre={handleAddToGenre}
                studyGenres={currentUserData?.getCurrentUser?.studyGenres || []}
            />

        </main>
    );
}

//const [createStudycard, { loading: creatingStudycard, error: creatingCardError }] = useMutation(CREATE_STUDYCARD, {
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

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // console.log("Form submitted with:", { front, back, studyCardGroupId });
    //     console.log("📌 handleSubmit: studyCardGroupId before mutation:", studyCardGroupId);

    //     if (!studyCardGroupId) {
    //         console.error("❌ handleSubmit: studyCardGroupId is undefined or empty!");
    //         return alert("Please select or create a study card group before creating a card.");
    //     }
    //     createStudycard({
    //         variables: {
    //             front,
    //             back,
    //             studyCardGroupId,
    //         }
    //         // onCompleted: handleCreateCardSuccess, // this opens the modal upon successful card creation
    //     });
    // };