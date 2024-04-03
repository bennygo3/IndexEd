import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../../utils/queries';
import Card from '../../components/Card/Card';

const MyCards = () => {
    const { loading, error, data } = useQuery(GET_CURRENT_USER);
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    
    return (
        <div className="myCards-page">
            {data.currentUser.stacks.map(stack => (
                <div key={stack._id} className="stack-section">
                    <h2>{stack.title}</h2>
                    <div className="card-carousel">
                        {stack.studycards.map(card => (
                            <Card key={card._id} front={card.front} back={card.back} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MyCards;