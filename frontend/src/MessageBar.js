import React, { useState } from 'react';
import FileUploadButton from './FileUploadButton';
import SendButton from './SendButton';
import TextInputField from './TextInputField';
import './MessageBar.css';

function MessageBar({ addMessage }) {

    console.log("MessageBar.js");
    const [uploadedFile, setUploadedFile] = useState(null);
    const [textInputValue, setTextInputValue] = useState("");

    const handleInputChange = (e) => {
        setTextInputValue(e.target.value);
    };

    return (
        <div id="messageBar">
            <div id="messageBarLine">
                <FileUploadButton onFileChange={setUploadedFile} />
                <TextInputField inputValue={textInputValue}
                                onChange={handleInputChange} />
                <SendButton addMessage={addMessage} 
                            uploadedFile={uploadedFile}
                            textInputValue={textInputValue} 
                            setTextInputValue={setTextInputValue}/>
            </div>
        </div>
    );
}

export default MessageBar;

