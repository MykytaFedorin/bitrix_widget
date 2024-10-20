import React, { useState } from 'react';
import MessageArea from './MessageArea';
import MessageBar from './MessageBar';
import './App.css';

function App() {
    const [messages, setMessages] = useState(["Hi"]);

    const addMessage = (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    const deleteMessage = () => {
        console.log("delete")
        setMessages((prevMessages) => prevMessages.slice(0, -1));
    };

    return (
        <div id="body">
            <div className='dialog-window'>
                <MessageArea messages={messages}  />
                <MessageBar addMessage={addMessage} 
                            deleteMessage={deleteMessage}/>
            </div>
        </div>
    );
}

export default App;

