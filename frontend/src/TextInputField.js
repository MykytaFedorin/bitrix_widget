import React, { useState } from 'react';
import './TextField.css';

function TextInputField({ onChange }) {
    console.log("TextInputField.js");
    const [inputValue, setInputValue] = useState("");

    const handleChange = (e) => {
        setInputValue(e.target.value);
        onChange(e.target.value);
        console.log("change");
    };

    return (
        <textarea 
            id="textInput"
            value={inputValue} 
            onChange={handleChange} 
            placeholder="Введите сообщение" 
            rows={4}
        />
    );
}

export default TextInputField;

