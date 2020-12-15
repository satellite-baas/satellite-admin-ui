import React, { useState } from 'react';

const FileForm = ({ handleUpload, loading }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadClick = () => {
    handleUpload(file);
    setFile(null);
  };

  return (
    <>
      {loading ? (
        <>
          <p className="subtitle">Uploading file...</p>
          <progress
            className="progress is-medium is-primary"
          >
            45%
          </progress>
        </>
      ) : (
        <>
          <div className="file mb-2">
            <label className="file-label">
              <input 
                className="file-input"
                id="file_upload"
                type="file"
                onChange={handleFileChange}
              />
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload"></i>
                </span>
                <span className="file-label">
                  Choose a file...
                </span>
              </span>
              <span className={`${file ? 'is-active' : 'is-hidden'} file-name`}>
                {file && file.name}
              </span>
            </label>
          </div>
          <button
            className="button is-fullwidth is-info"
            onClick={handleUploadClick}
          >
            Upload File
          </button>
        </>
      )}

    </>
  );
};

export default FileForm;