import React from 'react';
import send from './send.png';
import './SendButton.css';
function SendButton({ myRef,
                    addMessage, 
                    uploadedFile, 
                    textInputValue, 
                    setTextInputValue, 
                    deleteMessage, 
                    uploadedFileName,
                    setUploadedFileVisibility,
                    setUploadedFileName,
                    setUploadedFile}) {

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
            console.log("Description is required");
            return;
        }
        if(uploadedFile){
            addMessage(textInputValue + "(" + uploadedFileName + ")");
        }
        else{
            addMessage(textInputValue);
        }
        addMessage("Обработка...");
        setTextInputValue("");
        setUploadedFileVisibility({"display":"none"});
        setUploadedFileName("");
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
                deleteMessage();
                addMessage(data);
                setUploadedFile(null);
            })
            .catch((error) => {
                addMessage(`Error: ${error.message}`);
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
                deleteMessage();
                addMessage(data);  // Отображение результата
            })
            .catch((error) => {
                addMessage("Error:" + error.message);
                console.error('Error:', error);
            });
        }

    };

    return <img id="sendButton" src={send} ref={myRef} onClick={sendFile} alt="send_button"></img>;
}

export default SendButton;

