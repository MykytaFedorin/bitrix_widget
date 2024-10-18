import React, { useRef } from 'react';
import './FileUploadButton.css';
import paperclip from './paperclip.png';

function FileUploadButton() {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Выбранный файл:', file.name);
    }
  };

  return (
    <div className="file-upload" id="fileUploadBtnDiv" onClick={handleButtonClick}>
      <input
        type="file"
        accept="*.*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <img src={paperclip} alt='paperclip' id="uploadBtnImage"></img>
    </div>
  );
}

export default FileUploadButton;

