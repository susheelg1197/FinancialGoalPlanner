import React, { useState, useEffect } from 'react';
import { getUserGoals } from '../../utils/api';
import './Goal.css';

const GoalList = () => {
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        const fetchGoals = async () => {
            const token = localStorage.getItem('authToken');
            if (!token) {
                console.log('Authentication token not found.');
                return;
            }
            try {
                const fetchedGoals = await getUserGoals(token);
                setGoals(fetchedGoals.map(goal => ({ ...goal, isComplete: !!goal.isComplete })));
            } catch (error) {
                console.error('Failed to fetch goals:', error);
            }
        };

        fetchGoals();
    }, []);

    const toggleGoalStatus = async (id) => {
        setGoals(goals.map(goal => {
            if (goal.id === id) {
                return { ...goal, isComplete: !goal.isComplete };
            }
            return goal;
        }));

        // Optionally, send this change back to your server here
    };

    return (
        <div className="container">
            <ul>
                {goals.map(goal => (
                    <li key={goal.id} className={`goal-item ${goal.isComplete ? 'completed' : ''}`}>
                        <span className="goal-content">
                            {goal.name} - {goal.description} 
                        </span>
                        <button className="goal-toggle" onClick={() => toggleGoalStatus(goal.id)}>
                            {goal.isComplete ? 'Undo' : 'Mark as Complete'}
                        </button>
                    </li>
                ))}
            </ul>
        </div>

    );
};

export default GoalList;
