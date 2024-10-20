import React from 'react';

function FileUploadButton({ onFileChange }) {
    console.log("FileUploadButton.js");
    const handleFileChange = (e) => {
        if (onFileChange) {
            onFileChange(e.target.files[0]);
        }
    };

    return (
        <input 
            type="file" 
            onChange={handleFileChange} 
        />
    );
}

export default FileUploadButton;

