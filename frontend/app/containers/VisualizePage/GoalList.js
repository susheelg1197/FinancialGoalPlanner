import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './Goal.css'
// TodaysDate Component
const TodaysDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return `${mm}-${dd}-${yyyy}`;
};

// ListItem Component
const ListItem = ({ item, onChange }) => {
    const [index, content, status] = item;
    const buttonContent = status ? (
        <button onClick={() => onChange(index)} className="done">♥ FIN</button>
    ) : (
        <button onClick={() => onChange(index)}>WIP</button>
    );

    const styling = status ? "done" : "";
    const displayContent = status ? <span className="complete">{content}</span> : content;

    return (
        <div>
            <li className={styling}>{displayContent}{buttonContent}</li>
        </div>
    );
};

// ToDo Component
const ToDo = ({ items, onChange }) => {
    return (
        <div className="todoList">
            <ul>
                {items.map(item => (
                    <ListItem key={item[0]} item={item} onChange={onChange} />
                ))}
            </ul>
        </div>
    );
};

// App Component
const GoalList = () => {
    const [inputValue, setInputValue] = useState("");
    const [items, setItems] = useState([
        [0, "Understand React Lifecycle Methods"],
        [1, "Finish reading You Don't Know JS"]
    ]);
    const [index, setIndex] = useState(2);

    const updateInputValue = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newItems = [...items, [index, inputValue, false]];
        setItems(newItems);
        setIndex(index + 1);
        setInputValue("");
    };

    const onChange = (index) => {
        const newItems = items.map(item => 
            item[0] === index ? [item[0], item[1], !item[2]] : item
        );
        setItems(newItems);
    };

    return (
        <div className="container">
            {/* <h1><TodaysDate /></h1> */}
            <ToDo items={items} onChange={onChange} />
        </div>
    );
};

export default GoalList;
