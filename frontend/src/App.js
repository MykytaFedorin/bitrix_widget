import React, { useState } from 'react';
import MessageArea from './MessageArea';
import MessageBar from './MessageBar';
import UploadedFileArea from './UploadedFileArea';
import './App.css';

function App() {
    const [messages, setMessages] = useState(["Hi"]);
    const [uploadedFileName, setUploadedFileName] = useState("");
    const [uploadedFileVisibility, setUploadedFileVisibility] = useState({"display": "none"});

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
                <UploadedFileArea fileName={uploadedFileName}
                                    uploadedFileVisibility={uploadedFileVisibility}/>
                <MessageBar addMessage={addMessage} 
                            deleteMessage={deleteMessage}
                            setUploadedFileVisibility={setUploadedFileVisibility}
                            setUploadedFileName={setUploadedFileName}
                            uploadedFileName={uploadedFileName}/>
            </div>
        </div>
    );
}

export default App;

