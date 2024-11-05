// src/components/IdeaHistory.jsx
import React from 'react';
import Card from '../../components/card';
import './IdeaHistory.css';

const IdeaHistory = () => {
    const mockHistory = [
        { id: 1, idea: 'AI in Healthcare', date: '2024-10-01' },
        { id: 2, idea: 'Blockchain Voting', date: '2024-10-05' }
    ];

    return (
        <>
            <h2>Idea History</h2>
            <ul className='card-container'>
                {mockHistory.map((history) => (
                    <Card key={history.id} titulo={history.idea} fecha={history.date}/>
                ))}
            </ul>
            
        </>
    );
};

export default IdeaHistory;
