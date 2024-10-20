import React, { useState } from 'react';
import FileUploadButton from './FileUploadButton';
import SendButton from './SendButton';
import TextInputField from './TextInputField';
import './MessageBar.css';

function MessageBar({ setMessage }) {

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
            <FileUploadButton onFileChange={handleFileChange} />
            <TextInputField onChange={handleTextChange} />
            <SendButton setMessage={setMessage} uploadedFile={uploadedFile} textInputValue={textInputValue} />
        </div>
    );
}

export default MessageBar;

