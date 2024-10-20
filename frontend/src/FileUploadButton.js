import React, { useRef } from 'react';
import paperclip from './paperclip.png';
import './FileUploadButton.css';

function FileUploadButton({ onFileChange }) {
    const inputFileRef = useRef(null); 

    const handleDivClick = () => {
        inputFileRef.current.click(); 
    };

    const handleFileChange = (e) => {
        if (onFileChange) {
            onFileChange(e.target.files[0]);
        }
    };

    return (
        <div id="fileUploadBtnDiv" onClick={handleDivClick}>
            <input 
                type="file" 
                onChange={handleFileChange} 
                id="inputFile"
                ref={inputFileRef} 
                style={{ display: 'none' }} 
            />
            <img src={paperclip} id="uploadBtnImage" height="12px" width="12px" alt="text" />
        </div>
    );
}

export default FileUploadButton;

