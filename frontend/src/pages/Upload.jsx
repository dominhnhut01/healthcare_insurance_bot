import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';

const Upload = () => {
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
                const response = await fetch('http://localhost:3001/uploads', {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.json();
                console.log(data);  // Log the response from the server
                // navigate('/display');  // Navigate to the display route
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
