import React, { useState } from 'react';
import MessageArea from './MessageArea';
import MessageBar from './MessageBar';
import './App.css';

function App() {
    const [messages, setMessages] = useState(["Hi"]);

    const addMessage = (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    return (
        <div id="body">
            <div className='dialog-window'>
                <MessageArea messages={messages} />
                <MessageBar addMessage={addMessage} />
            </div>
        </div>
    );
}

export default App;

