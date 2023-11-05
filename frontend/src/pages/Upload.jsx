import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';

const Upload = ({ onUpload }) => {
    const [error, setError] = useState(null);
    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
        accept: 'application/pdf',
        onDropRejected: () => setError('File upload failed. Please make sure you are uploading a PDF file.'),
        onDropAccepted: () => setError(null),
    });

    const navigate = useNavigate();

    const handleUpload = async () => {
        const file = acceptedFiles[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
    
            try {
                console.log('Uploading file...', file);
                const response = await fetch('http://localhost:4800/uploads', {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.json();
                console.log("here is data", data);  // Log the response from the server
                onUpload(file);  // Make sure data contains the URL of the uploaded file
            } catch (error) {
                console.error('There was an error uploading the file:', error);
            }
        } else {
            setError('No file selected');
        }
    };

    return (
        <div {...getRootProps()}>
            {/* <input {...getInputProps()} /> */}
            <input type="file" {...getInputProps()} name="file" />
            <p>Drag 'n' drop some files here, or click to select files</p>
            {error && <p>{error}</p>}
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default Upload;
