import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const Upload = ({ onUpload }) => {
    const [error, setError] = useState(null);
    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
        accept: 'application/pdf',
        onDropRejected: () => setError('File upload failed. Please make sure you are uploading a PDF file.'),
        onDropAccepted: () => setError(null),
    });

    const handleUpload = () => {
        const file = acceptedFiles[0];
        const url = URL.createObjectURL(file);
        onUpload(url);
    };

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
            {error && <p>{error}</p>}
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default Upload;