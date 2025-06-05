import React, { useState } from 'react';
import './Upload.css';

export default function Upload() {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="upload-container">
      <h1>Upload Video</h1>

      <div
        className={`upload-box ${dragActive ? 'drag-active' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {file ? (
          <p>{file.name}</p>
        ) : (
          <p>Drag & drop your video here, or click to select</p>
        )}

        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          id="fileInput"
          style={{ display: 'none' }}
        />
        <label htmlFor="fileInput" className="upload-label">
          Browse Files
        </label>
      </div>
    </div>
  );
}
