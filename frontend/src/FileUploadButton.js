import React, { useRef } from 'react';
import './FileUploadButton.css';


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
    <div className="file-upload">
      <input
        type="file"
        accept=".pdf"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <button onClick={handleButtonClick} className="file-upload-button">
        Загрузить документ
      </button>
    </div>
  );
}

export default FileUploadButton;

