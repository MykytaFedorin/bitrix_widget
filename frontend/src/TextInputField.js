import React, { useState } from 'react';
import './TextField.css';

function TextInputField({inputValue, onChange, handleSendMessage}) {
    console.log("TextInputField.js");

    return (
        <textarea 
            id="textInput"
            value={inputValue} 
            onChange={onChange} 
            onKeyDown={handleSendMessage}
            placeholder="Введите сообщение" 
            rows={4}
        />
    );
}

export default TextInputField;

