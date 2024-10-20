import React, { useState } from 'react';

function TextInputField({ onChange }) {
    console.log("TextInputField.js");
    const [inputValue, setInputValue] = useState("");

    const handleChange = (e) => {
        setInputValue(e.target.value);
        onChange(e.target.value);
        console.log("change");
    };

    return (
        <input 
            type="text" 
            value={inputValue} 
            onChange={handleChange} 
            placeholder="Введите сообщение" 
        />
    );
}

export default TextInputField;

