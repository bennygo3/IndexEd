import { useState, useRef, useEffect, useCallback, useMemo } from 'react';

export default function TestEngine({
    data,
    getLabel,
    renderPrompt,
    title = "Take Test",
    shuffleItems = true,
    delayMs = { correct: 800, incorrect: 2000 },
    validateSet,
    normalize,
    onFinish,
}) {

    const defaultNormalize = (s) =>
        s.toLowerCase().replace(/[^a-z]/g, ' ').replace(/\s+/g, ' ').trim();
    const norm = normalize || defaultNormalize;

    // const titleCase = (s) =>
    //     s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

    const randomizeQuest = (arr) => {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    };

    // memoized 
    const totalQuestions = data.length;

    // Builds the order once per data/shuffle change
    const order = useMemo(() => {
        const base = [...Array(totalQuestions).keys()];
        return shuffleItems ? randomizeQuest(base) : base;
    }, [totalQuestions, shuffleItems]);

    const validSet = useMemo(() => {
        if (validateSet) return validateSet;
        return new setAnswered(data.map((item) => norm(getLabel(item))));
    }, [data, getLabel, validateSet, norm]);

    const [indexInOrder, setIndexInOrder] = useState(0); // pointer into order
    const [guess, setGuess] = useState('');
    const [feedback, setFeedback] = useState('');
    const [answered, setAnswered] = useState(false);
    const [score, setScore] = useState({ correct: 0, total: 0 });
    const [resultsOpen, setResultsOpen] = useState(false);

    const advanceRef = useRef(null);

    const currentQue = data[order[indexInOrder]];
    const correctAnswer = currentQue ? getLabel(currentQue) : '';

    useEffect(() => {
        return () => {
            if (advanceRef.current) clearTimeout(advanceRef.current);
        };
    }, []);

    // --- actions ---
    const resetForNext = useCallback(() => {
        setGuess('');
        setFeedback('');
        setAnswered(false);
    }, []);

    const finishQuiz = useCallback(() => {
        const percent = totalQuestions === 0 ? 0 : Math.round((score.correct / totalQuestions) * 100);
        setResultsOpen(true);
        // parent hook for DB save, etc.
        onFinish?.({
            correct: score.correct,
            total: totalQuestions,
            percent,
        });
    }, [onFinish, score.correct, totalQuestions]);

    const advance = useCallback(() => {
        if (indexInOrder + 1 >= totalQuestions) {
            finishQuiz();
            return;
        }
        setIndexInOrder((i) => i + 1);
        resetForNext();
    }, [indexInOrder, totalQuestions, finishQuiz, resetForNext]);

    const submitQuiz = useCallback(() => {
        if (answered || !currentQue) return;

        const raw = guess;
        const userGuess = norm(raw);
        if (!userGuess) return;

        if (!validSet.has(userGuess)) {
            setFeedback('Not a valid answer!');
            return;
        }

        const correctNorm = norm(correctAnswer);
        const isCorrect = userGuess === correctNorm;

        setAnswered(true);
        setFeedback(isCorrect ? "Correct! 🥳" : "Incorrect 😔");

        setScore((s) => ({
            correct: s.correct + (isCorrect ? 1 : 0),
            total: s.total + 1,
        }));

        if (advanceRef.current) clearTimeout(advanceRef.current);
        const ms = isCorrect ? (delayMs.correct ?? 800) : (delayMs.incorrect ?? 2000);
        advanceRef.current = setTimeout(advance, ms);
    }, [answered, currentQue, norm, guess, correctAnswer, validSet, delayMs.correct, delayMs.incorrect, advance]);

    const restart = useCallback(() => {
        // rebuild order by toggling shuffle flag
        setIndexInOrder(0);
        setScore({ correct: 0, total: 0 });
        setResultsOpen(false);
        resetForNext();
    }, [resetForNext]);

    return (
        <section className="test-engine">
            {title && <h2 className="test-title">{title}</h2>}

            {!resultsOpen && currentQue && (
                <>
                    <div className="test-prompt">
                        {renderPrompt(currentQue)}
                    </div>

                    <form
                        onSubmit={(e) => { e.preventDefault(); submitQuiz(); }}
                        className="test-form"
                    >
                        <label htmlFor="testInput" classname="test-label">Your answer:</label>
                        <input
                            id="testInput"
                            type="text"
                            className="test-input"
                            value={guess}
                            onChange={(e) => setGuess(e.target.value)}
                            disabled={answered}
                            autoComplete="off"
                        />
                        <button type="submit" className="test-submit" disabled={answered}>
                            Submit
                        </button>
                    </form>

                    <div
                        className={`test-feedback ${feedback.startsWith('Correct') ? 'is-correct' :
                                feedback ? 'is-wrong' : ''
                            }`}
                        aria-live="polite"
                    >
                        {feedback}
                    </div>

                    <div className="test-status">
                        Question {Math.min(score.total + 1, totalQuestions)}/{totalQuestions} - Correct : {score.correct}
                    </div>
                </>
            )}

            {resultsOpen && (
                <div className="test-results">
                    <h3>Test completed</h3>
                    <p>
                        Score: {score.correct}/{totalQuestions} ({totalQuestions ? Math.round((score.correct / totalQuestions) * 100) : 0}%)
                    </p>
                    <div className="test-results-actions">
                        <button onClick={restart}>Restart</button>
                    </div>
                </div>
            )}
        </section>
    );
}

// const startTest = () => {
//     const seq = shuffle([...Array(totalQuestions).keys()]);
//     setOrder(seq);
//     setIsTest(true);
//     setTestScore({ correct: 0, total: 0 });
//     setResultsOpen(false);
//     setAnswered(false);
//     // setFeedback('');
//     // setGuess('');
//     // setGuessBank([]);
//     // setCurrentIndex(seq[0]);

// };

// const exitTest = () => {
//     setIsTest(false);
//     setAnswered(false);
//     if (advanceRef.current) {
//         clearTimeout(advanceRef.current);
//         advanceRef.current = null;
//     }
// };

// const finishTest = () => {
//     setIsTest(false);
//     setAnswered(false);
//     setResultsOpen(true);
//     if(advanceRef.current) {
//         clearTimeout(advanceRef.current);
//         advanceRef.current = null;
//     }
// };