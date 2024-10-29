// src/components/IdeaHistory.jsx
import React from 'react';

const IdeaHistory = () => {
    const mockHistory = [
        { id: 1, idea: 'AI in Healthcare', date: '2024-10-01' },
        { id: 2, idea: 'Blockchain Voting', date: '2024-10-05' }
    ];

    return (
        <div>
            <h2>Idea History</h2>
            <ul>
                {mockHistory.map((history) => (
                    <li key={history.id}>
                        {history.idea} - {history.date}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default IdeaHistory;
