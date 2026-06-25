import { useState } from 'react';
import { useMutation} from '@apollo/client';
import { CREATE_STUDYCARD } from '../../utils/mutations.js';
import './CardCreate.css';
import NavbarCC from '../../components/Navbar/NavbarCC.js';
import LineGenerator from '../../components/Lines/LineGenerator.js';

export default function CardCreate() {
    const [front, setFront] = useState('');
    const [back, setBack] = useState('');

    const handleCreateCardSuccess = (data) => {
        console.log("Card created successfully:", data);
        
        setFront("");
        setBack("");
    };

    const [createStudyCard, { loading: creatingStudyCard, error: creatingCardError }] = useMutation(CREATE_STUDYCARD, {
        onCompleted: handleCreateCardSuccess,
        onError: (error) => {
            console.error("Error creating card:", error);
            alert("Error creating card: " + error.message);
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('📌 handleSubmit: Creating study card with:', { front, back });

        try {
            await createStudyCard({
                variables: {
                    front,
                    back,
                }
            });
        } catch (error) {
            console.error('❌ Error submitting study card:', error);
        }
    }

    return (
        <main>
            <header className="cardCreate-header">
                <h1>Create A <br></br>New Card</h1>
                <NavbarCC />
            </header>

            <div className="redLine-cc"></div>
            <div className="c-create-bluelines">
                <LineGenerator amount={29} colorClass="blue-line" />
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

                    <button className="create-button" type="submit" disabled={creatingStudyCard}>Create!</button>

                </form>
            </div>

            {creatingCardError && <p>Error creating card: {creatingCardError.message}</p>}

        </main>
    );
}

