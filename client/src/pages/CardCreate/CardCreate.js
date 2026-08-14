import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CURRENT_USER, GET_STUDY_GENRES } from '../../utils/queries.js';
import { CREATE_STUDYCARD, CREATE_STUDY_GENRE } from '../../utils/mutations.js';
import './CardCreate.css';
import NavbarCC from '../../components/Navbar/NavbarCC.js';
import LineGenerator from '../../components/Lines/LineGenerator.js';

const EMPTY_GENRE_FORM = {
    title: '',
    category: '',
    description: '',
};

export default function CardCreate() {
    const [front, setFront] = useState('');
    const [back, setBack] = useState('');

    // an empty string means the backend should use Misc for genre
    const [selectedGenreId, setSelectedGenreId] = useState('');

    const [showGenreForm, setShowGenreForm] = useState(false);
    
    const [newGenre, setNewGenre] = useState({
        ...EMPTY_GENRE_FORM,
    });

    const [cardMessage, setCardMessage] = useState('');
    const [genreMessage, setGenreMessage] = useState('');

    // Load all genres belonging to the authenticated user.
    // These become the selectable options in the genre menu. 
    const {
        data: genreData,
        loading: genresLoading,
        error: genresError,
    } = useQuery(GET_STUDY_GENRES);

    const genres = genreData?.getStudyGenres ?? [];

    // Misc receives a special default option with an empty value.
    // Therefore, remove an existing misc document from the regular
    // list so the misc does not appear twice
    const availableGenres = genres.filter((genre) => {
        const normalizedTitle = genre.title
            ?.trim()
            .toLowerCase()
            .replace(/\.$/, '');
        
        return normalizedTitle !== 'misc';
    });

    // Organize genres under their categories
    // Ex: 
    // {
    //   Coding: [React, JavaScript],
    //   History: [American History]   
    // }
    const genresByCategory = availableGenres.reduce(
        (groups, genre) => {
            const category =
                genre.category?.trim() || 'Uncategorized';
            
            if (!groups[category]) {
                groups[category] = [];
            }

            groups[category].push(genre);

            return groups;
        }, {}
    );

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
        },

        refetchQueries: [
            { query: GET_CURRENT_USER },
            { query: GET_STUDY_GENRES },
        ],
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

