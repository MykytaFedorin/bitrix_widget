import React, { useState } from 'react';
import FileUploadButton from './FileUploadButton';
import SendButton from './SendButton';
import TextInputField from './TextInputField';
import './MessageBar.css';

function MessageBar({ addMessage }) {

    console.log("MessageBar.js");
    const [uploadedFile, setUploadedFile] = useState(null);
    const [textInputValue, setTextInputValue] = useState("");

    const handleFileChange = (file) => {
        setUploadedFile(file);
    };

    const handleTextChange = (text) => {
        setTextInputValue(text);
    };

    return (
        <div id="messageBar">
            <div id="messageBarLine">
                <FileUploadButton onFileChange={handleFileChange} />
                <TextInputField onChange={handleTextChange} />
                <SendButton addMessage={addMessage} uploadedFile={uploadedFile} textInputValue={textInputValue} />
            </div>
        </div>
    );
}

export default MessageBar;

