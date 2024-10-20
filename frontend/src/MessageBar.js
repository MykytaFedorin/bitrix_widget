import React, { useState, useRef } from 'react';
import FileUploadButton from './FileUploadButton';
import SendButton from './SendButton';
import TextInputField from './TextInputField';
import './MessageBar.css';

function MessageBar({ addMessage }) {

    console.log("MessageBar.js");
    const [uploadedFile, setUploadedFile] = useState(null);
    const [textInputValue, setTextInputValue] = useState("");
    const sendButtonRef = useRef(null); 

    const handleInputChange = (e) => {
        setTextInputValue(e.target.value);
    };

    const handleSendMessage = (e) => {
        if (textInputValue.trim() !== "") {
            if (e.key === 'Enter') {
                sendButtonRef.current.click(); 
                setTextInputValue("");  
            }
        }
    };

    return (
        <div id="messageBar">
            <div id="messageBarLine">
                <FileUploadButton onFileChange={setUploadedFile} />
                <TextInputField inputValue={textInputValue}
                                onChange={handleInputChange}
                                handleSendMessage={handleSendMessage}/>
                <SendButton addMessage={addMessage} 
                            myRef={sendButtonRef}
                            uploadedFile={uploadedFile}
                            textInputValue={textInputValue} 
                            setTextInputValue={setTextInputValue}/>
            </div>
        </div>
    );
}

export default MessageBar;

