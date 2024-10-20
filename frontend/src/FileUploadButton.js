import React, { useRef } from 'react';
import paperclip from './paperclip.png';
import './FileUploadButton.css';

function FileUploadButton({ onFileChange, setUploadedFileVisibility, setUploadedFileName}) {
    const inputFileRef = useRef(null); 

    const handleDivClick = () => {
        inputFileRef.current.click(); 
    };

    const handleFileChange = (e) => {
        if (onFileChange) {
            const file = e.target.files[0];
            onFileChange(e.target.files[0]);
            setUploadedFileVisibility({"display":"block"});
            setUploadedFileName(file.name);
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

