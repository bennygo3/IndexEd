import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../../utils/queries';
import Card from '../../components/Card/Card';

const MyCards = () => {
    useEffect(() => {
        const token = localStorage.getItem('id_token');
        console.log("stored token:", token)
    })
    const { loading, error, data } = useQuery(GET_CURRENT_USER);
    console.log(data);


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