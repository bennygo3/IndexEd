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

    // Organize genres under their categories. Ex: 
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

    const [
        createStudyCard,
        {
            loading: creatingStudyCard,
            error: creatingCardError,
        },
    ] = useMutation(CREATE_STUDYCARD, {
        refetchQueries: [
            {
                query: GET_CURRENT_USER,
            },
            {
                query: GET_STUDY_GENRES,
            },
        ],

        // wait for hte refreshed Apollo data before finishing.
        awaitRefetchQueries: true,
    });

    const [
        createStudyGenre,
        {
            loading: creatingGenre,
            error: creatingGenreError,
        },
    ] = useMutation(CREATE_STUDY_GENRE, {
        refetchQueries: [
            {
                query: GET_CURRENT_USER,
            },
            {
                query: GET_STUDY_GENRES,
            },
        ],

        awaitRefetchQueries: true,
    })

    const handleSubmit = async (event) => {
        event.preventDefault();

        setCardMessage('');

        const cleanedFront = front.trim();
        const cleanedBack = back.trim();

        if (!cleanedFront || !cleanedBack) {
            setCardMessage(
                'Both the front and back of the card are required.'
            );
            return;
        }

        // start with only the required vars.
        // When selectedGenreId is empty, studyGenreId is not added.
        // The backend will find or create Misc.

        const variables = {
            front: cleanedFront,
            back: cleanedBack,
        };

        if (selectedGenreId) {
            variables.studyGenreId = selectedGenreId;
        }

        try {
            await createStudyCard({
                variables,
            });

            setFront('');
            setBack('');

            // Do not reset selectedGenreId.
            // Keeping the selected genre allows for quicker card creation under the same genre
            setCardMessage('Card created successfully');
        } catch (error) {
            console.error('Err creating study card:', error);
        }
    };

    const handleNewGenreChange = (event) => {
        const { name, value } = event.target;

        setNewGenre((previousGenre) => ({
            ...previousGenre,
            [name]: value,
        }));
    };

    const handleCreateGenre = async (event) => {
        event.preventDefault();

        setGenreMessage('');

        const title = newGenre.title.trim();
        const category = newGenre.category.trim();
        const description = newGenre.description.trim();

        if (!title || !category) {
            setGenreMessage(
                'A category and genre title are required'
            );
            return;
        }

        // Check the currently loaded genres before sending a duplicate mutation
        const existingGenre = genres.find((genre) => {
            const sameTitle =
                genre.title?.trim().toLowerCase() ===
                title.toLowerCase();

            const sameCategory =
                genre.category?.trim().toLowerCase() ===
                category.toLowerCase();

            return sameTitle && sameCategory;
        });

        if (existingGenre) {
            setSelectedGenreId(existingGenre._id);
            setShowGenreForm(false);
            setNewGenre({
                ...EMPTY_GENRE_FORM,
            });

            setGenreMessage(
                `${existingGenre.category} → ${existingGenre.title} already exists and has been selected`
            );

            return;
        }

        try {
            const result = await createStudyGenre({
                variables: {
                    title,
                    category,
                    // GraphQL accepts null because desc. is optional
                    description: description || null,
                },
            });

            const createdGenre = result.data?.createStudyGenre;

            if (!createdGenre?._id) {
                throw new Error(
                    'The server did not return the created genre.'
                );
            }

            // Automatically select the new genre so the next card will save into it.
            setSelectedGenreId(createdGenre._id);

            setNewGenre({
                ...EMPTY_GENRE_FORM,
            });

            setShowGenreForm(false);

            setGenreMessage(
                `${createdGenre.category} -> ${createdGenre.title} was created and selected`
            );
        } catch (error) {
            console.error('Error creating study genre:', error);
        }
    };

    const handleCancelGenre = () => {
        setShowGenreForm(false);

        setNewGenre({
            ...EMPTY_GENRE_FORM,
        });

        setGenreMessage('');
    };

    return (
        <main>
            <header className="cardCreate-header">
                <h1>
                    Create A <br />
                    New Card
                </h1>
                <NavbarCC />
            </header>

            <div className="redLine-cc" />
            <div className="c-create-bluelines">
                <LineGenerator amount={29} colorClass="blue-line" />
            </div>

            <div className="form-cc">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="front" className="label-class">Front of the Studycard:</label>
                    <textarea
                        id="front"
                        name="front"
                        className="input-class"
                        value={front}
                        onChange={(event) => {
                            setFront(event.target.value);
                        }}
                        required
                    />

                    <label htmlFor="back" className="label-class">Back of the Studycard:</label>
                    <textarea
                        id="back"
                        name="back"
                        className="input-class"
                        value={back}
                        onChange={(event) => {
                            setBack(event.target.value);
                        }}
                        required
                    />

                    <label
                        htmlFor="study-card-genre"
                        className="label-class"
                    >
                        Category and Genre:
                    </label>

                    <select
                        id="study-card-genre"
                        className="input-class genre-select"
                        value={selectedGenreId}
                        onChange={(event) => {
                            setSelectedGenreId(
                                event.target.value
                            );

                            setCardMessage('');
                        }}
                        disabled={genresLoading}
                    >
                        <option value="">
                            Misc. -automatic
                        </option>

                        {Object.entries(genresByCategory)
                            .sort(([categoryA], [categoryB]) => {
                                return categoryA.localeCompare(
                                    categoryB
                                );
                            })
                            .map(([category, categoryGenres]) => (
                                <optgroup
                                    key={category}
                                    label={category}
                                >
                                    {[...categoryGenres]
                                        .sort((genreA, genreB) => {
                                            return genreA.title.localeCompare(
                                                genreB.title
                                            );
                                        })
                                        .map((genre) => (
                                            <option
                                                key={genre._id}
                                                value={genre._id}
                                            >
                                                {genre.title}
                                            </option>
                                        ))
                                    }
                                </optgroup>
                            ))
                        }
                    </select>

                    {genresLoading && (
                        <p>Loading...</p>
                    )}

                    {genresError && (
                        <p role="alert">
                            Unable to load genres:{' '}
                            {genresError.message}
                        </p>
                    )}

                    {!showGenreForm && (
                        <button
                            type="button"
                            className="create-genre-button"
                            onClick={() => {
                                setShowGenreForm(true);
                                setGenreMessage('');
                            }}
                        >
                            + Create a new genre
                        </button>
                    )}

                    <button
                        className="create-button"
                        type="submit"
                        disabled={
                            creatingStudyCard ||
                            showGenreForm
                        }
                    >
                        {creatingStudyCard
                            ? 'Creating...'
                            : 'Create!'
                        }
                    </button>
                </form>

                {showGenreForm && (
                    <form 
                        className="new-genre-form"
                        onSubmit={handleCreateGenre}
                    >
                        <h2>Create a new genre</h2>

                        <p>
                            Category is the broad subject, such as coding. 
                            Genre is the specific subject, such as React.
                        </p>

                        <label
                            htmlFor="new-genre-category"
                            className="label-class"
                        >
                            Category:
                        </label>

                        <input 
                            id="new-genre-category"
                            name="category"
                            type="text"
                            className="input-class"
                            value={newGenre.category}
                            onChange={handleNewGenreChange}
                            placeholder="For example: Coding"
                            required
                        />

                        <label 
                            htmlFor="new-genre-title"
                            className="label-class"
                        >
                            Genre Title:
                        </label>

                        <input 
                            id="new-genre-title"
                            name="title"
                            type="text"
                            className="input-class"
                            value={newGenre.title}
                            onChange={handleNewGenreChange}
                            placeholder="For example: React"
                            required
                        />

                        <label
                            htmlFor="new-genre-description"
                            className="label-class"
                        >
                            Description - optional:
                        </label>

                        <textarea 
                            id="new-genre-description"
                            name="description"
                            className="input-class"
                            value={newGenre.description}
                            onChange={handleNewGenreChange}
                            placeholder="Notes about what belongs in this genre"
                        />

                        <div className="genre-form-actions">
                            <button
                                type="submit"
                                className="create-button"
                                disabled={creatingGenre}
                            >
                                {creatingGenre 
                                    ? 'Saving...'
                                    : 'Save'
                                }
                            </button>

                            <button
                                type="button"
                                className="cancel-genre-button"
                                onClick={handleCancelGenre}
                                disabled={creatingGenre}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}

                {genreMessage && (
                    <p role="status">
                        {genreMessage}
                    </p>
                )}

                {cardMessage && (
                    <p role="status">
                        {cardMessage}
                    </p>
                )}

                {creatingGenreError && (
                    <p role="alert">
                        Error creating genre:{' '}
                        {creatingGenreError.message}
                    </p>
                )}

                {creatingCardError && (
                    <p role="alert">
                        Error creating card: {' '}
                        {creatingCardError.message}
                    </p>
                )}
            </div>

        </main>
    );
}

