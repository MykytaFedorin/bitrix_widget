import React from 'react';

function SendButton({ setMessage, uploadedFile, textInputValue }) {
    console.log("SendButton.js");
    console.log("SendButton.js text="+textInputValue);
    console.log("SendButton.js file="+uploadedFile);
    const python_url = process.env.REACT_APP_PYTHON_API_URL;
    const php_url = process.env.REACT_APP_PHP_API_URL;
    const letter_url = python_url + "/cover_letter/generate"; 
    const cv_url = php_url + "/cv/find"; 

    const sendFile = () => {
        const formData = new FormData();

        if (textInputValue === "") {
            setMessage("Description is required");
            return;
        }

        setMessage("Обработка...");
        if (uploadedFile) {
            formData.append('file', uploadedFile);
            formData.append('description', textInputValue);
            fetch(letter_url, {
                method: 'POST',
                body: formData,
                headers: {},
            })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                // Обработка успешного ответа
                setMessage(data);
            })
            .catch((error) => {
                setMessage(`Error: ${error.message}`);
                console.error('Error:', error);
            });
        } else {
            fetch(cv_url, {
                method: 'POST',
                body: JSON.stringify({"description": textInputValue}),
                headers: { 'Content-Type': 'application/json'},
            })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                // Обработка успешного ответа
                setMessage(data);  // Отображение результата
            })
            .catch((error) => {
                setMessage("Error:" + error.message);
                console.error('Error:', error);
            });
        }
    };

    return <button onClick={sendFile}>Отправить</button>;
}

export default SendButton;

