
import React, { useState } from 'react';

const Chatbox = () => {
    const [messages, setMessages] = useState([]);

    const addMessage = (message) => {
        setMessages([...messages, message]);
    };

    return (
        <div>
            {messages.map((message, index) => (
                <div key={index}>{message}</div>
            ))}
            <MessageInput addMessage={addMessage} />
        </div>
    );
};

const MessageInput = ({ addMessage }) => {
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addMessage(message);
        setMessage('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={message} onChange={handleChange} />
            <button type="submit">Send</button>
        </form>
    );
};

export default Chatbox;
